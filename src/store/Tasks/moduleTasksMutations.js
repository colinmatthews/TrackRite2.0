export default{
  SET_CURRENT_PARENT:(state,value) => state.parents = value,
  SET_CURRENT_CHILDREN:(state,value) => state.children = value,
  SET_CURRENT_TASK:(state,value) => state.currentTask = value,
  SET_CURRENT_PATH:(state,value) => state.currentPath = value,
  SET_ALL_TASKS:(state,value) => state.allTasks = value,
  SET_FETCHED_TASK:(state,value) => state.fetchedTask = value,
  SET_CURRENT_PROJECT:(state,value) => state.currentProject = value,
  APPEND_BREADCRUMB_TITLES:(state,value) => state.breadcrumbTitles.push(value),
  POP_BREADCRUMB_TITLES:(state) => state.breadcrumbTitles.pop()
}