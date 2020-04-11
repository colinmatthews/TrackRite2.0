<template>
 <div >
  <a href="#" style="position:relative; z-index:0;"> Test </a>
 </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import {mapActions,mapState, mapGetters} from 'vuex'
export default {
  created() {
    if(!this.contentLoaded){
      let user = firebase.auth().currentUser;
      this.setToken(user)
      .then(async () => {
          await this.initializePublicProjectKeys()
          await this.initializePrivateProjectKeys()
          await this.initializePublicProjectContents()
          await this.initializePrivateProjectContents()
          await this.getFavoriteProjects()
      })
      .then(async () => {
        let key = this.getProjects
        if(typeof(key) !== 'undefined'){
          await this.setCurrentProject(key[0])
          await this.getProjectChildren()
        }
        setTimeout(() => {
          this.showControls = true
        },100)
        
      })
      .then(async() =>{
        await this.getActiveUsers()
        .then(() => {
          let newUser = true
        
          this.activeUsers.forEach(el => {
          
            if(el.uid == user.uid){
              
              newUser = false
            }
          })
          /*
          if(newUser){
            this.postUser()
          }
          */
        })   
      })
      .then(async () => {
        await this.setContentLoaded()
      })
    }
  },
  methods: {
    ...mapActions('project',[
      'initializePublicProjectKeys', 
      'initializePublicProjectContents',
      'initializePrivateProjectKeys',
      'initializePrivateProjectContents',
      'setContentLoaded'
    ]),

    ...mapActions('auth',[
      'setToken',
      'getActiveUsers',
      'postUser',
      'setToken',
      'pushFavoriteProject',
      'spliceFavoriteProject',
      'getFavoriteProjects'
    ]),

    ...mapActions('tasks',[
      'setCurrentProject',
      'getProjectChildren',
      'setCurrentTask',
    ]),
  },
  computed:{
    ...mapGetters('project',[
      'getProjects',
      
    ]),
    ...mapState('auth', {
      activeUsers: state => state.activeUsers
    }),

    ...mapState('project', {
      contentLoaded: state => state.contentLoaded
    }),

  },

}
</script>

<style>

</style>