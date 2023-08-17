<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="stocks"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Ticker"  width="150">
        <template slot-scope="scope">
          {{ scope.row.ticker }}
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date">
        <template slot-scope="scope">
          {{ getSimpleDate(new Date(scope.row.date)) }}
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Price" width="100">
        <template slot-scope="scope">
          {{ scope.row.currentPrice }}
        </template>
      </el-table-column>

      <el-table-column prop="created_at" label="Volume">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.vol }}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import axios from 'axios'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      stocks: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
    axios.get('http://localhost:8080/stock/getallstocks').then(res=>{
      console.log(res.data)
      this.stocks = res.data
    })
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    getSimpleDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var hour = date.getHours();
      var h = hour < 10 ? ('0' + hour) : hour;
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var s = date.getSeconds();
      s = s < 10 ? '0' + s : s;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + s;
    }
  }
}
</script>
