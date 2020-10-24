import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
  path: '/',
  name: 'news',
  meta: {
    title: '新聞通知',
    keepAlive: true
  },
  component: () => import("@/views/News/index.vue")

},
{
  path: '/register',
  name: 'register',
  meta: {
    auth: false
  },
  component: () =>
    import("../views/Register/index.vue")

},
{
  path: '/forgetPassword',
  name: 'forgetPassword',
  meta: {
    auth: false
  },
  component: () => import("@/views/forgetPassword/index.vue")

},
{
  path: '/testTemp',
  name: 'testTemp',
  meta: {
    auth: false
  },
  component: () => import("@/views/testTemp.vue")

},
{
  path: '/Home',
  name: 'Home',
  component: () => import("@/views/Home/Home.vue"),
  // redirect: '/welocme',
  // children: [{
  //   path: '/welocme',
  //   component: Welcome
  // },
  // {
  //   path: '/QsList',
  //   component: QsList
  // },

  // {
  //   path: '/QSEdit/:code',
  //   component: QSEdit
  // },
  // {
  //   path: '/QSEdit/:code',
  //   component: QSFill
  // },
  // {
  //   path: '/QSData/:code',
  //   component: QSData
  // },

  // ]
}
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
