export default{

  async initializePublicProjectKeys({ commit ,state, rootState,dispatch}) {
    
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/projects/publicKeys/"
    await this.$http.get(url, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_PUBLIC_KEYS',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async initializePublicProjectContents({ commit, state,rootState,dispatch }) {
    
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/projects/public/"
    let token = rootState.auth.firebaseToken
    await this.$http.get(url, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_PUBLIC_CONTENTS',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async initializePrivateProjectKeys({ commit,state,rootState,dispatch }) {
    
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/projects/privateKeys/"
    let token = rootState.auth.firebaseToken
    await this.$http.get(url, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_PRIVATE_KEYS',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async initializePrivateProjectContents({ commit ,state,rootState,dispatch}) {
    
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/projects/private/"
    let token = rootState.auth.firebaseToken
    await this.$http.get(url, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_PRIVATE_CONTENTS',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async updateProject({commit,state,dispatch}){
    let project = state.selectedProject
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/projects/"
    let token = rootState.auth.firebaseToken
    await this.$http.put(url, project, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_PRIVATE_CONTENTS',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async createProject({commit,state,dispatch,rootState}, obj){
    let project = obj
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/projects/"
    let token = rootState.auth.firebaseToken
    await this.$http.post(url, project, {headers: {"Authorization" : "Bearer " + token}}).then(async res => {
      await dispatch('initializePublicProjectContents')
      await dispatch('initializePrivateProjectContents')
    })
    .catch(err => {
      console.log(err)
    })
  },


  setContentLoaded({commit}){
    commit('SET_CONTENT_LOADED')
  }

}