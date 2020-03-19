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

  async getPreviousTask({dispatch, state, commit}){
    if(state.currentTask.key.path.length > 4){
      let parent = state.currentTask.key.parent
      console.log(parent)
      commit('SET_CURRENT_TASK_KEY',parent)
      dispatch("getTaskChildren")
    }
    else{
      dispatch("getProjectChildren")
    }
  },
  async updateCurrentSelected({state,commit,rootState}){
    let task = state.currentSelected
    console.log(task)
    console.log(task.key)
    if(task !== null && task !== 'undefined'){
      let token = rootState.auth.firebaseToken
      let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/"


      await this.$http.put(url, task, {headers: {"Authorization" : "Bearer " + token}}).then(async res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  async submitNewTask({state,commit,dispatch,rootState},task){
    // initalize request parameters and current state
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/"
    let key = state.currentTask.key
    let previousChildren = state.children
    
    // checks if current children below to project or task
    let validCurrentTask = true
    if(typeof key == 'undefined'){
      key = state.currentProject.key
      validCurrentTask = false
    }

    // If request parameters include all expected keys
    if(task.hasOwnProperty('end_date') && task.hasOwnProperty('start_date') && task.hasOwnProperty('title') && task.hasOwnProperty('users') 
          && task.hasOwnProperty('status') && task.hasOwnProperty("custom_columns") && task.hasOwnProperty('status') && task.hasOwnProperty("details")
          && task.hasOwnProperty("owner"))
      {
      // POST data
      let data = {
        key:key,
        data:task
      }

      await this.$http.post(url, data, {headers: {"Authorization" : "Bearer " + token}}).then(async res => {
        // If current selection is task,
        if(validCurrentTask){
          await dispatch("getTaskChildren").then(() => {

            let newChildren = state.children
            let newTask = {}

            if(previousChildren.length > 0){
              newChildren.forEach(el => {
                if(!previousChildren.includes(el)){
                  newTask = el
                }
              })
            }
            else{
              newTask = newChildren[0]
            }

            dispatch('setCurrentSelected',newTask)
            dispatch('setSidebarActive',true)
            dispatch('setSidebarEditing',true)
          })
          
        }
        else{
          dispatch("getProjectChildren").then(() => {

            let newChildren = state.children
            let newTask = {}

            if(previousChildren.length > 0){
              newChildren.forEach(el => {
                if(!previousChildren.includes(el)){
                  newTask = el
                }
              })
            }
            else{
              newTask = newChildren[0]
            }

            dispatch('setCurrentSelected',newTask)
            dispatch('setSidebarActive',true)
          })
        }
        
      })
      .catch(err => {
        console.log(err)
      })
    }
    else{
      console.log("Error")
      console.log(task)
    } 

  },
  async setCurrentParent({commit}, obj){
    commit('SET_CURRENT_PARENT', obj)
  },

  async setCurrentProject({commit}, obj){
    commit('SET_CURRENT_PROJECT', obj)
  },

  async appendToBreadcrumbTitles({commit}, obj){
    commit('APPEND_BREADCRUMB_TITLES', obj)
  },

  async popBreadcrumbTitles({commit}){
    commit('POP_BREADCRUMB_TITLES')
  },

  async setCurrentTask({commit}, obj){
    commit('SET_CURRENT_TASK', obj)
  },

  async setCurrentSelected({commit}, obj){
    commit('SET_CURRENT_SELECTED', obj)
  },
  async setSidebarActive({commit},bool){
    commit('SET_SIDEBAR_ACTIVE',bool)
  },
  async setSidebarEditing({commit,dispatch},bool){
    commit('SET_SIDEBAR_EDITING',bool)
    if(bool === false){
      dispatch('updateCurrentSelected')
    }
  },


}