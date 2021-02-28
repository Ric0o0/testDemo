import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '../views/Film'
import Cinema from '../views/Cinema'
import Nowplaying from '../views/film/Nowplaying'
import Comingsoon from '../views/film/Comingsoon'
import Detail from '../views/Detail'
// const Login = () => import(/* webpackChunkName: "ricogroup" */ '../views/login.vue')
// const Center = () => import(/* webpackChunkName: "ricogroup" */ '../views/Center.vue')
Vue.use(VueRouter) // 注册模块

const routes = [
  {
    path: '/film',
    component: Film,
    children: [
      // 嵌套路由
      {
        path: 'nowplaying',
        component: Nowplaying
      },
      {
        path: 'comingsoon',
        component: Comingsoon
      },
      {
        path: '',
        redirect: 'nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    component: Cinema
  },
  {
    path: '/center',
    // component: () => import('../views/Center') // 路由懒加载
    component: () => import(/* webpackChunkName: "ricogroup" */ '../views/Center.vue')
  },
  {
    path: '/detail/:myid', // 动态路由
    component: Detail,
    name: 'ricoDetail' // 可以通过名字找到当前路由
  },
  // {
  //   path: '/detail', // query方式跳转
  //   component: Detail
  // },
  {
    path: '/login',
    // component: () => import('../views/login')
    component: () => import(/* webpackChunkName: "ricogroup" */ '../views/login.vue')
  },
  {
    path: '/city',
    component: () => import(/* webpackChunkName: "ricogroup" */ '../views/City.vue')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "ricogroup" */ '../views/Search.vue')
  },
  {
    path: '*',
    redirect: '/film' // 重定向
  }
]

const router = new VueRouter({
  mode: 'history', // hash, history
  // history 模式需要后台支持, 否则会报404
  // 要在服务器增加一个能覆盖所有情况的候选资源: 如果url匹配不到任何静态资源, 则返回同一个index.html页面, 这个页面就是前段app依赖的页面
  routes
})

// 全局路由守卫  局部在center中
router.beforeEach((to, from, next) => {
  // console.log(to)
  const auth = ['/center', '/order', '/money']
  if (auth.includes(to.fullPath)) {
    if (!localStorage.getItem('token')) {
      // 检查是否有token, 如果没有, 重定向到login
      console.log('验证token')
      next('/login') // 为假跳转至login
    } else {
      next() // 为真放行
    }
  } else {
    next()
  }
})
export default router
