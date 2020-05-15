<template>
  <div>
    <el-row>
      <el-card header="添加停靠站点" :hidden="add_end">
        <el-form :model="form" label-position="right">
          <el-form-item label="所在地区">
            <el-select
              v-model="form.province_name"
              placeholder="请选择省份"
              @change="completeCity"
            >
              <el-option
                v-for="item in province_list"
                :key="item.province_name"
                :label="item.province_name"
                :value="item.province_name">
              </el-option>
            </el-select>
            <el-select
              v-model="form.city_name"
              placeholder="请选择城市"
              @change="completeDistrict"
            >
              <el-option
                v-for="item in city_list"
                :key="item.city_name"
                :label="item.city_name"
                :value="item.city_name">
              </el-option>
            </el-select>
            <el-select
              v-model="form.district_name"
              placeholder="请选择地区"
              @change="completeStation"
            >
              <el-option
                v-for="item in district_list"
                :key="item.district_name"
                :label="item.district_name"
                :value="item.district_name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="站点名称">
            <el-select
              v-model="form.station_name"
              placeholder="请选择站点"
              filterable
              remote
              :remote-method="searchStation"
            >
              <el-option
                v-for="item in station_list"
                :key="item.station_name"
                :label="item.station_name"
                :value="item.station_name">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时间">
            <el-row type="flex">
              <el-col :span="12">
                <el-input
                  v-model="form.arv_time"
                  placeholder="选择到达此站点的时间"
                  :disabled="interval_index === 0"
                ></el-input>
              </el-col>
              <el-col :span="12">
                <el-input
                  v-model="form.dep_time"
                  placeholder="选择从此站出发的时间">
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="票价">
            <el-row type="flex">
              <el-col :span="4">
                <el-input
                  v-model="form.price.seat_type_1"
                  placeholder="硬座"
                  :disabled="interval_index === 0"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-input
                  v-model="form.price.seat_type_2"
                  placeholder="软座"
                  :disabled="interval_index === 0"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-input
                  v-model="form.price.seat_type_3"
                  placeholder="硬卧上铺"
                  :disabled="interval_index === 0"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-input
                  v-model="form.price.seat_type_4"
                  placeholder="硬卧中铺"
                  :disabled="interval_index === 0"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-input
                  v-model="form.price.seat_type_5"
                  placeholder="硬卧下铺"
                  :disabled="interval_index === 0"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-input
                  v-model="form.price.seat_type_6"
                  placeholder="软卧上铺"
                  :disabled="interval_index === 0"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-input
                  v-model="form.price.seat_type_7"
                  placeholder="软卧下铺"
                  :disabled="interval_index === 0"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-button type="warning" style="margin: auto" @click="addBeginInterval"
                       :disabled="interval_index !== 0">设为起点站
            </el-button>
            <el-button type="primary" style="margin: auto 10px" @click="addNewInterval"
                       :disabled="interval_index === 0">添加停靠站
            </el-button>
            <el-button type="danger" style="margin: auto" @click="addEndInterval"
                       :disabled="interval_index === 0">设为终点站
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card header="新增火车车次">
        <el-row type="flex" justify="center" align="top">
          <el-input v-model="train_name" placeholder="请输入火车车次号码" type="text" autosize/>
        </el-row>
        <el-table :data="interval_list" :fit="true" :show-header="true" stripe>
          <el-table-column prop="dep_station" label="出发站"/>
          <el-table-column prop="arv_station" label="到达站"/>
          <el-table-column prop="dep_time" label="出发时间"/>
          <el-table-column prop="arv_time" label="到达时间"/>
          <el-table-column prop="price.seat_type_1" label="硬座票价"/>
          <el-table-column prop="price.seat_type_2" label="软座票价"/>
          <el-table-column prop="price.seat_type_3" label="硬卧上铺票价"/>
          <el-table-column prop="price.seat_type_4" label="硬卧中铺票价"/>
          <el-table-column prop="price.seat_type_5" label="硬卧下铺票价"/>
          <el-table-column prop="price.seat_type_6" label="软卧上铺票价"/>
          <el-table-column prop="price.seat_type_7" label="软卧下铺票价"/>

        </el-table>
        <el-row type="flex" justify="center" style="margin: 20px">
          <el-button type="danger" @click="newTrain" :disabled="train_name===''">新增车次</el-button>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import { geo_query, area_query } from '@/utils/geo_station'
  import { commitNewInterval } from '@/utils/admin'

  export default {
    name: 'CreateTrain',
    data() {
      return {
        add_end: false,
        geo_name: '',
        train_name: '',
        trainList: [],
        form: {
          station_name: '',
          province_name: '',
          city_name: '',
          district_name: '',
          dep_time: '',
          arv_time: '',
          price: {
            seat_type_1: '',
            seat_type_2: '',
            seat_type_3: '',
            seat_type_4: '',
            seat_type_5: '',
            seat_type_6: '',
            seat_type_7: ''
          }
          //todo: price
        },
        dialogFormVisible: false,
        province_list: [],
        city_list: [],
        district_list: [],
        station_list: [],
        interval_index: 0,
        interval_list: []
      }
    },
    methods: {
      completeProvince() {
        area_query({}).then(result => {
          this.province_list = result
        })
      },
      completeCity() {
        area_query({ province: this.form.province_name }).then(result => {
          this.city_list = result
        })
      },
      completeDistrict() {
        area_query({ province: this.form.province_name, city: this.form.city_name }).then(result => {
          this.district_list = result
        })
      },
      completeStation() {
        area_query({
          province: this.form.province_name,
          city: this.form.city_name,
          district: this.form.district_name
        }).then(result => {
          this.station_list = result
        })
      },
      searchStation(area_name) {
        geo_query(area_name).then(result => {
          this.station_list = result.map(station => {
            return { station_name: station.station }
          })
        })
      },
      addNewInterval() {
        this.interval_list.push({
          dep_station: this.form.station_name,
          dep_time: this.form.dep_time
        })
        this.interval_list[this.interval_index - 1].arv_station = this.form.station_name
        this.interval_list[this.interval_index - 1].arv_time = this.form.arv_time
        this.interval_list[this.interval_index - 1].price = {
          seat_type_1: this.form.price.seat_type_1,
          seat_type_2: this.form.price.seat_type_2,
          seat_type_3: this.form.price.seat_type_3,
          seat_type_4: this.form.price.seat_type_4,
          seat_type_5: this.form.price.seat_type_5,
          seat_type_6: this.form.price.seat_type_6,
          seat_type_7: this.form.price.seat_type_7
        }
        this.interval_index++
      },
      addBeginInterval() {
        this.interval_list.push({
          dep_station: this.form.station_name,
          dep_time: this.form.dep_time
        })
        this.interval_index++
      },
      addEndInterval() {
        this.interval_list[this.interval_index - 1].arv_station = this.form.station_name
        this.interval_list[this.interval_index - 1].arv_time = this.form.arv_time
        this.interval_list[this.interval_index - 1].price = {
          seat_type_1: this.form.price.seat_type_1,
          seat_type_2: this.form.price.seat_type_2,
          seat_type_3: this.form.price.seat_type_3,
          seat_type_4: this.form.price.seat_type_4,
          seat_type_5: this.form.price.seat_type_5,
          seat_type_6: this.form.price.seat_type_6,
          seat_type_7: this.form.price.seat_type_7
        }
        this.interval_list.push({})
        this.interval_list.pop()
        this.add_end = true
      },
      newTrain() {
        commitNewInterval({ line: this.interval_list, train_name: this.train_name }).then(result => {
          this.$notify.success({
            title: '成功',
            message: result
          })
        }).catch(err => {
          this.$notify.error({
            title: '失败',
            message: err
          })
        })
      }
    },
    created() {
      this.completeProvince()
    }
  }
</script>

<style scoped>
</style>
