<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-image
        style="width: 200px; height: 50px"
        :src="logo_url"
        fit="contain"
      />
      <el-divider direction="vertical"></el-divider>
      <span>我的车票</span>
      <el-divider direction="vertical" ></el-divider>
      <el-switch
        v-if="clientWidth>=643"
        style="display: block"
        v-model="display_style"
        active-color="#dbecfb"
        inactive-color="#8fbcdb"
        active-text="电子车票"
        inactive-text="实体车票">
      </el-switch>
      <el-switch
        v-if="clientWidth<643"
        style="display: block"
        v-model="display_style"
        active-color="#dbecfb"
        inactive-color="#8fbcdb">
      </el-switch>
    </div>
    <div>
      <el-row :gutter="20" type="flex" justify="center" style="flex-wrap: wrap">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" v-for="ticket in tickets" key="ticket"
                style="margin: 25px auto">
          <ticket
                  :train_info="ticket"
                  :displayStyle="display_style"
                  :style="ticket_style"
          />
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import Ticket from '@/components/Ticket'
  import logoSrc from '@/assets/images/logo.png'
  import { getTicketList } from '@/api/ticket'

  export default {
    name: 'Dashboard',
    components: {
      Ticket
    },
    data() {
      return {
        clientWidth: '',
        ticket_style: 'margin: auto',
        display_style: true,
        logo_url: logoSrc,
        tickets: []
      }
    },
    computed: {},
    mounted() {
      this.clientWidth = `${document.documentElement.clientWidth}`
      window.onresize = function temp() {
        this.clientWidth = `${document.documentElement.clientWidth}`
      }
    },
    created() {
      this.getTickets()
    },
    methods: {
      getTickets() {
        getTicketList().then(response => {
          const { ticket } = response
          this.tickets = ticket
        })
      }
    },
    watch: {
      clientWidth: function() {
        if (this.clientWidth < 643) {
          this.ticket_style = 'transform: scale(' + (this.clientWidth / 643) + '); margin: -50px 0 -100px -100px'
        } else {
          this.ticket_style = 'margin: auto; transform:;'
        }
      }
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

    .ticket_card {
      margin-top: 1300px;
    }
  }
</style>
