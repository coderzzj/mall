import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: ()=> import("../views/home/home")
    },
    {
      path: "/class",
      name: "class",
      component: ()=> import("../views/class/class")
    },
    {
      path: "/shopcar",
      name: "shopcar",
      component: ()=> import("../views/shopcar/shopcar")
    },
    {
      path: "/user",
      name: "user",
      component: ()=> import("../views/user/user")
    },
    {
      path: "/detail/:iid",
      name: "detail",
      component: ()=> import("../views/detail/detailHome")
    },
    {
      path: "/settlement",
      name: "settlement",
      component: ()=> import("../views/settlement/settlement")
    }
  ]
})

export default router
