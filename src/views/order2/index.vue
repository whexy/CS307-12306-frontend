<template>
  <div class="dashboard">
    <el-steps :active="active" finish-status="success" style="margin: 40px 60px" align-center>
      <el-step title="舱位等级" description="选择需要订购的舱位等级"></el-step>
      <el-step title="创建订单" description="确认订票信息并完成支付"></el-step>
      <el-step title="舱位等级" description="选择需要订购的舱位等级"></el-step>
      <el-step title="创建订单" description="确认订票信息并完成支付"></el-step>
      <el-step title="订票成功"></el-step>
    </el-steps>
    <el-card v-if="active===0 || active === 2" style="width: 600px; margin: auto;">
      <el-row class="train_info"><span>{{train_name}}</span></el-row>
      <el-row class="train_detail"><span>{{dep_station}}站 至 {{arv_station}}站</span></el-row>
      <el-table :data="leftTicketList" :fit="true" :show-header="true" stripe
                border
                v-loading="loading"
                element-loading-text="正在查询余票信息">
        <el-table-column prop="seat_type_name" label="舱位等级"/>
        <el-table-column prop="price" label="价格"/>
        <el-table-column prop="left_cnt" label="剩余票数"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="(scope.row.left_cnt!==0)?'success':'danger'"
              :disabled="scope.row.left_cnt===0"
              @click="makeOrder(scope.row)">订票
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card v-if="active===1 || active === 3" style="width: 600px; margin: auto;">
      <el-button
        size="mini"
        type="text"
        @click="active--"> &lt; 重新选择舱位等级
      </el-button>
      <el-row class="train_info"><span>{{train_name}}</span></el-row>
      <el-row class="train_detail"><span>{{dep_station}}站 至 {{arv_station}}站</span></el-row>
      <el-row class="train_detail"><span>{{seat_type_name}} ￥{{price}}</span></el-row>
      <el-row type="flex" justify="center">
        <el-button
          type="primary"
          :loading="orderLoading"
          @click="makeNewOrder"> 立即预定
        </el-button>
      </el-row>
    </el-card>
    <el-card v-if="active===5" style="width: 600px; margin: auto;">
      <el-row class="train_info"><span>付款完成！</span></el-row>
    </el-card>
    <el-dialog
      title="扫描二维码以付款"
      :visible.sync="qrCodeVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="30%">
      <el-row type="flex" justify="center">
        <vue-qr :text="'http://121.36.40.215:12307/purchase?order_id='+order_id" :size="200"></vue-qr>
      </el-row>
      <el-row type="flex" justify="center" style="margin: 10px auto">
        <el-link
          :href="'http://121.36.40.215:12307/purchase?order_id='+order_id"
          target="_blank">
          使用手机扫码付款或点此链接付款
        </el-link>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button type="danger" @click="cancelPurchases">取消订票</el-button>
        <el-button type="primary" @click="purchasedEnd">{{purchase_info}}</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import { left_ticket_query } from '@/utils/ticket'
  import { newOrder, getPurchase, cancelOrder } from '@/utils/order'
  import vueQr from 'vue-qr'
  import { Message } from 'element-ui'

  export default {
    name: 'order',
    data() {
      return {
        train_name: '',
        first_interval: '',
        last_interval: '',
        active: 0,
        leftTicketList: [],
        loading: true,
        seat_type_name: '',
        seat_type_id: 0,
        price: '',
        order_id: 0,
        qrCodeVisible: false,
        purchased: false,
        purchase_info: '完成支付后请按此按钮刷新',
        orderLoading: false
      }
    },
    created() {
      this.train_name = this.$route.params.train_name
      this.first_interval = this.$route.params.first_interval
      this.last_interval = this.$route.params.last_interval
      this.dep_station = this.$route.params.dep_station
      this.arv_station = this.$route.params.arv_station
      this.query_left_ticket()
    },
    methods: {
      query_left_ticket() {
        left_ticket_query(this.train_name, this.first_interval, this.last_interval).then(result => {
          this.leftTicketList = result
          this.loading = false
        })
      },
      makeOrder(index) {
        this.seat_type_name = index.seat_type_name
        this.seat_type_id = index.seat_type_id
        this.price = index.price
        this.active++
      },
      purchasedEnd() {
        getPurchase({ order_id: this.order_id }).then(result => {
          if (result === 'paid') {
            this.purchase_info = '完成'
            this.purchased = true
            this.qrCodeVisible = false
            this.orderLoading = false
            this.active += (this.active === 1) ? 1 : 2
            this.train_name = this.$route.params.train_name2
            this.first_interval = this.$route.params.first_interval2
            this.last_interval = this.$route.params.last_interval2
            this.dep_station = this.$route.params.dep_station2
            this.arv_station = this.$route.params.arv_station2
            this.query_left_ticket()
          } else {
            Message('支付未完成！')
          }
        })
      },
      cancelPurchases() {
        cancelOrder({ order_id: this.order_id }).then(result => {
          Message(result)
          this.qrCodeVisible = false
          this.orderLoading = false
        }).catch(err => {
          error(err)
          this.qrCodeVisible = false
        })
      },
      makeNewOrder() {
        this.orderLoading = true
        newOrder({
          train_name: this.train_name,
          first_interval: this.first_interval,
          last_interval: this.last_interval,
          seat_class: this.seat_type_id
        }).then(result => {
          const { order_id } = result
          this.order_id = order_id
          console.log(this.order_id)
          this.qrCodeVisible = true
        })
      }
    },
    mounted() {
    },
    components: {
      vueQr
    }
  }

</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 20px;
    }

    &-text {
      display: flex;
      align-items: center;
      font-size: 20px;
      height: 50px;
      margin: auto;
    }

    .train_info {
      font-size: 35px;
      text-align: center;
      margin: 15px auto;
    }

    .train_detail {
      font-size: 20px;
      text-align: center;
      margin: auto auto 25px;
    }
  }


</style>
