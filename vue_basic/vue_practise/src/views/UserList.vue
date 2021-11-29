<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/main/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="30">
        <el-col :span="11">
          <el-input
            placeholder="请输入姓名"
            v-model="query"
            clearable
            @clear="reset"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="userSeracher"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="openDialog">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户数据表 -->
      <el-table :data="elUserList" border stripe class="table">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="权限" prop="role"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @click="saveCurrentStatus()"
              @change="userStatusChange"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row, $index }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="openEditForm(row, $index)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser($index)"
            ></el-button>
            <!-- <el-tooltip
              effect="dark"
              content="分配权限"
              placement="top"
              :enterable="false"
            > -->
              <el-button
                @click="openAccessAllotDialog(row)"
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            <!-- </el-tooltip> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2, 3, 4]"
          :page-size="pageSize"
          layout=" sizes, prev, pager, next, jumper"
          :total="userList.length"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialog" width="50%">
      <!-- 内容主题区 -->
      <el-form :rules="addFormRules" :model="addUser" ref="addFormRef">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="addUser.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="addUser.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddUser">取 消</el-button>
        <el-button type="primary" @click="ensureAddUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户信息对话框 -->
    <el-dialog title="编辑用户信息" :visible.sync="editDialog" width="50%">
      <!-- 编辑内容主题区 -->
      <el-form :rules="addFormRules" :model="editUser" ref="editFormRef">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="editUser.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="editUser.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditUser">取 消</el-button>
        <el-button type="primary" @click="ensureEditUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配用户权限 -->
    <el-dialog title="权限分配" :visible.sync="accessAllotDialog" width="50%">
     
      <el-select v-model="value" placeholder="请选择" ref="accessAllotDialog">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAccessAllot">取 消</el-button>
        <el-button type="primary" @click="ensureAccessAllot">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    // 验证邮箱格式   尼玛为什么要用正则！！！！！！就不能整点我会的！！！！！
    //   let checkEmail = (rule,value,callback)=>{
    //   }
    return {
      userList: [
        {
          name: "张三",
          email: "xxx@xxx.com",
          role: "管理员",
          status: true,
        },
        {
          name: "李四",
          email: "xxx@xxx.com",
          role: "管理员",
          status: true,
        },
        {
          name: "王五",
          email: "xxx@xxx.com",
          role: "管理员",
          status: false,
        },
        {
          name: "赵六",
          email: "xxx@xxx.com",
          role: "超级管理员",
          status: true,
        },
      ],
      options:[
          {
              value:'管理员',
              label:'管理员'
          },
          {
              value:'超级管理员',
              label:'超级管理员'
          },
          {
              value:'VIP',
              label:'VIP'
          }
      ],
      value:'',
      pageSize: 2,
      currentPage: 1,
      elUserList: [],
      query: '',
      addDialog: false,
      editDialog: false,
      accessAllotDialog: false,
      addFormRules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "姓名应在3～10个字符", trigger: "blur" },
        ],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }], //{validator:checkEmail,trigger:'blur'}
      },
      addUser: {
        name: "",
        email: "",
      },
      editUser: {},
    };
  },
  methods: {
    handleSizeChange(currentSize) {
      this.pageSize = currentSize;
      this.getElUserList();
    },
    getElUserList() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      const arr = this.userList.filter((ele, index) => {
        return start <= index && index < end;
      });
      this.elUserList = arr;
    },
    handleCurrentChange(current) {
      this.currentPage = current;
      this.getElUserList();
    },
    userStatusChange(currentStatus) {
        // console.log('currentStatus',currentStatus);
        localStorage.setItem('currentStatus',currentStatus)
    },
    userSeracher() {
      if(this.query === '') {
          this.$message.error('请输入要查询的姓名！')
        return;
      } else {
        console.log('query',this.query);
        const arr = this.userList.filter((ele)=>{
            // console.log('ele',ele);
           return ele.name === this.query
        })
        console.log('arr',arr);
        this.elUserList = arr
        this.$message.success('搜索成功！')
      }
    },
    reset() {
      this.getElUserList();
    },
    openDialog() {
      this.addDialog = true;
    },
    cancelAddUser() {
      this.$refs.addFormRef.resetFields();
      this.addDialog = false;
    },
    async ensureAddUser() {
      let p = this.$refs.addFormRef.validate();
      if (!(await p)) {
        this.$message.error('用户添加失败！')
        return;
      } else {
        this.userList.push(this.addUser);
        this.addDialog = false;
        this.getElUserList();
        this.$message.success('用户添加成功！')
      }
    },
    openEditForm(row) {
      this.editDialog = true;
      this.editUser = row;
    },
    cancelEditUser() {
      this.$refs.editFormRef.resetFields();
      this.editDialog = false;
    },
    async ensureEditUser() {
      let p = await this.$refs.editFormRef.validate();
      if ( p) {
        let index = this.userList.findIndex((ele) => {
          ele.name === this.editUser.name;
        });
        this.userList.splice(index, 1, this.editUser);
        this.editDialog = false;
        this.getElUserList();
        this.$message.success('用户信息修改成功！')
      } else {
        this.$message.error('用户信息修改失败！')
        return;
      }
    },
    deleteUser(index) {
      this.userList.splice(index, 1);
      this.getElUserList();
      this.$message.success('用户删除成功！')
    },
    openAccessAllotDialog(row) {
      this.accessAllotDialog = true;
      this.editUser = row;
    //   console.log('row',this.editUser);
      
    },
    cancelAccessAllot() {
      this.accessAllotDialog = false;
    //   this.$refs.accessAllotDialog.clear()
    },
    ensureAccessAllot() {
        // console.log('value',this.value);
        this.editUser.role = this.value
        let index = this.userList.findIndex((ele) => {
          ele.name === this.editUser.name;
        });
        this.userList.splice(index, 1, this.editUser);
        this.accessAllotDialog = false;
        this.getElUserList();
        this.$message.success('权限分配成功！')
    },
  },
  mounted() {
    this.getElUserList();
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
.pagination {
  margin-top: 20px;
}
</style>
