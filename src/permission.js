// import axios from 'axios'
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

const white = '/my/collect' // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  // const CancelToken = axios.CancelToken
  // store.state.app.source.cancel && store.state.app.source.cancel()
  // store.state.app.source = CancelToken.source()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next()
    } else {
      try {
        next()
      } catch (error) {
        await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    /* has no token*/
    if (to.path.indexOf(white) !== -1) {
      // in the free login whitelist, go directly
      Message({
        type: 'error',
        message: '您需要登录后进行访问！',
        duration: 6000
      })
      next(`/login?redirect=${to.path}`)
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next()
    }
  }
})
