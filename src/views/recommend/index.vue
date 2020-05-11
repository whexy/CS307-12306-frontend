<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <div class="dashboard-text">
        <el-image style="width: 200px; height: 50px" :src="logo_url" fit="contain"/>
        <el-divider direction="vertical"></el-divider>
        <span>换乘查询</span>
      </div>
    </div>
    <el-row style="margin-top: 10px">
      <el-col>
        <el-card style="margin: auto;">
          <el-form :model="form" :inline="true">
            <el-form-item label="出发地点">
              <el-autocomplete
                v-model="form.dep_station"
                value-key="station"
                :fetch-suggestions="queryStation"
                placeholder="出发地点"
                :trigger-on-focus="false"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达地点">
              <el-autocomplete
                v-model="form.arv_station"
                value-key="station"
                :fetch-suggestions="queryStation"
                placeholder="到达地点"
                :trigger-on-focus="false"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="其他选项">
              <el-checkbox v-model="form.DG_only">只看高铁/动车</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin: auto" @click="TransferQuery">查询中转站</el-button>
              <el-button @click="ResetForm">重置</el-button>
            </el-form-item>
          </el-form>
          <el-form
            :model="form"
            :inline="true"
            v-show="showTransformSelector"
          >
            <el-form-item label="中转站">
              <el-row>
                <el-select
                  v-model="transferStation"
                  placeholder="请选择中转站"
                  v-loading="transferLoading"
                  element-loading-text="匹配站点中"
                  element-loading-spinner="el-icon-loading"
                >
                  <el-option
                    v-for="station in transferStationList"
                    :label="station.stationName"
                    :value="station.stationName"
                    :key="station.stationId"
                  >
                  </el-option>
                </el-select>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                style="margin: auto"
                :disable="transferLoading"
                @click="TicketQuery"
              >搜索火车票
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="20">
      <el-col :span="12">
        <el-row v-if="showResult">
          <el-card shadow="hover">
            <el-table :data="trainList1" :fit="true" :show-header="true"
                      height="250"
                      border
                      highlight-current-row
                      v-loading="loading1"
                      @current-change="handleCurrentChange1"
                      element-loading-text="后端服务器火速加载中">
              <el-table-column prop="train_name" label="火车号"/>
              <el-table-column prop="dep_station" label="出发站点"/>
              <el-table-column prop="arv_station" label="到达站点"/>
              <el-table-column prop="dep_time" label="出发时间"/>
              <el-table-column prop="arv_time" label="到达时间"/>
            </el-table>
          </el-card>
        </el-row>
        <el-row v-if="showResult">
          <el-card shadow="hover">
            <el-table :data="trainList2" :fit="true" :show-header="true"
                      height="400"
                      border
                      highlight-current-row
                      v-loading="loading2"
                      @current-change="handleCurrentChange2"
                      element-loading-text="后端服务器火速加载中">
              <el-table-column prop="train_name" label="火车号"/>
              <el-table-column prop="dep_station" label="出发站点"/>
              <el-table-column prop="arv_station" label="到达站点"/>
              <el-table-column prop="dep_time" label="出发时间"/>
              <el-table-column prop="arv_time" label="到达时间"/>
            </el-table>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="12" v-if="showResult">
        <el-card shadow="hover">
          选择第一张火车票：
          <el-row class="train_info"><span>{{order1.train_name}}</span></el-row>
          <el-row class="train_detail"><span>{{order1.dep_station}}站 至 {{order1.arv_station}}站</span></el-row>
          <el-divider></el-divider>
          选择第二张火车票：
          <el-row class="train_info"><span>{{order2.train_name}}</span></el-row>
          <el-row class="train_detail"><span>{{order2.dep_station}}站 至 {{order2.arv_station}}站</span></el-row>
          <el-divider></el-divider>
          <el-row type="flex" justify="center">
            <el-badge :value="2" class="item" type="danger">
              <el-button type="danger" @click="orderTicket">预定火车票</el-button>
            </el-badge>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import logoSrc from '@/assets/images/logo.png'
  import { fuzzy_ticket_query, transfer_station_query } from '@/utils/ticket'
  import { geo_query } from '@/utils/geo_station'

  export default {
    name: 'Recommend',
    components: {},
    data() {
      return {
        logo_url: logoSrc,
        form: {
          dep_station: '',
          arv_station: '',
          date: '',
          DG_only: true,
          student: false
        },
        transferLoading: true,
        showTransformSelector: false,
        showResult: false,
        loading1: true,
        loading2: true,
        trainList1: [],
        trainList2: [],
        transferStation: '',
        transferStationList: [],
        order1: {
          dep_station: ' ',
          arv_station: ' ',
          train_name: ' ',
          first_interval: '',
          last_interval: ''
        },
        order2: {
          dep_station: ' ',
          arv_station: ' ',
          train_name: ' ',
          first_interval: '',
          last_interval: ''
        }
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      queryStation(queryString, cb) {
        geo_query(queryString).then(result => {
          cb(result)
        })
      },
      TransferQuery() {
        this.showTransformSelector = true
        transfer_station_query(this.form).then(result => {
          this.transferStationList = result
          this.transferLoading = false
        }).catch(err => Error(err))
      },
      ResetForm() {
        this.showResult = false
        this.showTransformSelector = false
        this.transferLoading = true
        this.transferStationList = []
        this.form = {
          from_city: '',
          to_city: '',
          date: '',
          DG_only: true,
          student: false
        }
      },
      TicketQuery() {
        this.showResult = true
        // this.form.dep_station => this.transferStation
        fuzzy_ticket_query({
          'dep_station': this.form.dep_station,
          'arv_station': this.transferStation,
          'DG_only': this.form.DG_only
        }).then(result => {
          this.trainList1 = result
          this.loading1 = false
        }).catch(err => Error(err))

        fuzzy_ticket_query({
          'dep_station': this.transferStation,
          'arv_station': this.form.arv_station,
          'DG_only': this.form.DG_only
        }).then(result => {
          this.trainList2 = result
          this.loading2 = false
        }).catch(err => Error(err))
        this.$notify({
          title: '购票提醒',
          message: '加载完成后，请在左侧选择两张火车票，并单击购票按钮进入购票页面。',
          type: 'warning',
          duration: 0
        })
      },
      handleCurrentChange1(row) {
        this.order1.dep_station = row.dep_station
        this.order1.arv_station = row.arv_station
        this.order1.train_name = row.train_name
        this.order1.first_interval = row.first_interval
        this.order1.last_interval = row.last_interval
      },
      handleCurrentChange2(row) {
        this.order2.dep_station = row.dep_station
        this.order2.arv_station = row.arv_station
        this.order2.train_name = row.train_name
        this.order2.first_interval = row.first_interval
        this.order2.last_interval = row.last_interval
      },
      orderTicket() {
        this.$router.push({
          name: 'order2', params: {
            train_name: this.order1.train_name,
            first_interval: this.order1.first_interval,
            last_interval: this.order1.last_interval,
            dep_station: this.order1.dep_station,
            arv_station: this.order1.arv_station,
            train_name2: this.order2.train_name,
            first_interval2: this.order2.first_interval,
            last_interval2: this.order2.last_interval,
            dep_station2: this.order2.dep_station,
            arv_station2: this.order2.arv_station
          }
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
