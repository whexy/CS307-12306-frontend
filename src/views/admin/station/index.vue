<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-card header="火车站管理">
          <el-row type="flex" justify="center" align="top">
            <el-col :xs="24" :md="12" :span="20">
              <el-input v-model="geo_name" placeholder="请输入地区名称" type="text" autosize/>
            </el-col>
            <el-col :xs="24" :md="12" :span="4">
              <el-button @click="queryGeo">提交</el-button>
            </el-col>
          </el-row>
          <el-table :data="stationList" :fit="true" :show-header="true" stripe>
            <el-table-column prop="province" label="省份"/>
            <el-table-column prop="city" label="城市"/>
            <el-table-column prop="district" label="地区"/>
            <el-table-column prop="station" label="车站名称"/>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="handleModify(scope.row)" type="text">修改</el-button>
                <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)">
                  <el-button type="text" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card header="新增站点">
          <el-form :model="form" label-position="right">
            <el-form-item label="站点名称">
              <el-input
                v-model="form.station_name"
                placeholder="请输入新站名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="所在省份">
              <el-autocomplete
                v-model="form.province_name"
                value-key="province_name"
                :fetch-suggestions="completeProvince"
                placeholder="省份名称"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="所在城市">
              <el-autocomplete
                v-model="form.city_name"
                value-key="city_name"
                :fetch-suggestions="completeCity"
                placeholder="城市名称"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="所在地区">
              <el-autocomplete
                v-model="form.district_name"
                value-key="district_name"
                :fetch-suggestions="completeDistrict"
                placeholder="地区名称"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin: auto" @click="handleNewStation">新增站点</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="修改车站信息" :visible.sync="dialogFormVisible">
      <el-form :model="modifyStationForm" label-position="right">
        <el-form-item label="原站点名称">
          <el-input
            v-model="modifyStationForm.station_name"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="站点名称">
          <el-input
            v-model="modifyStationForm.new_station_name"
            placeholder="请输入新名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="站点地区">
          <el-input
            v-model="modifyStationForm.district_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="站点城市">
          <el-input
            v-model="modifyStationForm.city_name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin: auto" @click="commitModify">修改站点</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { geo_query, train_query, area_query } from '@/utils/geo_station'
  import { addNewStation, deleteStation, modifyStation } from '@/utils/admin'

  export default {
    name: 'AdminStation',
    data() {
      return {
        geo_name: '',
        train_name: '',
        stationList: [],
        trainList: [],
        modifyStationForm: {
          station_name: '',
          new_station_name: '',
          district_name: '',
          city_name: ''
        },
        form: {
          station_name: '',
          province_name: '',
          city_name: '',
          district_name: ''
        },
        dialogFormVisible: false
      }
    },
    methods: {
      commitModify() {
        modifyStation(this.modifyStationForm).then(result => {
          this.$notify.success({
            title: '成功',
            message: result
          })
          this.dialogFormVisible = false
          this.queryGeo()
        }).catch(err => this.$notify.error({
          title: '失败',
          message: err
        }))
      },
      handleNewStation() {
        addNewStation(this.form).then(result => {
          this.$notify.success({
            title: '成功',
            message: result
          })
          this.queryGeo()
        }).catch(err => {
          this.$notify.error({
            title: '失败',
            message: err
          })
        })
      },
      handleModify(row) {
        this.dialogFormVisible = true
        this.modifyStationForm.station_name = row.station
        this.modifyStationForm.district_name = row.district
        this.modifyStationForm.city_name = row.city
      },
      handleDelete(row) {
        deleteStation({ station_name: row.station }).then(result => {
          this.$notify.success({
            title: '成功',
            message: result
          })
          this.queryGeo()
        }).catch(err => {
          this.$notify.error({
            title: '失败',
            message: err
          })
        })
      },
      completeProvince(queryString, cb) {
        area_query({}).then(result => {
          cb(result)
        })
      },
      completeCity(queryString, cb) {
        area_query({ province: this.form.province_name }).then(result => {
          cb(result)
        })
      },
      completeDistrict(queryString, cb) {
        area_query({ province: this.form.province_name, city: this.form.city_name }).then(result => {
          cb(result)
        })
      },
      queryGeo() {
        geo_query(this.geo_name).then(result => {
          this.stationList = result
        })
      },
      queryTrain() {
        train_query(this.train_name).then(result => {
          this.trainList = result
        })
      }
    }
  }
</script>

<style scoped>
</style>
