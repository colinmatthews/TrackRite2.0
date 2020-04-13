const actions = {
    updateSidebarWidth({ commit }, width) {
      commit('UPDATE_SIDEBAR_WIDTH', width);
    },
    toggleContentOverlay({ commit }) {
      commit('TOGGLE_CONTENT_OVERLAY');
    },
    updateTheme({ commit }, val) {
      commit('UPDATE_THEME', val);
    },
    updateUserRole({ commit }, val) {
      commit('UPDATE_USER_ROLE', val);
    },
    updateWindowWidth({ commit }, width) {
      commit('UPDATE_WINDOW_WIDTH', width);
    },

    updateStarredPage({ commit }, payload) {
      commit('UPDATE_STARRED_PAGE', payload)
    },

    arrangeStarredPagesLimited({ commit }, list) {
      commit('ARRANGE_STARRED_PAGES_LIMITED', list)
    },
    arrangeStarredPagesMore({ commit }, list) {
      commit('ARRANGE_STARRED_PAGES_MORE', list)
    },
    updateUserInfo({ commit }, payload) {
      commit('UPDATE_USER_INFO', payload)
    }
}

export default actions
