/*=========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    isUserLoggedIn: () => (localStorage.getItem('userInfo') && firebase.auth().currentUser),
    isEmailValidated:() => firebase.auth().currentUser.emailVerified,
    firebaseToken:null,
    activeUsers:[],
    favoriteProjects:[],

}
