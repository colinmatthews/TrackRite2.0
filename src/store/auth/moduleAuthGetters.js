/*=========================================================================================
  File Name: moduleAuthGetters.js
  Description: Auth Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  currentUserKey:(state) => {
    let allUsers = state.activeUsers
    let uid = firebase.auth().currentUser.uid
    let currentUserKey = {}

    allUsers.forEach(el => {
      console.log(el)
      console.log(el.uid == uid)
      if(el.uid == uid){
        currentUserKey = el.key
      }
    });

    return currentUserKey
  }

}
