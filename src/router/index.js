import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

let events = [],
    users = ["A", "B", "C"],
    user = "A";


export default new Router({
  routes: [
      {
          path: '/',
          name: 'Home',
          component: Home,
          props: {events: events, users: users, user: user}
      },
      {
          path: '/about',
          name: 'About',
          component: About
      },
      {
          path: '/team-dashboard',
          name: 'Dashboard',
          component: Dashboard,
          props: {users: users, events: events, user: user}
      }
  ]
})
