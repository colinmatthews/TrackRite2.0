import state from './moduleTasksState.js'
import mutations from './moduleTasksMutations.js'
import actions from './moduleTasksActions.js'
import getters from './moduleTasksGetters.js'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
