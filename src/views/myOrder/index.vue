<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-image style="width: 200px; height: 50px" :src="logo_url" fit="contain" />
      <el-divider direction="vertical"></el-divider>
      <span>我的车票</span>
      <el-divider direction="vertical"></el-divider>
      <el-switch
        style="display: block"
        v-model="display_style"
        active-color="#dbecfb"
        inactive-color="#8fbcdb"
      ></el-switch>
    </div>
    <div>
      <el-row
        type="flex"
        justify="center"
        align="middle"
        style="flex-wrap: wrap"
        v-for="ticket in tickets"
      >
        <el-col :span="12" key="ticket" push="4" style="margin: 25px auto; zoom: 0.7;">
          <ticket :train_info="ticket" :displayStyle="display_style" />
        </el-col>

        <el-col :span="12">
          <el-row style="margin:10px">{{ticket.trainName}}</el-row>
          <el-row style="margin:10px">
            <el-button type="primary" round>改签</el-button>
          </el-row>
          <el-row style="margin:10px">
            <el-button type="danger" round>退票</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Ticket from "@/components/Ticket";
  import logoSrc from "@/assets/images/logo.png";
  import { getMyTickets } from "@/api/myTicket";

  export default {
    name: "myOrder",
    components: {
      Ticket
    },
    data() {
      return {
        clientWidth: "",
        display_style: true,
        logo_url: logoSrc,
        tickets: []
      };
    },
    computed: {},
    mounted() {},
    created() {
      this.getTickets();
    },
    methods: {
      getTickets() {
        getMyTickets().then(response => {
          const { ticket } = response;
          this.tickets = ticket;
        });
      }
    },
    watch: {}
  };
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
