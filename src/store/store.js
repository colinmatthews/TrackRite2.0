import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

import moduleUser from './User/modelUser.js';

export default new Vuex.Store({
    mutations,
    state,
    actions,
    modules: {
        user: moduleUser,
    },
    strict: process.env.NODE_ENV !== 'production'
})