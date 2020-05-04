<template>
  <div class="dashboard">
    <el-steps :active="active" finish-status="success" style="margin: 40px 60px" align-center>
      <el-step title="舱位等级" description="选择需要订购的舱位等级">
      </el-step>
      <el-step title="创建订单" description="确认订票信息并完成支付"></el-step>
      <el-step title="订票成功"></el-step>
    </el-steps>
    <el-card v-if="active===0" style="width: 600px; margin: auto;">
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
    <el-card v-if="active===1" style="width: 600px; margin: auto;">
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
          @click="makeNewOrder"> 立即预定
        </el-button>
      </el-row>
    </el-card>
    <el-dialog
      title="扫描二维码以付款"
      :visible.sync="qrCodeVisible"
      width="30%">
      <el-row type="flex" justify="center">
        <vue-qr :text="'http://192.168.0.107:5000/purchase?id='+order_id" :size="200"></vue-qr>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button type="danger" @click="qrCodeVisible = false">取消订票</el-button>
        <el-button type="primary" @click="active++" :loading="!purchased">{{purchase_info}}</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import { left_ticket_query } from '@/utils/ticket'
  import { newOrder } from '@/utils/order'
  import vueQr from 'vue-qr'

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
        purchase_info: '请使用手机完成支付'
      }
    },
    created() {
      this.train_name = this.$route.query.train_name
      this.first_interval = this.$route.query.first_interval
      this.last_interval = this.$route.query.last_interval
      this.dep_station = this.$route.query.dep_station
      this.arv_station = this.$route.query.arv_station
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
      makeNewOrder() {
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
