<template>
  <div class="projects-page">

    <span class="title">Projects</span>

    <div class="projects-display">
      <vs-row class="r2">
        <vs-col
          class="u1"
          type="flex"
          vs-justify="center"
          vs-align="center"
          :vs-order="-1"
          vs-w="4"
          v-for="(project,index) in getProjects"
          :key="index"
          style="position: relative!important; z-index: -10!important;"
        >
          <vs-card fixedHeight class="card-project">
            <div class="favorite-icon" :style="checkFavorite(project)">
              <vs-button @click="setFavorite(project)"  icon="star" color="warning" v-if="checkFavorite(project)"></vs-button> 
              <vs-button @click="setFavorite(project)"  icon="star" type="border" v-else></vs-button> 
            </div>
            <div class="delete-icon" @click="deleteConfirm(project.key.id)">
              <i class="material-icons">clear</i>
            </div>
            <div class="image">
              <img
                class="image-preview"
                @click="$router.push('/tasks/' + project.key.id)"
                src="@/assets/images/sample.png"
              />
            </div>

            <h2 class="card-title">{{ project.title}}</h2>
            <small>{{project.description}}</small>
            <div @click="handleProjectPopup(project)">
              <vs-icon icon-pack="feather" icon="icon-more-vertical" class="projectDetailsButton" > </vs-icon> 
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>


    <vs-popup title="Project Details" v-if="selectedProject" :active.sync="popupActive">
      <template lang="html">
        <vs-tabs>
          <vs-tab label="Details" icon-pack="feather" icon="icon-home">

            <label class="vs-select--label input-select-label-primary"><b>Title</b></label>
            <vs-textarea class="my-3" :value="selectedProject.title" @input="setProjectTitle" ></vs-textarea>

            <label class="vs-select--label input-select-label-primary"><b>Description</b></label>
            <vs-textarea class="my-3" :value="selectedProject.description" @input="setProjectDescription" ></vs-textarea>
           
            
              <vs-table :data="selectedProject.owners"> 
                 <template slot="header">
                  <label class="vs-select--label input-select-label-primary"><b>Owners</b></label>
                 </template>
                <template slot="thead" >
                <th class="ownerTableHeader">
                  Name
                </th>
                <th class="ownerTableHeader">
                  Actions
                </th>
              </template>

              <template slot-scope="{data}">
                <vs-tr v-for="tr in selectedProject.owners" :key ="tr" :data="tr" class="border_bottom">
                  <vs-td>
                    <span>{{getDisplayName(tr)}}</span>
                  </vs-td>
                  <vs-td>
                    <vs-button color="danger">Delete</vs-button>
                  </vs-td>
                </vs-tr>
                <tr>
                  <vs-td>
                    <vue-auto-suggest
                    placeholder="Search a coworker.."
                    :data="autocompleteData"
                    :filter-by-query="true">

                      <template v-slot:users="{ suggestion }">
                        <div class="flex items-end leading-none py-1">
                          <feather-icon :icon="suggestion.icon" svgClasses="h-5 w-5" class="mr-4" />
                          <span class="mt-1">{{ suggestion.displayName }}</span>
                        </div>
                      </template>
                   </vue-auto-suggest>
                  </vs-td>
                  <vs-td>
                    <vs-button color="success" style="margin-bottom:7px;">Add</vs-button>
                  </vs-td>
                </tr>
              </template>
               
              </vs-table>
            

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
    <div class="icon-controls" @click="$router.push('/projects/new')" v-if="showControls">
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
import VueAutoSuggest from '../../components/vx-auto-suggest/VxAutoSuggest.vue'
import 'vue-context/dist/css/vue-context.css';
export default {
  data: () => ({
    deleteID:null,
    popupActive: false,
    showControls:false
  }),
  components:{
    VueAutoSuggest
  },
  watch:{
    popupActive(){
      if(this.popupActive == false){
       this.updateProject()
      }
    }
  },
  computed:{
    ...mapState('project', {
      allProjects: state => state.allProjects,
      contentLoaded: state => state.contentLoaded,
      selectedProject: state => state.selectedProject
    }),

    ...mapState('auth', {
      favoriteProjects: state => state.favoriteProjects,
      activeUsers: state => state.activeUsers
     
    }),

    ...mapGetters('project',[
      'getProjects',
      'getDisplayName'
    ]),
     autocompleteData(){
      let users = this.activeUsers
      let data = {}
      data.users = {}
      data.users.key = 'displayName'
      data.users.data = []

      users.forEach(el => {
        data.users.data.push({
          displayName:el.displayName,
          uid:el.uid
        })
      })

      return data
    },
    

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
        setTimeout(() => {
          this.showControls = true
        },1000)
      })
    }
    else{
       this.showControls = true
    }
  },
  methods: {
    ...mapActions('project',[
      'initializePublicProjectKeys', 
      'initializePublicProjectContents',
      'initializePrivateProjectKeys',
      'initializePrivateProjectContents',
      'setContentLoaded',
      'updateProject'
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
    },
    handleProjectPopup(project){
      this.$store.commit('project/SET_SELECTED_PROJECT',project,{ root: true })
      this.popupActive = true;
    },
    setProjectTitle(e){
      this.$store.commit('project/SET_SELECTED_PROJECT_TITLE',e,{ root: true })
    },
    setProjectDescription(e){
      this.$store.commit('project/SET_SELECTED_PROJECT_DESCRIPTION',e,{ root: true })
    }

  
  }
};
</script>

<style scoped>
.card-project {
  z-index: -1;
}

#switch {
  margin-top: 50px;
  margin-bottom: 50px;
}

.switch > * {
  margin-top: 20px;
}

.u1 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.r {
  text-align: center;
}

.r2 {
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;
  z-index: -1;
}

.title {
  font-family: "Segoe UI", sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #707070;
}

.projects {
  margin-top: 30px;
}

.image-preview {
  width: 15vw;
  height: 30vh;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

.card-title {
  font-size: 14px!Important;
}

.projects-display {
  text-align: center;
  position: relative;
  z-index: 999;
}

.icon-controls {
  position: absolute;
  right: 20px;
  user-select: none;
  bottom: 20px;
  z-index: 100;
} 
.wizard-header {
  padding: 0px!Important;
}
.add {
  font-size: 20px;
  font-family: "Segoe UI", sans-serif;
  vertical-align: middle;
  margin: 10px;
}

.content {
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

.delete-icon {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 100;
  cursor: pointer;
}

.favorite-icon {
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

.delete-icon > i {
  font-size: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.projectDetailsButton{
  float:right;
  position: absolute;
  bottom: 10px;
  right: 5px;
  cursor: pointer;

}

.addOwnerButton{
  cursor: pointer;
  padding-left: 5px;

}

.ownerTableHeader{
  background-color: #ebebeb;
}

</style>