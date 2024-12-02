import Layout from '@/layout'
const userRouter = {
  path: '/my',
  component: Layout,
  redirect: '/my/collect',
  hidden: true,
  children: [
    {
      path: 'collect',
      name: 'MyCollect',
      component: () => import('@/views/my/index'),
      // component: { render: c => c('router-view') },
      meta: { title: '我的收藏', icon: 'el-icon-star-on' },
      children: [
        {
          path: 'product',
          name: 'MyCollectProduct',
          component: () => import('@/views/my/collect-product'),
          meta: { title: '产品收藏' }
        },
        {
          path: 'company',
          name: 'MyCollectCompany',
          component: () => import('@/views/my/collect-company'),
          meta: { title: '企业收藏' }
        }
      ]
    }
  ]
}

export default userRouter
