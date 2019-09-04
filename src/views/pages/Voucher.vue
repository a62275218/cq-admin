<template>
    <div>
        <div style="display:flex;align-items:center;">
        <div class="global-title">优惠码列表</div><el-button type="primary" style="margin-bottom:1.5rem;margin-left:1rem;" @click="generateCode">生成优惠码</el-button>
        </div>
    <el-table
    :data="voucherList"
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
      prop="code"
      label="优惠码">
    </el-table-column>
    <el-table-column
      prop="offPrice"
      label="折扣额$">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
          <el-tag :type="switchTag(scope.row.status)">{{scope.row.status}}</el-tag>
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
      voucherList: []
    };
  },
  mounted() {
    this.fetchVoucherList();
  },
  methods: {
    async fetchVoucherList() {
      let voucherList = await request("admin/getAllVoucherInfo.php");
      this.voucherList = voucherList;
    },
    async generateCode() {
      this.$prompt("请输入优惠金额($)", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(async({ value }) => {
            let res = await request("admin/postAddNewVoucher.php",{
                method:"POST",
                data:{
                    offPrice:value
                }
            });
            console.log(res)
            if (res.length) {
              this.fetchVoucherList();
            }
            this.$message({
              type: res.length ? "success" : "error",
              message: res.length ? "生成成功!" : "生成失败"
            });
        })
    },
    switchTag(status) {
      let stat = status;
      const statusMap = {
        未使用: "success",
        已使用: "danger"
      };
      return statusMap[stat];
    },
  }
};
</script>