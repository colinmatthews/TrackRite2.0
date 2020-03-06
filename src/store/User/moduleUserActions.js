import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'
import Vue from 'vue'

export default {
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
    removeItemFromCart({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        let cartItems = [...state.cartItems];
        cartItems.splice(cartItems.map(x => x.id).indexOf(id),1);
        commit('UPDATE_CART', cartItems);
        resolve(cartItems);
      })
    },
    addItemToCart({ commit, state }, item) {
      return new Promise((resolve, reject) => {
        let cartItems = [...state.cartItems];
        cartItems.unshift(item);
        commit('UPDATE_CART', cartItems);
        resolve(cartItems);
      })
    }
}