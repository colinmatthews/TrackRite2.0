import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

import moduleUser from './User/modelUser.js';
import moduleAuth from './auth/moduleAuth.js'
import moduleProject from './Project/moduleProject.js'
import moduleTasks from './Tasks/moduleTasks.js'
import moduleTeams from './Teams/moduleTeams.js'

export default new Vuex.Store({
    mutations,
    state,
    actions,
    modules: {
        user: moduleUser,
        auth:moduleAuth,
        project:moduleProject,
        tasks:moduleTasks,
        teams:moduleTeams
    },
    strict: process.env.NODE_ENV !== 'production'
})