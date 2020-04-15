export default{
  //Initializing projects
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
  SET_CONTENT_LOADED(state){ 
    state.contentLoaded = true
  },

  // Editing projects
  SET_SELECTED_PROJECT(state,obj){
    state.selectedProject = obj
  },
  SET_SELECTED_PROJECT_TITLE(state,obj){
    state.selectedProject.title = obj
  },
  SET_SELECTED_PROJECT_START_DATE(state,obj){
    state.selectedProject.start_date = obj
  },
  SET_SELECTED_PROJECT_DESCRIPTION(state,obj){
    state.selectedProject.description = obj
  },
  SET_SELECTED_PROJECT_THUMBNAIL(state,string){
    state.selectedProject.thumbnail = string
  },
  SET_SELECTED_PROJECT_STARTDATE(state,date){
    state.selectedProject.start_date = date
  },
  SET_SELECTED_PROJECT_ENDDATE(state,date){
    state.selectedProject.end_date = date
  },
  SET_SELECTED_PROJECT_PRIVACY(state,bool){
    state.selectedProject.privacy = bool
  },
  SET_SELECTED_PROJECT_OWNER(state,obj){
    state.selectedProject.owner = obj
  },
  APPEND_SELECTED_PROJECT_OWNER(state,obj){
    state.selectedProject.owner.push(obj)
  },
  POP_SELECTED_PROJECT_OWNER(state){
    state.selectedProject.owner.pop()
  },
  APPEND_SELECTED_PROJECT_USER(state,obj){
    state.selectedProject.users.push(obj)
  },
  POP_SELECTED_PROJECT_USERS(state){
    state.selectedProject.users.pop()
  }
  
}