<template>
  <div>
      <el-button type="info" @click="tologin">我还想去登录！</el-button>
  </div>
</template>

<script>
    export default {
        name :'Button',
        methods:{
            tologin(){
                localStorage.removeItem('a')
                this.$router.push('/login')
            }
        }
    }
</script>

<style>

</style>