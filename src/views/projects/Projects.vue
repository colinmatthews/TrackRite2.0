<template>
  <div class="projects-page">
    <!-- Projects grid -->
    
      
         <span class="title">Projects</span>
     
      <span  class="filter-container" >
          <div class="absolute inline right-80">
            <vue-auto-suggest
              @selected="updateFilter"
              :placeholder="projectFilter.teams.title"
              :data="teamsAutocompleteData"
              :filter-by-query="true">

              <template v-slot:teams="{ suggestion }">
                <div class="flex items-end leading-none py-1">
                  <feather-icon :icon="suggestion.icon" svgClasses="h-5 w-5" class="mr-4" />
                  <span class="mt-1">{{ suggestion.title }}</span>
                </div>
              </template>
            </vue-auto-suggest>
          </div>
          <vs-button color="danger" type="filled" icon="close" @click="resetFilter()" style="float:right"></vs-button>
           
        
      </span>
   
    <div class="projects-display">
      <vs-row class="r2">
        <vs-col
          class="u1"
          type="flex"
          vs-justify="center"
          vs-align="center"
          :vs-order="-1"
          vs-w="4"
          v-for="(project,index) in filteredProjects"
          :key="index"
          style="position: relative!important; z-index: -10!important;"
        >
          <vs-card fixedHeight class="card-project">
            <div class="favorite-icon" :style="checkFavorite(project)">
              <vs-button @click="setFavorite(project)"  icon="star" color="warning" v-if="checkFavorite(project)"></vs-button> 
              <vs-button @click="setFavorite(project)"  icon="star" type="border" v-else></vs-button> 
            </div>
            <div class="delete-icon" @click="deleteConfirm(); deleteProject = project">
              <i class="material-icons">clear</i>
            </div>
            <div class="image">
              <img
                class="image-preview"
                @click="$router.push('/tasks/' + project.key.id)"
                :src="project.thumbnail"
              />
            </div>

            <h3 >{{ project.title}}</h3>
            <h5>{{project.description}}</h5>
            <vs-row>
              <vs-col vs-w="6">
                 <p class="projectTeam" @click="setFilter(project.team)">{{project.team.title}} </p>
              </vs-col>
              <vs-col vs-w="6">
                <div @click="handleProjectPopup(project)">
                <vs-icon icon-pack="feather" icon="icon-more-vertical" class="projectDetailsButton" > </vs-icon> 
              </div>
              </vs-col>
            </vs-row>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>

    <!-- End Projects Grid -->

    <!-- Project Details Popup -->
    <vs-popup title="Project Details" v-if="selectedProject" :active.sync="popupActive">
      <template lang="html">
        <vs-tabs>
          <!-- Details Tab -->
          <vs-tab label="Details" icon-pack="feather" icon="icon-home">

            <label class="vs-select--label input-select-label-primary"><b>Title</b></label>
            <vs-input class="my-3 w-full" :value="selectedProject.title" @input="setProjectTitle" ></vs-input>

            <label class="vs-select--label input-select-label-primary"><b>Description</b></label>
            <vs-input class="my-3 w-full" :value="selectedProject.description" @input="setProjectDescription" ></vs-input>

           <label class="vs-select--label input-select-label-primary"><b>Start Date</b></label>
            <vc-date-picker
              popover-visibility="click" 
              @input="setStartDate"
              :value="defaultDatepicker(selectedProject.start_date)" 
              :popover="{visibility: 'click' }"
              :input-props='{class:"vs-inputx vs-input--input normal hasValue",visibility:"hidden"}'>
            </vc-date-picker>
           
          <div class="spacer">
          <label class="vs-select--label input-select-label-primary"><b>End Date</b></label>
            <vc-date-picker
              popover-visibility="click" 
              @input="setEndDate"
              :value="defaultDatepicker(selectedProject.end_date)"
              :min-date='selectedProject.start_date'   
              :popover="{visibility: 'click' }"
              :input-props='{class:"vs-inputx vs-input--input normal hasValue",visibility:"hidden"}'>
            </vc-date-picker>
          </div>

            <div class="spacer">
              <label class="vs-select--label input-select-label-primary"><b>Privacy</b></label>
              <br>
              <vs-row>
                <vs-col vs-w="2">
                  <vs-switch v-model="localPrivacy"/>
                </vs-col>
                <vs-col vs-w="10">
                  <label><b>{{privacyType}}</b>{{privacyText}} </label>
                </vs-col>
              </vs-row>
            </div>

            <div class="thumbnail-container spacer">
              <label class="vs-select--label input-select-label-primary"><b>Thumbnail</b></label>
              <br>
              <img v-if="!showUpload" class="popup-img-preview" :src="selectedProject.thumbnail" />
              <CustomImgUpload v-else @imgSrc="setThumbnail"/>
              <br>
              <vs-button type="border" v-if="!showUpload" @click="showUpload = true">Replace</vs-button>
              <vs-button type="border" v-else @click="showUpload = false">Close</vs-button>
            </div>
          </vs-tab>

          <!-- Access Tab -->
          <vs-tab label="Access" icon-pack="feather" icon="icon-user">
            <!-- Owners Table -->
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
                    :data="usersAutocompleteData"
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
            <!-- End Owners Table -->
            <br>
            <!-- Users Table -->
            <vs-table :data="selectedProject.users"> 
              <template slot="header">
                <label class="vs-select--label input-select-label-primary"><b>Users</b></label>
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
              <vs-tr v-for="tr in selectedProject.users" :key ="tr" :data="tr" class="border_bottom">
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
                  :data="usersAutocompleteData"
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
            <!-- End Users Table -->
          </vs-tab>

          <vs-tab label="History" icon-pack="feather" icon="icon-rotate-ccw"></vs-tab>

          <vs-tab label="Marketplace" icon-pack="feather" icon="icon-package">
            <h5>Publish to Marketplace</h5>
            
          </vs-tab>
        </vs-tabs>
      </template>
    </vs-popup>

    <!-- End Project Details Popup -->
    
    <!-- Project Add Button -->
    <transition name="fade" >
    <div class="icon-controls" @click="$router.push('/projects/new')" v-if="showControls">
      <vx-tooltip text="Add new project" position="left">
        <i class="material-icons add-new-project">add</i>
      </vx-tooltip>
    </div>
    </transition>
    <!-- End Project Add Button -->

  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import {mapActions,mapState, mapGetters} from 'vuex'
import VueAutoSuggest from '../../components/vx-auto-suggest/VxAutoSuggest.vue'
import CustomImgUpload from '../../custom/vsUpload/customImgUpload'
import 'vue-context/dist/css/vue-context.css';
import moment from 'moment'
export default {
  data: () => ({
    deleteID:null,
    popupActive: false,
    showControls:false,
    showUpload:false,
    deleteProject:null,
    projectFilter:{
      teams:{
        title:"Filter by team...",
        id:-1
      }
    }
  }),
  components:{
    VueAutoSuggest,
    CustomImgUpload
  },
  watch:{
    popupActive(){
      if(this.popupActive == false){
       this.updateProject()
       this.showUpload = false
      }
    }
  },
  computed:{
    ...mapState('project', {
      projects: state => state.projects,
      contentLoaded: state => state.contentLoaded,
      selectedProject: state => state.selectedProject
    }),

    ...mapState('auth', {
      favoriteProjects: state => state.favoriteProjects,
      activeUsers: state => state.activeUsers
     
    }),

    ...mapState('teams', {
      teams: state => state.teams,
    }),

    ...mapGetters('project',[
      'getDisplayName'
    ]),

    filteredProjects(){
      if(this.projectFilter.teams.id == -1){
        return this.projects
      }
      return this.projects.filter(el => el.team.key.id == this.projectFilter.teams.id)
    },
    usersAutocompleteData(){
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
    teamsAutocompleteData(){
      let teams = this.teams
      let data = {}
      data.teams = {}
      data.teams.key = 'title'
      data.teams.data = []

      teams.forEach(el => {
        data.teams.data.push({
          title:el.title,
          id:el.key.id
        })
      })

      return data
    },
    privacyText(){
      if(this.selectedProject.private){
        return "(Only people you invite)"
      }
      return "(Visible to everyone in your team)"
    },

    privacyType(){
      if(this.selectedProject.private){
        return "Private "
      }
      return "Public "
    },

    localPrivacy:{
      get(){
         return this.$store.state.project.selectedProject.private
      },
      set(value){
        
        this.$store.commit('project/SET_SELECTED_PROJECT_PRIVACY',value,{ root: true })
      }
    }
    

  },
  beforeDestroy(){
    this.showControls = false
  },
  mounted() {
    setTimeout(() => {
       this.showControls = true
    },100)
   
  },
  methods: {
    ...mapActions('project',[
      'updateProject',
      'removeProject'
    ]),

    ...mapActions('auth',[
      'postUser',
      'pushFavoriteProject',
      'spliceFavoriteProject',
    ]),

    ...mapActions('tasks',[
      'setCurrentProject',
      'getProjectChildren',
      'setCurrentTask',
    ]),

    ...mapActions('teams',[
       'getTeamProjects'
     ]),


    deleteConfirm(){
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to delete this project? This action cannot be reversed.',
        accept:this.handleDelete
      })
    },

    handleDelete(){
      let project = this.deleteProject
      if(project !== null){
        this.removeProject(project)
        .then(this.getTeamProjects())
        
        let found = false;
        if(this.favoriteProjects != null){
          this.favoriteProjects.forEach(el => {
            if(el.key.id == project.key.id){
              found = true
            }
          })

          if(found){
            this.spliceFavoriteProject(project)
          }

          this.deleteProject = null

        }
      }
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
        this.pushFavoriteProject([project])
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
          if(this.favoriteProjects.length == 5){
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
    defaultDatepicker(date){
      if(date !== null && typeof(date) != 'undefined'){
        return new Date(date)
      }
    },
    setFilter(team){
      this.projectFilter = {
        teams:{
          title:team.title,
          id:team.key.id
        }
      }
    },
    updateFilter(obj){
      this.projectFilter = obj
    },
    resetFilter(){
      this.projectFilter = {
        teams:{
            title:"Filter by team...",
            id:-1
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
    },
    setThumbnail(e){
      this.$store.commit('project/SET_SELECTED_PROJECT_THUMBNAIL',e,{ root: true })
    },
    setStartDate(e){
      this.$store.commit('project/SET_SELECTED_PROJECT_STARTDATE',e,{ root: true })
    },
    setEndDate(e){
      this.$store.commit('project/SET_SELECTED_PROJECT_ENDDATE',e,{ root: true })
    },

    moment(date) {
       return moment(date).format('MMMM Do YYYY')
    },
  }
};
</script>

<style scoped>
.card-project {
  z-index: -1;
  position: relative;
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
  z-index: 1;
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

.projectTeam{
  float:left;
  position: absolute;
  bottom: 10px;
  left: 10px;
  cursor: pointer;

}

.addOwnerButton{
  cursor: pointer;
  padding-left: 5px;

}

.ownerTableHeader{
  background-color: #ebebeb;
}
.popup-img-preview{
  width: 50%;
  height: 50%;
}

.thumbnail-container{
   padding-bottom: 15px;
}

.spacer{
  padding-top:15px;
}

.right-80{
  right: 80px;
}

</style>