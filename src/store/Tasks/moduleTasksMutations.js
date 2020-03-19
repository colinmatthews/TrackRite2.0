export default{
  SET_CURRENT_PARENT:(state,value) => state.parents = value,
  SET_CURRENT_CHILDREN:(state,value) => state.children = value,
  SET_CURRENT_TASK:(state,value) => state.currentTask = value,
  SET_CURRENT_TASK_KEY:(state,value) => state.currentTask.key = value,
  SET_ALL_TASKS:(state,value) => state.allTasks = value,
  SET_CURRENT_PROJECT:(state,value) => state.currentProject = value,
  APPEND_BREADCRUMB_TITLES:(state,value) => state.breadcrumbTitles.push(value),
  POP_BREADCRUMB_TITLES:(state) => state.breadcrumbTitles.pop(),
  POP_CURRENT_PATH:(state,value) => state.currentTask.key.path.pop(),
  SET_CURRENT_SELECTED:(state,value) => state.currentSelected = value,
  SET_SIDEBAR_ACTIVE:(state,value) => state.sidebarActive = value,
  SET_SIDEBAR_EDITING:(state,value) => state.sidebarEditing = value,

  SET_TITLE:(state,value) => state.currentSelected.title = value,
  SET_START_DATE:(state,value) => state.currentSelected.start_date = value,
  SET_END_DATE:(state,value) => state.currentSelected.end_date = value,
  SET_STATUS:(state,value) => state.currentSelected.status = value,
  SET_OWNER:(state,value) => state.currentSelected.owner = value,
  SET_DETAILS:(state,value) => state.currentSelected.details = value,
  SET_CUSTOM_COLUMNS:(state,value) => state.currentSelected.custom_columns = value
}