<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-image style="width: 200px; height: 50px" :src="logo_url" fit="contain"/>
      <el-divider direction="vertical"></el-divider>
      <span>我的车票</span>
<!--      <el-divider direction="vertical"></el-divider>-->
<!--      <el-switch-->
<!--        style="display: block"-->
<!--        v-model="display_style"-->
<!--        active-color="#dbecfb"-->
<!--        inactive-color="#8fbcdb"-->
<!--      ></el-switch>-->
    </div>
    <div>

      <el-table :data="tickets" :fit="true" :show-header="true"
                border
                element-loading-text="后端服务器火速加载中">
        <el-table-column align="center" width="480px" label="车票">
          <template slot-scope="scope">
            <ticket
              :train_info="scope.row"
              :displayStyle="display_style"
              @click.native="showTickets(scope.row)"
              style="zoom: 0.5; margin:auto;cursor:pointer;"></ticket>
          </template>
        </el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.orderStatus==='paid'" style="zoom: 1.4">已完成支付</el-tag>
            <el-tag type="info" v-if="scope.row.orderStatus==='cancelled'" style="zoom: 1.4">已失效</el-tag>
            <el-button
              type="danger"
              @click="cancelPurchase(scope.row.realOrderId)"
              v-if="scope.row.orderStatus==='paid'"
            >退票
            </el-button>
            <!--            {{scope.row.orderStatus}}-->
          </template>
        </el-table-column>
        <!--        <el-table-column label="操作">-->
        <!--          <template slot-scope="scope">-->
        <!--            &lt;!&ndash;            <el-button type="primary">改签</el-button>&ndash;&gt;-->
        <!--            <el-button-->
        <!--              type="danger"-->
        <!--              @click="cancelPurchase(scope.row.realOrderId)"-->
        <!--              :disabled="scope.row.orderStatus === 'cancelled'"-->
        <!--            >退票-->
        <!--            </el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </div>

    <el-dialog
      :visible.sync="ticketShow"
      :modal="false"
      :append-to-body="true"
      center>
      <ticket :train_info="select_train" :displayStyle="display_style" style="margin:auto;"/>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="ticketShow = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import Ticket from '@/components/Ticket'
  import logoSrc from '@/assets/images/logo.png'
  import { getMyTickets } from '@/api/myTicket'
  import { cancelOrder } from '@/utils/order'
  import { Message } from 'element-ui'

  export default {
    name: 'myOrder',
    components: {
      Ticket
    },
    data() {
      return {
        clientWidth: '',
        display_style: true,
        logo_url: logoSrc,
        tickets: [],
        ticketShow: false,
        select_train: {}
      }
    },
    computed: {},
    mounted() {
    },
    created() {
      this.getTickets()
    },
    methods: {
      getTickets() {
        getMyTickets().then(response => {
          const { ticket } = response
          this.tickets = ticket
        })
      },
      showTickets(train_info) {
        this.select_train = train_info
        this.ticketShow = true
      },
      cancelPurchase(orderId) {
        cancelOrder({ order_id: orderId }).then(result => {
          Message(result)
          this.getTickets()
        }).catch(err => {
          error(err)
        })
      }
    },
    watch: {}
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
  }
</style>
