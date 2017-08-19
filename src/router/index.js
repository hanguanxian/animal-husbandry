import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: Index
  }, {
    path: '/login',
    component: resolve => require(['@/components/Login.vue'], resolve)
  },{
    path: '/breedingLog',
    component: resolve => require(['@/components/breedingLog.vue'], resolve)
  }
  ]
})
