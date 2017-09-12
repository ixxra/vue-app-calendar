import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Calendar from '@/components/Calendar'

Vue.use(Router)

let events = [],
    users = ["A", "B", "C"];



export default new Router({
  routes: [
      {
          path: '/',
          name: 'Home',
          component: Home,
          props: {events: events, users: users, user: "A"}
      },
      {
          path: '/about',
          name: 'About',
          component: About
      },
      {
          path: '/team-dashboard',
          name: 'Calendar',
          component: Calendar,
          props: {users: users, events: events}
      }
  ]
})
