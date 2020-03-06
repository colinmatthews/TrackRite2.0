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
  }
  
}