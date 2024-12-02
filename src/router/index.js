import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import userRouter from './modules/user'
import serviceRouter from './modules/service'
import companyRouter from './modules/company'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    // alwaysShow: true,
    children: [{
      path: 'Index',
      name: 'Index',
      component: () => import('@/views/index/index'),
      meta: { title: '首页' }
    }]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news/index',
    children: [
      {
        path: 'index',
        name: 'News',
        component: () => import('@/views/news/index'),
        meta: { title: '园区头条', activeMenu: '/news' }
      },
      {
        path: 'detail/:id(\\d+)',
        name: 'NewsDetail',
        hidden: true,
        component: () => import('@/views/news/detail'),
        meta: { title: '新闻详情', activeMenu: '/news' }
      }
    ]
  },
  {
    path: '/train',
    component: Layout,
    redirect: '/train/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/train/index'), // Parent router-view
        name: 'Train',
        meta: { title: '园区活动', activeMenu: '/train' }
      },
      {
        path: 'activity/:id(\\d+)',
        component: () => import('@/views/train/detail'), // Parent router-view
        name: 'TrainDetail',
        hidden: true,
        meta: { title: '活动详情', activeMenu: '/train' }
      },
      {
        path: 'job-detail/:id(\\d+)',
        component: () => import('@/views/train/job-detail'), // Parent router-view
        name: 'TrainJobDetail',
        hidden: true,
        meta: { title: '职业详情', activeMenu: '/train' }
      }
    ]
  },

  serviceRouter,

  {
    path: '/about',
    component: Layout,
    redirect: '/about/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/about/index'), // Parent router-view
        name: 'About',
        meta: { title: '政策服务', activeMenu: '/about' }
      }
    ]
  },

  companyRouter,

  {
    path: '/law',
    component: Layout,
    redirect: '/law/index',

    children: [
      {
        path: 'index',
        component: () => import('@/views/law/index'), // Parent router-view
        name: 'Law',
        meta: { title: '政策服务' }
      }
    ]
  },
  {
    path: '/train/activity/sign-in/:id(\\d+)',
    name: 'TrainSignIn',
    hidden: true,
    component: () => import('@/views/train/sign-in'), // Parent router-view
    meta: { title: '活动签到', activeMenu: '/train' }
  },
  {
    path: '/train/activity/sign-in-info/:id(\\d+)',
    name: 'TrainSignInInfo',
    hidden: true,
    component: () => import('@/views/train/sign-in-info'), // Parent router-view
    meta: { title: '活动信息', activeMenu: '/train' }
  },
  {
    path: '/train/activity/questionnaire/:id(\\d+)',
    name: 'TrainQuestionnaire',
    hidden: true,
    component: () => import('@/views/train/questionnaire'), // Parent router-view
    meta: { title: '调查问卷', activeMenu: '/train' }
  },
  {
    path: '/question-bank/activity-answer-questions/:id(\\d+)',
    name: 'ActivityAnswerQuestions',
    hidden: true,
    component: () => import('@/views/question-bank/activity-test'), // Parent router-view
    meta: { title: '答题竞赛', activeMenu: '/train' }
  },
  {
    path: '/question-bank/list',
    name: 'QuestionsBank',
    hidden: true,
    component: () => import('@/views/question-bank/index'), // Parent router-view
    meta: { title: '题库' }
  },
  {
    path: '/question-bank/exam/:id(\\d+)',
    name: 'AnswerQuestions',
    hidden: true,
    component: () => import('@/views/question-bank/exam'), // Parent router-view
    meta: { title: '考试' }
  },
  {
    path: '/screen/index',
    name: 'Screen',
    hidden: true,
    component: () => import('@/views/screen/index'), // Parent router-view
    meta: { title: '数据大屏' }
  }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
  userRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const envPath = ['production', 'development'].includes(process.env.NODE_ENV) ? '/' : '/'
const createRouter = () => new Router({
  // mode: 'history', // require service support
  base: envPath,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else if (to.name === 'Service') {
      return {}
    } else {
      return { y: 0 }
    }
  },
  routes: constantRoutes.concat(asyncRoutes)
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
