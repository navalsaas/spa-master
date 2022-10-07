const beforeEach = (store) => (to, _, next) => {
  const requireLogin = to.meta.requireLogin || false

  store
    .dispatch('auth/checkUserToken')
    .then(user => {
      if (requireLogin) {
        next()
        return
      }

      next()
    })
    .catch(() => {
      if (requireLogin) {
        next({
          name: 'auth-login'
        })
        return
      }

      next()
    })
}

export default beforeEach
