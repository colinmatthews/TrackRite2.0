import vue from 'vue'
export default{
  async initializeAllTasks({commit,state,rootState}){
    let key = state.currentProject.key
    await dispatch('auth/setToken',{root:true})
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/all/"
    await this.$http.get(url ,{headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_ALL_CHILDREN',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async getTaskChildren({commit,state,rootState,dispatch}){
    let key = state.currentTask.key
    await dispatch('auth/setToken',{root:true})
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/children/"
    await this.$http.post(url, key, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_CURRENT_CHILDREN',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async getProjectChildren({commit,state,rootState,dispatch}){
    await dispatch('auth/setToken',{root:true})
    let key = state.currentProject.key
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/projects/children" 
    await this.$http.post(url, key, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_CURRENT_CHILDREN',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async setCurrentTaskByKey({commit,dispatch,rootState},key){
    await dispatch('auth/setToken',{root:true})
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/key" 
    await this.$http.post(url, key, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_CURRENT_TASK',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async getPreviousTask({dispatch, state, commit}){
    commit('SET_SIDEBAR_ACTIVE',false)
    commit('SET_SIDEBAR_EDITING',false)
    
    await dispatch('auth/setToken',{root:true})
    if(state.breadcrumbTitles.length != 1 ){
      let parent = state.currentTask.key.parent
    
      commit('SET_CURRENT_TASK_KEY',parent)
      await dispatch('setCurrentTaskByKey',state.currentTask.key)
      await dispatch("getTaskChildren")
      
      
    }
    else{
      commit('SET_CURRENT_TASK',{})
      dispatch("getProjectChildren")
    }
   
  },
  async archiveMultiSelected({state,commit,rootState,dispatch}){
    let tasks = JSON.parse ( JSON.stringify (state.currentMultiSelected))
    if(tasks.length > 0){

      tasks.forEach(el => {
        el.archive = true
      })

      let token = rootState.auth.firebaseToken
      let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/batch"

      await this.$http.put(url, tasks, {headers: {"Authorization" : "Bearer " + token}})
      if(Object.keys(state.currentTask).length !== 0){  // if currentTask is empty (at root of project)
        console.log('here')
        dispatch('getTaskChildren')
        commit('SET_CURRENT_MULTISELECTED',[])

      }
      else{
        dispatch('getProjectChildren')
        commit('SET_CURRENT_MULTISELECTED',[])
      }
        
    } 
    

  },
  async updateCurrentSelected({state,commit,rootState,dispatch}){
    await dispatch('auth/setToken',{root:true})
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
    await dispatch('auth/setToken',{root:true})
    // initalize request parameters and current state
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/"
    let key = state.currentTask.key
    let previousChildren = state.children

    let previousChildrenIds = []
    previousChildren.forEach(el => {
      previousChildrenIds.push(el.key.id)
    })
    
    // checks if current children below to project or task
    let validCurrentTask = true
    if(typeof key == 'undefined'){
      key = state.currentProject.key
      validCurrentTask = false
    }

    // If request parameters include all expected keys
    if(task.hasOwnProperty('end_date') && task.hasOwnProperty('start_date') && task.hasOwnProperty('title') && task.hasOwnProperty('users') 
          && task.hasOwnProperty('status') && task.hasOwnProperty("custom_columns") && task.hasOwnProperty('status') && task.hasOwnProperty("details")
          && task.hasOwnProperty("owner") && task.hasOwnProperty('archive'))
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
          //Adding new task to the root of the project
          dispatch("getProjectChildren").then(() => {
            
            // Tasks are not able to be ordered so that the new task is always at the end / beginning
            // So, we need to find the new task in order to be able to open it for editing
            let newTask = {}
            let newTaskId = null
            let newChildren = state.children
            let newChildrenIds = []
            newChildren.forEach(el => {
              newChildrenIds.push(el.key.id)
            })
            
            // If there was already a task, loop through each of the new task ids and check if they were in the old task ids. 
            // When one is found that's not, capture the ID
            if(previousChildrenIds.length > 0){
              newChildrenIds.forEach(el => {
                console.log(previousChildrenIds.indexOf(el))
                if(previousChildrenIds.indexOf(el) == -1){
                  newTaskId = el
                  console.log(newTaskId)
                }
              })

              // Get the task that is associted to newTaskId
              newChildren.forEach(el => {
                if(el.key.id == newTaskId){
                  newTask = el
                }
              })
            }
            //No previous tasks. Select the new task
            else{
              newTask = newChildren[0]
            }

            dispatch('setCurrentSelected',newTask)
            dispatch('setSidebarActive',true)
            dispatch('setSidebarEditing',true)
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

  async getArchivedTasks({commit,state,rootState,dispatch}){
    await dispatch('auth/setToken',{root:true})
    let key = state.currentProject.key
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/archived" 
    await this.$http.post(url, key, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_ARCHIVED_TASKS',res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },

  async deleteTasks({commit},obj){
    console.log("deleted")
  },

  async restoreTasks({commit,state,dispatch,rootState},obj){
    console.log("Selected restore")
    console.log(obj)
    
    let tasks = JSON.parse ( JSON.stringify (obj)) // Create a copy of the object that is passed in. Object needs to be modifed and vuex wont allow it
                                                   // but we also don't want to modify local state if the server doesnt respond
    if(tasks.length > 0){

      tasks.forEach(el => {
        el.archive = false
      })

      let token = rootState.auth.firebaseToken
      let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/batch"

      await this.$http.put(url, tasks, {headers: {"Authorization" : "Bearer " + token}})
      if(Object.keys(state.currentTask).length !== 0){  // if currentTask is empty (at root of project)
        console.log('here')
        dispatch('getTaskChildren')

      }
      else{
        dispatch('getProjectChildren')
      }
        
    }
  },
  async deleteTasks({commit,state,dispatch,rootState},obj){
    console.log("Selected delete")
    console.log(obj)
    if(obj.length > 0){

      let token = rootState.auth.firebaseToken
      let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/batch"

      await this.$http.delete(url,{headers: {"Authorization" : "Bearer " + token},data:{tasks:obj}})
      .catch(err => {
        console.log(err)
      })
       
    }
  },

  async setCurrentTaskByURLSafeKey({commit,state,dispatch,rootState},tid){
    await dispatch('auth/setToken',{root:true})
    if(tid != null ){
      let token = rootState.auth.firebaseToken
      let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/urlSafeKey"
      
      await this.$http.post(url, {tid}, {headers: {"Authorization" : "Bearer " + token}}).then(async res => {
        console.log(res)
        commit('SET_CURRENT_TASK',res.data)
      })
      .then(() => {
        dispatch('getTaskChildren')
      })
      .catch(err => {
        vue.$vs.notify({
          title: 'Error',
          text: 'Something went wrong! You most likely navigated to an incorrect task link.',
          color: 'danger',
          iconPack: 'feather',
          icon: 'icon-alert-circle'
       })
      })
    }

  },
  async getCurrentTaskBreadcrumbTitles({commit,state,dispatch,rootState}){
    let key = state.currentTask.key
    await dispatch('auth/setToken',{root:true})
    let token = rootState.auth.firebaseToken
    let url = process.env.VUE_APP_FUNCTIONS_URL + "/tasks/breadcrumbsByKey/"
    await this.$http.post(url, key, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
      commit('SET_BREADCRUMB_TITLES',res.data)
    })
    .catch(err => {
      console.log(err)
    })
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

  async setBreadcrumbTitles({commit},obj){
    commit('SET_BREADCRUMB_TITLES',obj)
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
  async removeNFromBreadcrumb({commit},N){
    commit('REMOVE_N_BREADCRUMB_TITLES',N)
  },


}