export default{
  
  async getTeams({commit,dispatch,state,rootState}){
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/teams"
    await this.$http.get(url, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_TEAMS',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async getTeamProjects({commit,dispatch,state,rootState}){
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/teams/children"
    let teams = state.teams
    await this.$http.post(url, teams, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('project/SET_PROJECTS',res.data,{root:true})
    })
    .catch(err => {
      console.log(err)
    })
  },

  async updateTeam({commit,dispatch,state,rootState},team){
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/teams"
    await this.$http.put(url, team, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      console.log("updated")
    })
    .catch(err => {
      console.log(err)
    })
  },

  async postTeam({commit,dispatch,state,rootState},team){
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/teams"
    await this.$http.post(url,team,{headers: {"Authorization" : "Bearer " + token}}).then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async deleteTeam({commit,dispatch,state,rootState},team){
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/teams"
    await this.$http.delete(url, {headers: {"Authorization" : "Bearer " + token},data:{team:team}}).then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })

  },

  async getArchivedTeams({commit,dispatch,state,rootState}){
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/teams/archived"
    await this.$http.get(url,{headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_ARCHIVED_TEAMS',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },




}