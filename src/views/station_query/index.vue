<template>
  <el-row>
    <el-col :xs="24">
      <el-card header="地区火车站查询">
        <el-row type="flex" justify="center" align="top">
          <el-col :xs="24" :md="12" :span="20">
            <el-input v-model="geo_name" placeholder="请输入地区名称" type="text" autosize />
          </el-col>
          <el-col :xs="24" :md="12" :span="4">
            <el-button @click="query">提交</el-button>
          </el-col>
        </el-row>
        <el-table :data="stationList" :fit="true" :show-header="true" stripe>
          <el-table-column prop="province" label="省份" />
          <el-table-column prop="city" label="城市" />
          <el-table-column prop="district" label="地区" />
          <el-table-column prop="station" label="车站名称" />
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { geo_query } from '@/utils/geo_station'

export default {
  name: 'StationQuery',
  data() {
    return {
      geo_name: '',
      stationList: []
    }
  },
  methods: {
    query() {
      geo_query(this.geo_name).then(result => {
        this.stationList = result
      })
    }
  }
}
</script>

<style scoped>

</style>
