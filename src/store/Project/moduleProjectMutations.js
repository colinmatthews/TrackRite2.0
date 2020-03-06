export default{
  SET_PRIVATE_KEYS(state,array){
    state.privateProjectKeys = array
  },
  SET_PRIVATE_CONTENTS(state,array){
    state.privateProjectContents = array
  },
  SET_PUBLIC_KEYS(state,array){
    state.publicProjectKeys = array
  },
  SET_PUBLIC_CONTENTS(state,array){
    state.publicProjectContents = array
  },
  SET_ALL_PROJECTS(state,array){
    state.allProjects = array
  },
  SET_PROJECTS_LOADED(state){ 
    state.projectsLoaded = true
  }
  
}