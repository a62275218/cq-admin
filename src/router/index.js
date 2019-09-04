import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')


const Bill = () => import('@/views/pages/Bill')
const Voucher = () => import('@/views/pages/Voucher')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name:'Login',
      component:Login,
      meta:{
        auth:false
      }
    },
    {
      path: '/dashboard',
      name: '首页',
      component: DefaultContainer,
      children: [
        // {
        //   path: 'dashboard',
        //   name: 'Dashboard',
        //   icon: 'icon-speedometer',
        //   component: Dashboard
        // },
        {
          path:'/bill',
          name:'订单管理',
          component:Bill,
          meta:{
            auth:true
          }
        },
        {
          path:'/voucher',
          name:'优惠码管理',
          component:Voucher,
          meta:{
            auth:true
          }
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        }
      ]
    }
  ]
})
