export default{
  async initializeAllTasks({commit,state,rootState}){
    let id = state.currentProject.key
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/all/"
    await this.$http.get(url ,{headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_ALL_CHILDREN',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async getTaskChildren({commit,state,rootState}){
    let id = state.currentTask.key
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/children/"
    await this.$http.post(url, id, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_CURRENT_CHILDREN',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async getTaskById({commit,state,rootState},id){
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/?key=" + id 
    await this.$http.post(url, id, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_FETCHED_TASK',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async getProjectChildren({commit,state,rootState}){
    let id = state.currentProject.key
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/projects/children" 
    await this.$http.post(url, id, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_CURRENT_CHILDREN',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async setCurrentParent({commit}, obj){
    commit('SET_CURRENT_PARENT', obj)
  },

  async setCurrentPath({commit}, obj){
    commit('SET_CURRENT_PATH', obj)
  },

  async setCurrentChildren({commit}, obj){
    commit('SET_CURRENT_CHILDREN', obj)
  },

  async setCurrentProject({commit}, obj){
    commit('SET_CURRENT_PROJECT', obj)
  },

  async appendToBreadcrumbTitles({commit}, obj){
    commit('APPEND_BREADCRUMB_TITLES', obj)
  },

  async popBreadcrumbTitles({commit}){
    commit('POP_CURRENT_PROJECT', obj)
  },

  async setCurrentTask({commit}, obj){
    commit('SET_CURRENT_TASK', obj)
  },


}