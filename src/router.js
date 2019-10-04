import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
              {
                path: '/',
                name: 'home',
                component: () => import('./views/Home.vue')
              },
              {
                path: '/admin',
                name: 'admin',
                component: () => import('./views/Admin.vue')
              },
              {
                path: '/marketplace',
                name: 'marketplace',
                component: () => import('./views/Marketplace.vue')
              },
              {
                path: '/reports',
                name: 'reports',
                component: () => import('./views/Reports.vue')
              },
              {
                path: '/projects',
                name: 'projects',
                component: () => import('./views/Projects.vue')
              },
            ],
        },
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
              {
                path: '/pages/login',
                name: 'page-login',
                component: () => import('@/views/pages/Login.vue')
              },
              {
                path: '/pages/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue')
              },
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
})

router.afterEach(() => {
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
