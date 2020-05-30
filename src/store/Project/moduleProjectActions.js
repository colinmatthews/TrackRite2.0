export default{

  async updateProject({commit,state,dispatch,rootState}){
    let project = state.selectedProject
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/projects/"
    let token = rootState.auth.firebaseToken
    await this.$http.put(url, project, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      console.log(res)
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
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async removeProject({commit,state,dispatch,rootState},obj){
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/projects/"
    let token = rootState.auth.firebaseToken
    await this.$http.delete(url, {headers: {"Authorization" : "Bearer " + token},data:{project:obj}}).then(async res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  },


  setContentLoaded({commit}){
    commit('SET_CONTENT_LOADED')
  }

}