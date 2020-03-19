import Vue from 'vue'
import Router from 'vue-router'

import firebase from 'firebase/app'
import 'firebase/auth'

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
                component: () => import('./views/home/Home.vue'),
                meta:{
                    authRequired:true
                }
              },
              {
                path: '/admin',
                name: 'admin',
                component: () => import('./views/admin/Admin.vue'),
                meta:{
                  authRequired:true
              }
              },
              {
                path: '/tasks',
                name: '/tasks',
                component: () => import('./views/tasks/Tasks.vue'),
                meta:{
                  authRequired:true
              }
              },
              {
                path: '/marketplace',
                name: 'marketplace',
                component: () => import('./views/marketplace/Marketplace.vue'),
                meta:{
                  authRequired:true
              }
              },
              {
                path: '/reports',
                name: 'reports',
                component: () => import('./views/Reports.vue'),
                meta:{
                  authRequired:true
              }
              },
              {
                path: '/projects',
                name: 'projects',
                component: () => import('./views/projects/Projects.vue'),
                meta:{
                  authRequired:true
                }
              
              },
              {
                path: '/projects/new',
                name: 'projects-new',
                component: () => import('./views/projects/NewProject.vue'),
                meta:{
                  authRequired:true
                }
              
              },
              {
                path: '/profile',
                name: 'profile',
                component: () => import('./views/Profile.vue'),
                meta:{
                  authRequired:true
                }
              
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
                path: '/pages/register',
                name: 'page-register',
                component: () => import('@/views/pages/Register.vue')
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
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(() => {

      // get firebase current user
      const firebaseCurrentUser = firebase.auth().currentUser

       if (
           to.path === "/pages/login" ||
           to.path === "/pages/forgot-password" ||
           to.path === "/pages/error-404" ||
           to.path === "/pages/error-500" ||
           to.path === "/pages/register" ||
      //     to.path === "/callback" ||
      //     to.path === "/pages/comingsoon" ||
           (firebaseCurrentUser)
       ) {
           return next();
       }

      // If auth required, check login. If login fails redirect to login page
      if(to.meta.authRequired) {
        if (!(firebaseCurrentUser)) {
          router.push({ path: '/pages/login', query: { to: to.path } })
        }
      }

      return next()
      // Specify the current path as the customState parameter, meaning it
      // will be returned to the application after auth
      // auth.login({ target: to.path });

  });

});


export default router
