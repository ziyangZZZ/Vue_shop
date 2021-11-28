import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Button from '@/views/Button'
Vue.use(VueRouter)

const routes = [
  {
    path : '/',
    redirect : '/login'
  },
  {
  name: '登录',
  path: '/login',
  component: Login
 },
 {
   name:'主页',
   path:'/main',
   component:Button
 }
]

const router = new VueRouter({
  routes
})

router.beforeEach(function(to,from,next){  //等有其他组件 来测试一哈
  const itsToken = localStorage.getItem('a')
  to.path ==='/login' ? next(): itsToken ? next() : next('/login')
})
export default router
