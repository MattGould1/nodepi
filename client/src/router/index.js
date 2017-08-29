import Vue from 'vue'
import Router from 'vue-router'
import Settings from '@/components/Settings'
import Drive from '@/components/Drive'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Drive',
      component: Drive
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})
