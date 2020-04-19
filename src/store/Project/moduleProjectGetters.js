export default{
 
  getDisplayName:(state, getters, rootState) => (uid) => {
    let users = rootState.auth.activeUsers
    let displayName = ""
    users.forEach(el => {
      
      if(el.uid === uid){
        displayName = el.displayName
      }
    })

    return displayName
  },
  getProjectsForNavbarSearch:(state) => { 
   
      let projects = state.projects
      let data = {}
      data.projects = {}
      data.projects.key = 'title'
      data.projects.data = []

      projects.forEach(el => {
        data.projects.data.push({
          title:el.title,
          id:el.key.id
        })
      })

      return data
  }
  
}