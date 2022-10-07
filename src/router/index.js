import VueRouter from 'vue-router'

import beforeEachFn from './before-each'
import routes from './routes'

export default ({ Vue, store }) => {
  Vue.use(VueRouter)

  const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior: () => ({ x: 0, y: 0 })
  })

  router.beforeEach(beforeEachFn(store))

  return router
}
