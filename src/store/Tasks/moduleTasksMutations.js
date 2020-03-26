import Vue from 'vue'
export default{
  SET_CURRENT_PARENT:(state,value) => state.parents = value,
  SET_CURRENT_CHILDREN:(state,value) => state.children = value,
  SET_CURRENT_TASK:(state,value) => state.currentTask = value,
  SET_CURRENT_TASK_KEY:(state,value) => state.currentTask.key = value,
  SET_ALL_TASKS:(state,value) => state.allTasks = value,
  SET_CURRENT_PROJECT:(state,value) => state.currentProject = value,
  APPEND_BREADCRUMB_TITLES:(state,value) => state.breadcrumbTitles.push(value),
  POP_BREADCRUMB_TITLES:(state) => state.breadcrumbTitles.pop(),
  SET_BREADCRUMB_TITLES:(state,item) => state.breadcrumbTitles = item,
  REMOVE_N_BREADCRUMB_TITLES:(state,item) => {
    for(let i = 0; i<= item; i++){
      state.breadcrumbTitles.pop()
    }
  },
  SET_CURRENT_SELECTED:(state,value) => state.currentSelected = value,
  SET_SIDEBAR_ACTIVE:(state,value) => state.sidebarActive = value,
  SET_SIDEBAR_EDITING:(state,value) => state.sidebarEditing = value,
  SET_ARCHIVED_TASKS:(state,value) => state.archivedTasks = value,

  //Mutators for task editing
  SET_TITLE:(state,value) => state.currentSelected.title = value,
  SET_START_DATE:(state,value) => state.currentSelected.start_date = value,
  SET_END_DATE:(state,value) => state.currentSelected.end_date = value,
  SET_STATUS:(state,value) => state.currentSelected.status = value,
  SET_OWNER:(state,value) => Vue.set(state.currentSelected,'owner',value),
  SET_DETAILS:(state,value) => state.currentSelected.details = value,
  SET_CUSTOM_COLUMNS:(state,value) => state.currentSelected.custom_columns = value,
  SET_ARCHIVE:(state,value) => state.currentSelected.archive = value,

  

}