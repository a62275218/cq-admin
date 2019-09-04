<template>
    <div>
    <div class="global-title">订单列表</div>
    <el-table
    :data="billList"
    style="width: 100%"
    border
    max-height="800">
    <el-table-column
    type="index"
    label="序号"
    width="50"
    :index="index=>index+1">
    </el-table-column>
    <el-table-column
      prop="id"
      sortable
      label="订单号">
    </el-table-column>
    <el-table-column
      label="服务项目">
      <template slot-scope="scope">
          {{scope.row.serviceInfo.name || '暂无'}}
      </template>
    </el-table-column>
    <el-table-column
      label="项目类型">
      <template slot-scope="scope">
          {{scope.row.serviceInfo.type || '暂无'}}
      </template>
    </el-table-column>
    <el-table-column
      label="额外项目"
      width="140">
      <template slot-scope="scope">
          <el-row v-for="(item,index) in scope.row.serviceInfo.extraList" :key="index">
              <el-col :span="20">{{item.label}}</el-col>
              <el-col :span="4">X{{item.count}}</el-col>
            </el-row> 
      </template>
    </el-table-column>
    <el-table-column
      prop="totalPrice"
      sortable
      label="订单金额"
      width="110">
    </el-table-column>
    <el-table-column
      label="订单状态">
      <template slot-scope="scope">
          <el-tag :type="switchTag(scope.row.status)">{{scope.row.status}}</el-tag>
      </template> 
    </el-table-column>
    <el-table-column
      prop="makeOrderDate"
      label="下单日期"
      width="110">
    </el-table-column>
    <el-table-column
      label="服务时间"
      width="160">
      <template slot-scope="scope">
            <el-row>
              <el-col :span="16">{{scope.row.serviceDate}}</el-col>
              <el-col :span="8">{{scope.row.serviceTime}}</el-col>
            </el-row> 
      </template>
    </el-table-column>
    <el-table-column
      label="姓名">
      <template slot-scope="scope">
          {{scope.row.userInfo.name || '暂无'}}
      </template>
    </el-table-column>
    <el-table-column
      label="手机">
      <template slot-scope="scope">
          {{scope.row.userInfo.mobile || '暂无'}}
      </template>
    </el-table-column>
    <el-table-column
      label="微信">
      <template slot-scope="scope">
          {{scope.row.userInfo.wechat || '暂无'}}
      </template>
    </el-table-column>
    <el-table-column
      label="地址"
      width="200">
      <template slot-scope="scope">
          {{scope.row.userInfo.address || '暂无'}}
      </template>
    </el-table-column>
    <el-table-column
      label="备注"
      width="200">
      <template slot-scope="scope">
          {{scope.row.userInfo.notes || '暂无'}}
      </template>
    </el-table-column>
    <el-table-column
        fixed="right"
        width="310"
      label="操作">
      <template slot-scope="scope">
          <el-button
          size="mini"
          type="success"
          @click="handleModify('finish', scope.row)">完成订单
          </el-button>
      <el-button
          size="mini"
          type="danger"
          @click="handleModify('cancel', scope.row)">取消订单
          </el-button>
          <el-button
          size="mini"
          type="primary"
          @click="handleModify('modify', scope.row)">修改服务时间
          </el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>
<script>
import { request } from "../../utils";
export default {
  data() {
    return {
      billList: []
    };
  },
  mounted() {
    this.fetchBillList();
    console.log(this.billList);
  },
  methods: {
    async fetchBillList() {
      let billList = await request("admin/getAllOrderInfo.php");
      billList.forEach(item => {
        try {
          item.serviceInfo = JSON.parse(item.serviceInfo);
          item.userInfo = JSON.parse(item.userInfo);
        } catch (e) {}
      });
      this.billList = billList;
    },
    switchTag(status) {
      let stat = status;
      const statusMap = {
        已完成: "success",
        未完成: "",
        已取消: "danger"
      };
      return statusMap[stat];
    },
    handleModify(type, row) {
      console.log(row);
      if(row.status === '已完成' && type === "finish"){
          return
      }
      if(row.status === '已取消' && type === "cancel"){
          return
      }
      if (type === "cancel" || type === "finish" ) {
        this.$confirm(`确认${type === 'cancel'?'取消':'完成'}该订单?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            let res = await request("admin/postModifyOrder.php", {
              method: "POST",
              data: {
                id: row.id,
                status: type === 'cancel'?"已取消":"已完成"
              }
            });
            if (res.code == 0) {
              this.fetchBillList();
            }
            this.$message({
              type: res.code == 0 ? "success" : "error",
              message: res.code == 0 ? "修改成功!" : "修改失败"
            });
          })
          .catch(() => {});
      } else {
        let date = "",
          time = "";
        this.$prompt("请输入日期,格式YYYY-MM-DD", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(({ value }) => {
          date = value;
          this.$prompt("请输入时间,格式HH:SS", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }).then(async ({ value }) => {
            time = value;
            let res = await request("admin/postModifyOrder.php", {
              method: "POST",
              data: {
                id: row.id,
                serviceDate: date,
                serviceTime: time
              }
            });
            if (res.code == 0) {
              this.fetchBillList();
            }
            this.$message({
              type: res.code == 0 ? "success" : "error",
              message: res.code == 0 ? "修改成功!" : "修改失败"
            });
          });
        });
      }
    }
  }
};
</script>

