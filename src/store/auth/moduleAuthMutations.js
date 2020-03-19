/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from "../../http/axios/index.js"

export default {
  SET_BEARER(state, accessToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
  },
  SET_TOKEN(state,token){
    state.firebaseToken = token
  },
  UPDATE_AUTHENTICATED_USER(state, user) {
		localStorage.setItem('userInfo', JSON.stringify(user));
		localStorage.setItem('userRole', 'admin');
  },
  SET_ACTIVE_USERS(state,array){
    state.activeUsers = array
  },
  PUSH_FAVORITE_PROJECTS(state,item){
    state.favoriteProjects.push(item)
  }, 
  SPLICE_FAVORITE_PROJECTS(state,item){
    let itemId = item.key.id
    let projectIds = state.favoriteProjects.map(x => x.key.id)

    let index = projectIds.indexOf(itemId)
  
    if (index > -1) {
      state.favoriteProjects.splice(index, 1);
    }
  },
  SET_FAVORITE_PROJECTS(state,item){
    state.favoriteProjects = item
  }
}
