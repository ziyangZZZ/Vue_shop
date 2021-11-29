<template>
  <div class="main">
    <div class="itsheader">
      <div>
        <h1>哔哩哔哩矿业无限公司</h1>
      </div>
      <div class="btn">
        <el-button type="info" @click="tologin">我还想去登录！</el-button>
      </div>
    </div>
    <div class="container">
      <div class="container-aside" :style="{width:n+'px'}">
        <div class="changeButton" @click="switchMenu">|||</div>  
        <el-menu
          router
          :collapse-transition="false"
          :collapse="isCollapse"
          unique-opened
          active-text-color="#409EFF"
          @open="handleOpen"
          @close="handleClose"
          background-color="#333744"
          text-color="#eaedf1"
        >
          <el-submenu :index="'/'+item.path" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-lock"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item :index="subItem.id+''" v-for="subItem in item.children" :key="subItem.id">{{subItem.name}}</el-menu-item>
            </el-submenu>
        </el-menu>
      </div>
      <div class="container-right">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      menuList: [
        {
          name: "用户管理",
          id: '01',
          path:'01',
          children: [
            {
              name: "用户列表",
              id: 11,
              path:'11',
            },
            {
              name: "用户数据",
              id: 12,
              path:'12',
            },
          ],
        },
        {
          name: "权限管理",
          id: 10,
          path:'10',
          children: [
            {
              name: "vip列表",
              id: 21,
              path:'21',
            },
            {
              name: "VIP数据",
              id: 22,
              path:'22',
            },
          ],
        },
        {
          name: "订单管理",
          id: 22,
          path:'22',
          children: [
            {
              name: "订单列表",
              id: 31,
              path:'31',
            },
            {
              name: "订单数据",
              id: 32,
              path:'32',
            },
          ],
        },
      ],
      isCollapse:false,
      n : 280,
      activePath:'',
    };
  },
  methods: {
    tologin() {
      localStorage.removeItem("a");
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    switchMenu(){
        this.isCollapse = !this.isCollapse
       if(!this.isCollapse) {
           this.n = 280
       }else{
           this.n = 80
       }
    },
    // lightMenu(activePath){
    //     localStorage.setItem('activePath',activePath)
    // }
  },
  created(){
    //   this.activePath = localStorage.getItem('activePath')
    //   this.activePath = activePath
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  background-color:wheat;
  display: flex;
  flex-direction: column;

  .itsheader {
    flex-basis: 80px;
    width: 100%;
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    .btn {
      display: flex;
      align-items: center;
    }
  }
  .container {
      
    flex-grow: 1;
    // background-color: brown;
    display: flex;

    .container-aside {
        // width: 211px;
      height: 100%;
      background-color: #333744;
      .changeButton{
          background-color: #4a5064;
          height: 25px;
          display: flex;
          justify-content: center;
          font-size: 25px;
          letter-spacing: 0.3;
      }
    }
    .container-right {
      width: 100%;
      height: 100%;
      background-color: #eaedf1;
    }
  }
}
.el-menu{
    border-right: 0;
}
</style>
