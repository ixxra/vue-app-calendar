import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import About from '@/components/About'
import Calendar from '@/components/Calendar'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          name: 'Home',
          component: Hello
      },
      {
          path: '/about',
          name: 'About',
          component: About
      },
      {
          path: '/team-dashboard',
          name: 'Calendar',
          component: Calendar
      }
  ]
})
