import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Main from '@/views/Main'
import Welcome from '@/views/Welcome'
import UserList from '@/views/UserList'
import Access from '@/views/Access'


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
   redirect:'/welcome',
   component:Main,
   children:[
     {
       name: '欢迎',   
       path: 'welcome',  //自路由路径不用加 / ，但是访问时要加
       component:Welcome
     },
     {
       name:'用户列表',
       path:'11',
       component:UserList
     },
     {
      name:'权限管理',
      path:'21',
      component:Access
    },
   ]
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
