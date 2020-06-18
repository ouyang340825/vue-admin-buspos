<template>
  <div class="app-container">
    <div class="queryBlock">
      <el-row>
        <el-col :span="6">
          <el-input v-model="text1" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="text2" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="text1" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="buttenBlock" style="margin-top: 10px">
      <el-row>
        <el-button size="mini" plain>查询</el-button>
        <el-button type="primary" size="mini" plain>重置</el-button>
        <el-button type="success" size="mini" plain>导出</el-button>
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
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

      <el-table-column label="是否超时" width="100" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span
            :style="{
              'color': scope.row.OVER_TIME === '2M' ? 'red' : scope.row.OVER_TIME === '1M' ? '#ff8e18;' : '#37a733;'
            }"
          >
            {{ scope.row.OVER_TIME | overTimeFormatter }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="queryData" />
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
    },
    overTimeFormatter(OVER_TIME) {
      const map = {
        '2M': '超时2天',
        '1M': '超时1天'
      }
      return map[OVER_TIME] ? map[OVER_TIME] : '正常'
    }
  },
  data() {
    return {
      text1: null,
      text2: null,
      text3: null,
      tableHeight: document.documentElement.clientHeight - 265,
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
      this.tableHeight = document.documentElement.clientHeight - 265
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
    },
    formatOverTime: function(row, column) {
      return row.OVER_TIME === '2M' ? '<span style="color:red;">超时2天</span>'
        : row.OVER_TIME === '1M' ? '<span style="color:#ff8e18;">超时1天</span>'
          : '"<span style="color:#37a733;">正常</span>'
    }
  }
}
</script>
<style scoped>
</style>

