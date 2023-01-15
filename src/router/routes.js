import Layout from '../layouts/MainLayout.vue'

const routes = [
  {
    name: 'index',
    path: '/',
    component: Layout,
    redirect: { path: 'inicio' },
    children: [
      {
        name: 'Main-Dashboard',
        path: 'inicio',
        component: () => import('src/pages/Admin/IndexDashboard.vue')
      },
      {
        name: 'List-Beer',
        path: 'Lista',
        component: () => import('src/components/IndexList.vue')
      },
      {
        name: 'Repocitory',
        path: 'repositorio/:BeerId',
        component: () => import('src/components/Card/CardBeer.vue')
      },
      {
        name: 'Manage',
        path: 'Administrar',
        component: () => import('src/components/IndexAdmin.vue')
      },
      {
        name: 'Proposal',
        path: 'propuesta',
        component: () => import('src/components/IndexProposal.vue')
      },
      {
        name: 'Setting',
        path: 'configuracion',
        component: () => import('src/components/IndexConfiguration.vue')
      },
      {
        name: 'account',
        path: 'cuenta',
        component: () => import('src/components/IndexCuenta.vue')
      },
      {
        name: 'log_out',
        path: 'salir',
        component: () => import('src/components/IndexDashboard.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
