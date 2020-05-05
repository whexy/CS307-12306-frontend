<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-image style="width: 200px; height: 50px" :src="logo_url" fit="contain"/>
      <el-divider direction="vertical"></el-divider>
      <span>车票查询</span>
    </div>
    <el-row style="margin-top: 40px">
      <el-col :span="6">
        <el-card style="margin: auto;">
          <el-form :model="form">
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
<!--            <el-form-item label="出发日期">-->
<!--              <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>-->
<!--            </el-form-item>-->
            <el-form-item label="其他选项">
              <el-checkbox v-model="form.DG_only">只看高铁/动车</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin: auto" @click="TicketQuery">查询车票</el-button>
              <el-button @click="ResetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="18" v-if="showResult">
        <el-card shadow="hover">
          <el-table :data="trainList" :fit="true" :show-header="true" stripe
                    border
                    v-loading="loading"
                    element-loading-text="后端服务器火速加载中">
            <el-table-column prop="train_name" label="火车号"/>
            <el-table-column prop="dep_station" label="出发站点"/>
            <el-table-column prop="arv_station" label="到达站点"/>
            <el-table-column prop="dep_time" label="出发时间"/>
            <el-table-column prop="arv_time" label="到达时间"/>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  plain
                  @click="makeOrder(scope.row)">订票
                </el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-card>

      </el-col>
    </el-row>

  </div>
</template>

<script>
  import logoSrc from '@/assets/images/logo.png'
  import { ticket_query } from '@/utils/ticket'
  import { geo_query } from '@/utils/geo_station'

  export default {
    name: 'Dashboard',
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
        showResult: false,
        loading: true,
        trainList: []
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
      TicketQuery() {
        this.showResult = true
        this.loading = true
        ticket_query(this.form).then(result => {
            this.trainList = result
            this.loading = false
          }
        )
      },
      ResetForm() {
        this.showResult = false
        this.form = {
          from_city: '',
          to_city: '',
          date: '',
          DG_only: true,
          student: false
        }
      },
      makeOrder(index) {
        this.$router.push({
          name: 'order', params: {
            train_name: index.train_name,
            first_interval: index.first_interval,
            last_interval: index.last_interval,
            dep_station: this.form.dep_station,
            arv_station: this.form.arv_station
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
  }
</style>
