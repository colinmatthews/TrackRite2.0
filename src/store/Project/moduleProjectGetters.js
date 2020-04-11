export default{
  getProjects:(state) => {
    
    let publicContent = state.publicProjectContents
    let privateContent = state.privateProjectContents
   
    privateContent.forEach(project => {
      if(!project in publicContent){
        publicContent.push(project)
      }
    })

    return publicContent
  },
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
  getProjectsForNavbarSearch:(state,getters) => { 
   
      let projects = getters.getProjects
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