import state from './moduleTeamsState.js'
import mutations from './moduleTeamsMutations.js'
import actions from './moduleTeamsActions.js'
import getters from './moduleTeamsGetters.js'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
