/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import jwt from "../../http/requests/auth/jwt/index.js"


import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'
import Vue from 'vue'

export default {
    loginAttempt({ dispatch }, payload) {

        // New payload for login action
        const newPayload = {
            userDetails: payload.userDetails,
            notify: payload.notify,
            closeAnimation: payload.closeAnimation
        }

        // If remember_me is enabled change firebase Persistence
        if (!payload.checkbox_remember_me) {

            // Change firebase Persistence
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

                // If success try to login
                .then(function() {
                    dispatch('login', newPayload)
                })

                // If error notify
                .catch(function(err) {

                    // Close animation if passed as payload
                    if(payload.closeAnimation) payload.closeAnimation()

                    payload.notify({
                        time: 2500,
                        title: 'Error',
                        text: err.message,
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger'
                    })
                })
        } else {
            // Try to login
            dispatch('login', newPayload)
        }
    },
    login({ commit, state, dispatch }, payload) {
        console.log(payload)
        // Try to sigin
        firebase.auth().signInWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)

            .then((result) => {

                // Set FLAG username update required for updating username
                let isUsernameUpdateRequired = false
                let user = firebase.auth().currentUser;
               

                // if username is provided and updateUsername FLAG is true
                // set local username update FLAG to true
                // try to update username

                // Only happens at registration
                if(payload.updateUsername) {

                    isUsernameUpdateRequired = true
                    
                    dispatch('updateUsername', {
                      user: result.user,
                      username: payload.userDetails.displayName,
                      notify: payload.notify,
                      isReloadRequired: true
                    })

                    // Send user registration email
                    //user.sendEmailVerification();
                }

                // Close animation if passed as payload
                if(payload.closeAnimation) payload.closeAnimation()


                // if username update is not required
                  // just reload the page to get fresh data
                  // set new user data in localstorage
                if(!isUsernameUpdateRequired) {
                  router.push(router.currentRoute.query.to || '/')
                  console.log(payload.userDetails.displayName)
                  //commit('UPDATE_USER_INFO', {'displayName':payload.userDetails.displayName}, {root: true})
                }
            }, (err) => {

                // Close animation if passed as payload
                if(payload.closeAnimation) payload.closeAnimation()

                payload.notify({
                    time: 2500,
                    title: 'Error',
                    text: err.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                })
            })
    },

    // Google Login
    loginWithGoogle({commit, state}, payload) {
        if (state.isUserLoggedIn()) {
            payload.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            })
            return false
        }
        const provider = new firebase.auth.GoogleAuthProvider()
        
        firebase.auth().signInWithPopup(provider)
          .then((result) => {
              router.push(router.currentRoute.query.to || '/')
              commit('UPDATE_USER_INFO', result.user.providerData[0], {root: true})
          }).catch((err) => {
              payload.notify({
                  time: 2500,
                  title: 'Error',
                  text: err.message,
                  iconPack: 'feather',
                  icon: 'icon-alert-circle',
                  color: 'danger'
              })
          })
    },

    // Facebook Login
    loginWithFacebook({commit, state}, payload) {
        if (state.isUserLoggedIn()) {
            payload.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            })
            return false
        }
        const provider = new firebase.auth.FacebookAuthProvider()

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                router.push(router.currentRoute.query.to || '/')
                commit('UPDATE_USER_INFO', result.user.providerData[0], {root: true})
            }).catch((err) => {
                payload.notify({
                    time: 2500,
                    title: 'Error',
                    text: err.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                })
            })
    },

    // Twitter Login
    loginWithTwitter({commit, state}, payload) {
        if (state.isUserLoggedIn()) {
            payload.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            })
            return false
        }
        const provider = new firebase.auth.TwitterAuthProvider()

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                router.push(router.currentRoute.query.to || '/')
                commit('UPDATE_USER_INFO', result.user.providerData[0], {root: true})
            }).catch((err) => {
                payload.notify({
                    time: 2500,
                    title: 'Error',
                    text: err.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                })
            })
    },

    // Github Login
    loginWithGithub({commit, state}, payload) {
        if (state.isUserLoggedIn()) {
            payload.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            })
            return false
        }
        const provider = new firebase.auth.GithubAuthProvider()

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                router.push(router.currentRoute.query.to || '/')
                commit('UPDATE_USER_INFO', result.user.providerData[0], {root: true})
            }).catch((err) => {
                payload.notify({
                    time: 2500,
                    title: 'Error',
                    text: err.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                })
            })
    },
    // Github Login
    loginWithMicrosoft({commit, state, dispatch}, payload) {
        if (state.isUserLoggedIn()) {
            payload.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            });
            return false
        }
        const provider = new firebase.auth.OAuthProvider('microsoft.com');

        firebase.auth().signInWithPopup(provider)
            .then(async (result) => {
                let token = result.credential.accessToken
                let url = "https://graph.microsoft.com/v1.0/me"
                await this.$http.get(url ,{headers: {"Authorization" : "Bearer " + token}}).then(res => {
                    dispatch('updateUsername', {
                        user: result.user,
                        username: res.data.displayName,
                        notify: payload.notify,
                        isReloadRequired: true
                      })
                    router.push(router.currentRoute.query.to || '/');
                    commit('UPDATE_AUTHENTICATED_USER', res)
                })
            }).catch((err) => {
                payload.notify({
                    time: 2500,
                    title: 'Error',
                    text: err.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                });
            })
    },
    registerUser({dispatch}, payload) {
          // create user using firebase
        firebase.auth().createUserWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)
            .then(() => {
                payload.notify({
                    title: 'Account Created',
                    text: 'You are successfully registered!',
                    iconPack: 'feather',
                    icon: 'icon-check',
                    color: 'success'
                })
                
                const newPayload = {
                    userDetails: payload.userDetails,
                    notify: payload.notify,
                    updateUsername: true,
                    displayName:payload.userDetails.displayName
                }
                dispatch('login', newPayload)
            }, (error) => {
                payload.notify({
                    title: 'Error',
                    text: error.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                })
            })
    },

    updateUsername({ commit }, payload) {
        payload.user.updateProfile({
            displayName: payload.username
        }).then(() => {

            // If username update is success
              // update in localstorage
            let newUserData = Object.assign({}, payload.user.providerData[0])
            newUserData.displayName = payload.username
            commit('UPDATE_USER_INFO', newUserData, {root: true})

            // If reload is required to get fresh data after update
              // Reload current page
            if(payload.isReloadRequired) {
                router.push(router.currentRoute.query.to || '/')
            }
        }).catch((err) => {
              payload.notify({
                time: 8800,
                title: 'Error',
                text: err.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
            })
        })
    },

    

    // JWT
    loginJWT({ commit }, payload) {

      return new Promise((resolve,reject) => {
        jwt.login(payload.userDetails.email, payload.userDetails.password)
          .then(response => {

            // If there's user data in response
            if(response.data.userData) {
              // Navigate User to homepage
              router.push(router.currentRoute.query.to || '/')

              // Set accessToken
              localStorage.setItem("accessToken", response.data.accessToken)

              // Update user details
              commit('UPDATE_USER_INFO', response.data.userData, {root: true})

              // Set bearer token in axios
              commit("SET_BEARER", response.data.accessToken)

              resolve(response)
            }else {
              reject({message: "Wrong Email or Password"})
            }

          })
          .catch(error => { reject(error) })
      })
    },
    registerUserJWT({ commit }, payload) {

      const { displayName, email, password, confirmPassword } = payload.userDetails

      return new Promise((resolve,reject) => {

        // Check confirm password
        if(password !== confirmPassword) {
          reject({message: "Password doesn't match. Please try again."})
        }

        jwt.registerUser(displayName, email, password)
          .then(response => {
            // Redirect User
            router.push(router.currentRoute.query.to || '/')

            // Update data in localStorage
            localStorage.setItem("accessToken", response.data.accessToken)
            commit('UPDATE_USER_INFO', response.data.userData, {root: true})

            resolve(response)
          })
          .catch(error => { reject(error) })
      })
    },
    fetchAccessToken() {
      return new Promise((resolve) => {
        jwt.refreshToken().then(response => { resolve(response) })
      })
    },

    async setToken({commit},user){
        if (user != null){
            await user.getIdToken(true /* Forces refresh */).then(token => {
                commit('SET_TOKEN', token)
            })
        }
    },

    async postUser({commit,state,dispatch}){
        await dispatch('setToken')
        let user = firebase.auth().currentUser;
        let token = state.firebaseToken
        let url = process.env.VUE_APP_FUNCTIONS_URL + "/users/"
        let data = {
            uid:user.uid,
            displayName:user.displayName,
            favoriteProjects:null
        }
        await this.$http.post(url,data ,{headers: {"Authorization" : "Bearer " + token}}).then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    },

    async getActiveUsers({commit,state,dispatch}){
        await dispatch('setToken')
        let token = state.firebaseToken
        let url = process.env.VUE_APP_FUNCTIONS_URL + "/users/"
        await this.$http.get(url, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
            commit('SET_ACTIVE_USERS',res.data)
        })
        .catch(err => {
            console.log(err)
        }) 
    },

    async getFavoriteProjects({commit,state,dispatch}){
        await dispatch('setToken')
        let token = state.firebaseToken
        let url = process.env.VUE_APP_FUNCTIONS_URL + "/users/uid"
        await this.$http.get(url, {headers: {"Authorization" : "Bearer " + token}}).then(res => {
            if(res.data !== null){
                if(res.data[0].favoriteProjects != null){
                    //console.log(res.data[0])
                    commit('SET_FAVORITE_PROJECTS',res.data[0].favoriteProjects)
                }         
            }        
        })
        .catch(err => {
            console.log(err)
        }) 

    },

    async updateUser({commit,state,getters,dispatch}){
        await dispatch('setToken')
        let user = firebase.auth().currentUser;
        let url = process.env.VUE_APP_FUNCTIONS_URL + "/users"
        let token = state.firebaseToken
        let data = {
            displayName:user.displayName,
            favoriteProjects:state.favoriteProjects
        }
        
        let key = getters.currentUserKey
        let entity = {
            data:data,
            key:key
        }

        await this.$http.put(url,entity ,{headers: {"Authorization" : "Bearer " + token}}).then(res => {
            //console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    
    },
    async commitPushFavoriteProject({commit},obj){
        commit('PUSH_FAVORITE_PROJECTS',obj)
    },
    async commitSpliceFavoriteProject({commit},obj){
        commit('SPLICE_FAVORITE_PROJECTS',obj)
    },
    async pushFavoriteProject({dispatch},obj){
        await dispatch('commitPushFavoriteProject',obj)
        await dispatch('updateUser')
    
    },
    async spliceFavoriteProject({dispatch,state},obj){
        await dispatch('commitSpliceFavoriteProject',obj)
        await dispatch('updateUser')
    },


}
