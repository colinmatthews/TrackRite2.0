
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  async initializePieData({ commit, rootState}) {
    let key = rootState.tasks.currentTask.key

    if (typeof(key) == 'undefined'){
      key = rootState.tasks.currentProject.key
    }
    
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/dashboard/pie"
    await this.$http.post(url, key, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_PIE_DATA',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async initializeBarData({ commit, rootState}) {
    let date = new Date()
    let children = rootState.tasks.children
    let data = {
      children:children,
      date:date
    }
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/dashboard/bar"

    await this.$http.post(url, data, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_BAR_DATA',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async initializeColumnData({ commit, rootState}) {
    let key = rootState.tasks.currentTask
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/dashboard/column"
    await this.$http.post(url, key, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_COLUMN_DATA',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

}