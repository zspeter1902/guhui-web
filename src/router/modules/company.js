import Layout from '@/layout'

const companyRouter = {
  path: '/company',
  component: Layout,
  redirect: '/company/',
  hidden: true,
  children: [
    {
      path: ':id(\\d+)',
      name: 'CompanyDetail',
      component: () => import('@/views/company/index'),
      meta: { title: '企业详情' }
    }
  ]
}

export default companyRouter
