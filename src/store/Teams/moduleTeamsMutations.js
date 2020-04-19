export default{
  SET_TEAMS(state,array){
    state.teams = array
  },
  SET_CURRENT_TEAM(state,obj){
    state.currentTeam = obj
  },
  SET_ARCHIVED_TEAMS(state,array){
    state.archivedTeams = array
  }
}