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
      <el-table-column label="Code"  width="150">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      
      <el-table-column label="Time">
        <template slot-scope="scope">
          {{ getSimpleDate(new Date(scope.row.time)) }}
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Unit Net">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.unitNet }}
        </template>
      </el-table-column>

      <el-table-column prop="created_at" label="Acc Net">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.accNet }}
        </template>
      </el-table-column>

      <el-table-column label="Subscription">
        <template slot-scope="scope">
          <span>{{ scope.row.subscription }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Redemption">
        <template slot-scope="scope">
          <span>{{ scope.row.redemption }}</span>
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
    axios.get('http://localhost:8080/fund/getallfunds').then(res=>{
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
