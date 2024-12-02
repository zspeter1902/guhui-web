import Layout from '@/layout'

const serviceRouter = {
  path: '/service',
  component: Layout,
  redirect: '/service/index',
  children: [
    {
      path: 'index',
      name: 'Service',
      component: () => import('@/views/service/index'),
      meta: { title: '服务联盟' }
    },
    {
      path: 'detail/:id(\\d+)',
      name: 'ServiceDetail',
      hidden: true,
      component: () => import('@/views/service/detail'),
      meta: { title: '产品详情' }
    },
    {
      path: 'need-detail/:id(\\d+)',
      name: 'ServiceNeedDetail',
      hidden: true,
      component: () => import('@/views/service/need-detail'),
      meta: { title: '需求详情' }
    },
    {
      path: 'search',
      name: 'ServiceSearch',
      hidden: true,
      component: () => import('@/views/service/search'),
      meta: { title: '搜索结果' }
    }
  ]
}

export default serviceRouter
