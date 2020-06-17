<template>
  <div class="app-container">
    <div v-loading="listLoading">
      <el-table
        :data="list"
        element-loading-text="Loading"
        :height="tableHeight"
        stripe
        border
        fit
        highlight-current-row
        class="tableBox"
      >
        <el-table-column align="center" label="#" width="80">
          <template slot-scope="scope">
            {{ (listQuery.page - 1) * listQuery.limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="公司号" width="130" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.COMPANY_NO }}
          </template>
        </el-table-column>
        <el-table-column label="线路号" width="100" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.LINE_NO }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车辆号" width="100" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.CAR_NO }}
          </template>
        </el-table-column>
        <el-table-column label="POS编号" width="100" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.POS_ID }}
          </template>
        </el-table-column>
        <el-table-column label="当月基础票价" width="120" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.MONTH_CURR_PRICE }}
          </template>
        </el-table-column>
        <el-table-column label="PASM卡号" width="160" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.PASM_NO }}
          </template>
        </el-table-column>
        <el-table-column label="最后签到时间" width="160" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.REG_TIME }}
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="queryData" />
    </div>
  </div>
</template>

<script>
import { getPosInfoList } from '@/api/posInfo'
import pagination from '@/components/Pagination'

export default {
  components: { pagination },
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
      tableHeight: document.documentElement.clientHeight - 153,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 50
      }
    }
  },
  mounted() {
    window.onresize = () => {
      this.tableHeight = document.documentElement.clientHeight - 153
    }
  },
  created() {
    this.queryData()
  },
  methods: {
    queryData() {
      this.listLoading = true
      getPosInfoList(this.listQuery).then(response => {
        this.list = response.rows
        this.total = response.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.2 * 1000)
      })
    }
  }
}
</script>
