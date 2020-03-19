<template>
  <div id="projects-page">

    <span id="title">Projects</span>

    <div id="projects-display">
      <vs-row id="r2">
        <vs-col
          id="u1"
          type="flex"
          vs-justify="center"
          vs-align="center"
          :vs-order="-1"
          vs-w="3"
          v-for="(project,index) in getProjects"
          :key="index"
          style="position: relative!important; z-index: -10!important;"
        >
          <vs-card fixedHeight id="card-project">
            <div id="favorite-icon" :style="checkFavorite(project)">
              <vs-button @click="setFavorite(project)"  icon="star" color="warning" v-if="checkFavorite(project)"></vs-button> 
               <vs-button @click="setFavorite(project)"  icon="star" type="border" v-else></vs-button> 
            </div>
            <div id="delete-icon" @click="deleteConfirm(project.key.id)">
              <i class="material-icons">clear</i>
            </div>
            <div class="image">
              <img
                id="image-preview"
                v-on:click="popupDetails = project; popupActive = true"
                src="@/assets/images/sample.png"
              />
            </div>

            <h2 id="card-title">{{ project.title}}</h2>
            <small id="card-description">Lorem ipsum dolor sit amet.</small>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>


    <vs-popup title="Project details" v-if="popupDetails" :active.sync="popupActive">
      <template lang="html">
        <vs-tabs>
          <vs-tab label="Details" icon-pack="feather" icon="icon-home">
            <h5 class="my-3">{{ popupDetails.title }}</h5>
          </vs-tab>

          <vs-tab label="Access" icon-pack="feather" icon="icon-box"></vs-tab>

          <vs-tab label="History" icon-pack="feather" icon="icon-mail"></vs-tab>

          <vs-tab label="Marketplace" icon-pack="feather" icon="icon-briefcase">
            <h5>Publish to Marketplace</h5>
            
          </vs-tab>
        </vs-tabs>
      </template>
    </vs-popup>
    
    <transition name="fade" >
    <div id="icon-controls" @click="$router.push('/projects/new')" v-if="showControls">
      <vx-tooltip text="Add new project" position="left">
        <i class="material-icons add-new-project">add</i>
      </vx-tooltip>
    </div>
    </transition>

  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import {mapActions,mapState, mapGetters} from 'vuex'
export default {
  data: () => ({
    deleteID:null,
    popupActive: false,
    popupDetails: null,
    showControls:false
  }),
  computed:{
    ...mapState('project', {
      allProjects: state => state.allProjects,
      contentLoaded: state => state.contentLoaded
    }),

    ...mapState('auth', {
      favoriteProjects: state => state.favoriteProjects,
      activeUsers: state => state.activeUsers
    }),

    ...mapGetters('project',[
      'getProjects'
    ]),

  },
  beforeDestroy(){
    this.showControls = false
  },
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
          console.log(key)
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
      .then(() => {
        this.setContentLoaded()
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

    deleteConfirm(id){
      this.deleteID = id
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to delete this project? This action cannot be reversed.',
        accept:this.deleteAlert
      })
    },

    deleteAlert(){
      //this.removeProject(this.deleteID)
      this.$vs.notify({
        color:'danger',
        title:'Deleted',
        text:'The project was successfully deleted'
      })
    },
    removeProject() {
      // DELETE REQUEST GOES HERE
      // this.$http.delete('/p/' + id).then(x => {
      //   console.log(x.data);

      // })
      // .catch(e => {
      //   console.log(e);
      //   return;
      // });

      this.projects.splice(
        this.projects.map(x => x.id).indexOf(this.removalProject.id),
        1
      );
    },
    checkFavorite(project){
      let favorite = false;
      this.favoriteProjects.forEach(el => {
        if(el.key.id == project.key.id){
          favorite = true
        }
      })
      return favorite
      
    },
    setFavorite(project){
      let found = false;
      if(this.favoriteProjects == null){
        this.pushFavoriteProject(project)
        return;
      }
      else{
        this.favoriteProjects.forEach(el => {
          if(el.key.id == project.key.id){
            found = true
          }
        })
        
        if(found){
          this.spliceFavoriteProject(project)
        }
        else{
          if(this.favoriteProjects.length == 4){
            this.$vs.notify({
            color:'warning',
            title:'Maximum Favorites',
            text:'You can only set a maximum of four favorites.'
            })
          }
          else{
            this.pushFavoriteProject(project)
          }
        }
      }
     
    }

  
  }
};
</script>

<style scoped>
#card-project {
  z-index: -1;
}

#switch {
  margin-top: 50px;
  margin-bottom: 50px;
}

#switch > * {
  margin-top: 20px;
}

#u1 {
  margin-top: 10px;
  margin-bottom: 10px;
}

#r {
  text-align: center;
}

#r2 {
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;
  z-index: -1;
}

#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #707070;
}

#projects {
  margin-top: 30px;
}

#image-preview {
  width: 50%;
  height: 30%;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

#card-title {
  font-size: 14px!Important;
}

#projects-display {
  text-align: center;
  position: relative;
  z-index: 999;
}

#icon-controls {
  position: absolute;
  right: 20px;
  user-select: none;
  bottom: 20px;
  z-index: 100;
} 
.wizard-header {
  padding: 0px!Important;
}
#add {
  font-size: 20px;
  font-family: "Segoe UI", sans-serif;
  vertical-align: middle;
  margin: 10px;
}

#content {
  margin: 20px;
}

.add-new-project {
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(121, 9, 111, 1) 100%,
    rgba(0, 212, 255, 1) 100%
  );
  user-select: none;
  border-radius: 100%;
  color: white;
  padding: 8px;
  margin: 4px;
  font-size: 24px;
  font-weight: bold;
}

.add-new-project:hover {
  cursor: pointer;
}

#delete-icon {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 100;
  cursor: pointer;
}

#favorite-icon {
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 100;
  cursor: pointer;
}

.submit-button {
  position: absolute;
  width: 200px;
  bottom: 0px;
}

#delete-icon > i {
  font-size: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>