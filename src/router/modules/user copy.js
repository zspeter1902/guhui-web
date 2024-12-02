import Layout from '@/layout'
const userRouter = {
  path: '/my',
  component: Layout,
  redirect: '/my/info',
  hidden: true,
  children: [
    {
      path: 'info',
      name: 'MyIndex',
      component: () => import('@/views/my/index'),
      redirect: '/my/info/info',
      meta: { title: '我的跨境汇', icon: 'el-icon-s-order' },
      children: [
        {
          path: 'info', // info
          name: 'MyInfo',
          component: () => import('@/views/my/info'),
          meta: { title: '信息完善', icon: 'el-icon-s-order' }
        },
        {
          path: 'product',
          name: 'MyProduct',
          component: () => import('@/views/my/product'),
          meta: { title: '我的产品', icon: 'el-icon-s-goods' }
        },
        {
          path: 'need',
          name: 'MyNeed',
          component: () => import('@/views/my/need'),
          meta: { title: '我的需求', icon: 'el-icon-s-opportunity' }
        },
        {
          path: 'warehouse',
          name: 'MyWarehouse',
          component: () => import('@/views/my/warehouse'),
          meta: { title: '我的海外仓', icon: 'el-icon-s-grid' }
        },
        {
          path: 'collect',
          name: 'MyCollect',
          component: { render: c => c('router-view') },
          meta: { title: '我的收藏', icon: 'el-icon-star-on' },
          children: [
            {
              path: 'product',
              name: 'MyCollectProduct',
              component: () => import('@/views/my/collect-product'),
              meta: { title: '产品收藏', activeMenu: '/my/info/collect' }
            },
            {
              path: 'company',
              name: 'MyCollectCompany',
              component: () => import('@/views/my/collect-company'),
              meta: { title: '企业收藏' }
            }
          ]
        },
        {
          path: 'product-release',
          name: 'ProductRelease',
          component: () => import('@/views/my/create-product'),
          meta: { title: '发布产品', icon: 'el-icon-s-release' }
        },
        {
          path: 'product-edit/:id(\\d+)',
          name: 'ProductEdit',
          component: () => import('@/views/my/create-product'),
          hidden: true,
          meta: { title: '编辑产品', icon: 'el-icon-s-release' }
        },
        {
          path: 'need-release',
          name: 'NeedRelease',
          component: () => import('@/views/my/create-need'),
          meta: { title: '发布需求', icon: 'el-icon-s-release' }
        },
        {
          path: 'storehouse-release',
          name: 'StorehouseRelease',
          component: () => import('@/views/my/create-storehouse'),
          meta: { title: '发布海外仓', icon: 'el-icon-s-release' }
        },
        {
          path: 'storehouse-edit/:id(\\d+)',
          name: 'StorehouseEdit',
          component: () => import('@/views/my/create-storehouse'),
          hidden: true,
          meta: { title: '编辑海外仓', icon: 'el-icon-s-release' }
        }
      ]
    }
  ]
}

export default userRouter
