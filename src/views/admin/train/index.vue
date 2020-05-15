<template>
  <div>
    <el-row>
      <el-col>
        <el-card header="火车线路管理">
          <el-row type="flex" justify="center" align="top">
            <el-col :xs="24" :md="12" :span="20">
              <el-input v-model="train_name" placeholder="请输入火车编号" type="text" autosize/>
            </el-col>
            <el-col :xs="24" :md="12" :span="4">
              <el-button @click="queryTrain">提交</el-button>
              <el-button @click="handleDeleteTrain" type="danger" v-if="available">停用火车线路</el-button>
              <el-button @click="handleRestoreTrain" type="primary" v-if="restorable">恢复火车线路</el-button>
            </el-col>
          </el-row>
          <el-table :data="intervalList" :fit="true" :show-header="true" stripe>
            <el-table-column prop="dep_station" label="出发站"/>
            <el-table-column prop="arv_station" label="到达站"/>
            <el-table-column prop="dep_datetime" label="出发时间"/>
            <el-table-column prop="arv_datetime" label="到达时间"/>
            <el-table-column prop="price.seat_type_1" label="硬座"/>
            <el-table-column prop="price.seat_type_2" label="软座"/>
            <el-table-column prop="price.seat_type_3" label="硬卧上铺"/>
            <el-table-column prop="price.seat_type_4" label="硬卧中铺"/>
            <el-table-column prop="price.seat_type_5" label="硬卧下铺"/>
            <el-table-column prop="price.seat_type_6" label="软卧上铺"/>
            <el-table-column prop="price.seat_type_7" label="软卧下铺"/>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="handleModify(scope.row)" type="text">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="修改列车区间信息" :visible.sync="dialogFormVisible">
      <el-form :model="modifyInterval" label-position="right">
        <el-form-item label="硬座" v-if="modifyInterval.price.seat_type_1 !== 'x'">
          <el-input
            v-model="modifyInterval.price.seat_type_1"
          ></el-input>
        </el-form-item>
        <el-form-item label="软座" v-if="modifyInterval.price.seat_type_2 !== 'x'">
          <el-input
            v-model="modifyInterval.price.seat_type_2"
          ></el-input>
        </el-form-item>
        <el-form-item label="硬卧上铺" v-if="modifyInterval.price.seat_type_3 !== 'x'">
          <el-input
            v-model="modifyInterval.price.seat_type_3"
          ></el-input>
        </el-form-item>
        <el-form-item label="硬卧中铺" v-if="modifyInterval.price.seat_type_4 !== 'x'">
          <el-input
            v-model="modifyInterval.price.seat_type_4"
          ></el-input>
        </el-form-item>
        <el-form-item label="硬卧下铺" v-if="modifyInterval.price.seat_type_5 !== 'x'">
          <el-input
            v-model="modifyInterval.price.seat_type_5"
          ></el-input>
        </el-form-item>
        <el-form-item label="软卧上铺" v-if="modifyInterval.price.seat_type_6 !== 'x'">
          <el-input
            v-model="modifyInterval.price.seat_type_6"
          ></el-input>
        </el-form-item>
        <el-form-item label="软卧下铺" v-if="modifyInterval.price.seat_type_7 !== 'x'">
          <el-input
            v-model="modifyInterval.price.seat_type_7"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin: auto" @click="commitModify">修改信息</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  import { geo_query, train_query } from '@/utils/geo_station'
  import { commitIntervalInfo, deleteTrain, getIntervalInfo, restoreTrain } from '@/utils/admin'

  export default {
    name: 'AdminTrain',
    data() {
      return {
        geo_name: '',
        train_name: '',
        stationList: [],
        intervalList: [],
        modifyInterval: {
          dep_station: '',
          arv_station: '',
          dep_datetime: '',
          arv_datetime: '',
          price: {
            seat_type_1: '',
            seat_type_2: '',
            seat_type_3: '',
            seat_type_4: '',
            seat_type_5: '',
            seat_type_6: '',
            seat_type_7: ''
          }
        },
        dialogFormVisible: false,
        available: false,
        restorable: false
      }
    },
    methods: {
      queryTrain() {
        getIntervalInfo({ train_name: this.train_name }).then(result => {
          this.available = result.available
          this.restorable = !this.available
          this.intervalList = result.line
        })
      },
      handleModify(interval) {
        console.log(interval)
        this.modifyInterval = interval
        console.log(this.modifyInterval)
        this.dialogFormVisible = true
      },
      commitModify() {
        commitIntervalInfo(this.modifyInterval).then(result => {
          this.$notify.success({
            title: '成功',
            message: result
          })
          this.queryTrain()
          this.dialogFormVisible = false
        }).catch(err => {
          this.$notify.error({
            title: '失败',
            message: err
          })
          this.dialogFormVisible = false
          this.queryTrain()
        })
      },
      handleDeleteTrain() {
        deleteTrain({ train_name: this.train_name }).then(result => {
          this.$notify.success({
            title: '成功',
            message: result
          })
          this.queryTrain()
        }).catch(err => {
          this.$notify.error({
            title: '失败',
            message: err
          })
        })
      },
      handleRestoreTrain() {
        restoreTrain({ train_name: this.train_name }).then(result => {
          this.$notify.success({
            title: '成功',
            message: result
          })
          this.queryTrain()
        }).catch(err => {
          this.$notify.error({
            title: '失败',
            message: err
          })
        })
      }
    }
  }
</script>

<style scoped>
</style>
