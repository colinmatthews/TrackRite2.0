const userModule = {
  actions: {
    fetchUserInfo({ commit }, user) {
      return new Promise((resolve, reject) => {
        this.$http.get('/profile').then(res => {
          commit('UPDATE_FAVORITE_PROJECTS', res.data.favoriteProjects);
          commit('UPDATE_FAVORITE_PAGES', res.data.favoritePages);
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
      });
    },
    addFavoriteProject({ commit, state }, project) {
      let projects = state.favoriteProjects;
      projects.push(project);
      commit('UPDATE_FAVORITE_PROJECTS', projects);
    },
    addFavoritePage({ commit, state }, page) {
      let pages = state.favoritePages;
      pages.push(page);
      commit('UPDATE_FAVORITE_PAGES', pages);
    }
  },
  mutations: {
    UPDATE_FAVORITE_PROJECTS: (state, value) => state.favorites.projects = value,
    UPDATE_FAVORITE_PAGES: (state, value) => state.favorites.pages = value,
  },
  state: {
    name: 'Test user',
    favorites: {
      projects: [],
      pages: [],
    },

  }
}

export default userModule;