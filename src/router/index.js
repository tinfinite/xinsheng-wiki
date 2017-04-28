import Vue from 'vue'
import Router from 'vue-router'
import WikiDetail from '@/pages/WikiDetail'
import WikiConfig from '@/pages/WikiConfig'
import BookList from '@/pages/BookList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  hashbang: false,
  history: true,
  saveScrollPosition: true,
  routes: [
    {
      path: '/',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/detail',
      name: 'WikiDetail',
      component: WikiDetail
    },
    {
      path: '/config',
      name: 'WikiConfig',
      component: WikiConfig
    }
  ]
})
