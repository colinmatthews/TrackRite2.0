<template>
<div>

  <span id="title">Projects</span>

  <vx-card class="card-container" :class="{extended:showFileImport}">
    <transition name="fade">
      <vs-button type="border" style="margin: 10px" @click="$router.push('/projects')" icon="arrow_back">Close</vs-button>
    </transition>

    <!-- New Project Selection -->
      <div class="new-project-container" v-if="! showNewProjectForm">
        <vs-row>
          <vs-col vs-w="4">
              <div class="project-selection vl vl-blank">
                <h2 class="project-header">Marketplace </h2>
                <p class="project-subtitle">Get started with a project plan built by industry experts</p>
                <svg width="51" height="45" viewBox="0 0 51 45" fill="none" xmlns="http://www.w3.org/2000/svg" class="project-center svg-size">
                  <rect x="4" y="9" width="42" height="27" fill="#FFFFF0"/>
                  <rect x="4" y="9" width="42" height="27" fill="url(#paint0_linear)"/>
                  <rect x="4" y="1" width="42" height="8" fill="#CBBCF4"/>
                  <rect x="13" y="14" width="10" height="2" fill="#DBE8FD"/>
                  <rect x="26" y="29" width="14" height="3" fill="#D6E3F8"/>
                  <rect x="18" y="22" width="13" height="2" fill="#D6E3F7"/>
                  <g filter="url(#filter0_d)">
                  <path d="M4.5 8.5V36.5H46L45.5 1.5H4.5V8.5ZM4.5 8.5H36.5" stroke="#10163A"/>
                  </g>
                  <path d="M36.5 8.5H45.5M7.5 4V6M11.5 4V6M16 4V6M19.5 4V6M23.5 4V6M27.5 4V6M31.5 4V6M35.5 4V6M39 4V6M43 4V6M7.5 15C8.3 15 9.83333 15 10.5 15M7.5 22.5H14.5M7.5 30.5H22.5M23.5 15H43M32 23H43M40 30.5H43M18 23V21.5H31.5V24.5H18V23ZM13.5 14H23.5V16.5H13.5V14ZM26 29.5H40V32.5H26V29.5Z" stroke="#10163A"/>
                  <g filter="url(#filter1_f)">
                  <path d="M46 1L46.5 37H4" stroke="#10163A" stroke-width="0.5"/>
                  </g>
                  <defs>
                  <filter id="filter0_d" x="0" y="1" width="50.5072" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                  <feOffset dy="4"/>
                  <feGaussianBlur stdDeviation="2"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                  </filter>
                  <filter id="filter1_f" x="3.45" y="0.446529" width="43.8535" height="37.3535" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="0.275" result="effect1_foregroundBlur"/>
                  </filter>
                  <linearGradient id="paint0_linear" x1="25" y1="9" x2="25" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stop-color="white"/>
                  <stop offset="1" stop-color="white" stop-opacity="0"/>
                  </linearGradient>
                  </defs>
                </svg>

              </div>
               <vs-button class="project-center" @click="alertNewFeature()">Browse</vs-button>  
          </vs-col>

          <vs-col vs-w="4">
            <div class="project-selection vl">
                <h2 class="project-header">Import </h2>
                <p class="project-subtitle">Upload your own existing project plan from MS Excel or Project</p>
                <svg width="48" height="41" viewBox="0 0 48 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="project-center svg-size">
                  <path d="M1 1H15.5L20 4.5H42V7.5H47.5V33V34.5H42H1V26.5V1Z" fill="#FFFFE8"/>
                  <path d="M1 1H15.5L20 4.5H42V7.5H47.5V33V34.5H42H1V26.5V1Z" fill="url(#paint0_linear)"/>
                  <path d="M42 34.5H1V26.5M42 34.5V7.5M42 34.5H47.5V33V7.5H42M42 7.5V4.5H20L15.5 1H1V26.5M1 26.5C2.2 26.5 12.1667 26.5 17 26.5M41.5 26.5H28.5M2.5 29.5V31.5M6.5 29.5V31.5M10.5 29.5V31.5M14.5 29.5V31.5M18.5 29.5V31.5M27.5 29.5V31.5M31.5 29.5V31.5M35.5 29.5V31.5M39.5 29.5V31.5" stroke="black"/>
                  <path d="M23 11.5L14 19.5L17.5 23L20.5 20V40.5H25.5V20L28.5 23L31.5 19.5L23 11.5Z" fill="#DBE8FD"/>
                  <path d="M23 11.5L14 19.5L17.5 23L20.5 20V40.5H25.5V20L28.5 23L31.5 19.5L23 11.5Z" fill="url(#paint1_linear)"/>
                  <path d="M23 11.5L14 19.5L17.5 23L20.5 20V40.5H25.5V20L28.5 23L31.5 19.5L23 11.5Z" stroke="black"/>
                  <defs>
                  <linearGradient id="paint0_linear" x1="24.25" y1="1" x2="24.25" y2="34.5" gradientUnits="userSpaceOnUse">
                  <stop stop-color="white"/>
                  <stop offset="1" stop-color="white" stop-opacity="0"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="23" y1="40" x2="23" y2="32.5" gradientUnits="userSpaceOnUse">
                  <stop stop-color="white"/>
                  <stop offset="1" stop-color="white" stop-opacity="0"/>
                  </linearGradient>
                  </defs>
                </svg>

                
              </div>
             <vs-button class="project-center" @click="alertNewFeature()">Import</vs-button>
          </vs-col>

          <vs-col vs-w="4">
            <div class="project-selection vl">
                <h2 class="project-header">Blank </h2>
                <p class="project-subtitle">Start from scratch with a blank project </p>
                <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="project-center svg-size">
                  <path d="M1 10V43H35V1H10V10H1Z" fill="#FFFFE8"/>
                  <path d="M1 10V43H35V1H10V10H1Z" fill="url(#paint0_linear)"/>
                  <path d="M1 10V43H35V1H10V10H1Z" stroke="black"/>
                  <path d="M3.5 36.5V38.5M7.5 36.5V38.5M11.5 36.5V38.5M15.5 36.5V38.5M19.5 36.5V38.5M23.5 36.5V38.5M27.5 36.5V38.5M31.5 36.5V38.5" stroke="black"/>
                  <path d="M10 1L1 10" stroke="black"/>
                  <path d="M9.5 2L2 9.5H9.5V2Z" fill="#C2D6F5"/>
                  <path d="M9.5 2L2 9.5H9.5V2Z" fill="url(#paint1_linear)"/>
                  <defs>
                  <linearGradient id="paint0_linear" x1="18" y1="1" x2="18" y2="43" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#D2E1F8"/>
                  <stop offset="1" stop-color="#FEFEEA"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="6" y1="2" x2="6" y2="9.5" gradientUnits="userSpaceOnUse">
                  <stop stop-color="white"/>
                  <stop offset="1" stop-color="white" stop-opacity="0"/>
                  </linearGradient>
                  </defs>
                </svg>
              </div>
              <vs-button class="project-center" @click="showNewProjectForm = true">Create</vs-button>        
          </vs-col>
        </vs-row>
      </div>
      <!-- End New Project Selection -->


      <!-- New Project Form -->
      <div class="new-project-form-container" v-else>
        <vs-row class="new-form">
          <vs-col vs-w="6">
            <vs-row>
              <vs-col vs-w="12" class="spacer">
                <vs-input class="w-full" icon-pack="feather" icon="icon-type" icon-no-border label="Title" v-model="newTitle" />
              </vs-col>
          
              <vs-col vs-w="12" class="spacer">
                <vs-input  class="w-full" icon-pack="feather" icon="icon-type" icon-no-border label="Description" v-model="newDescription" />
              </vs-col>
    
              <vs-col vs-w="12" class="spacer">
                <label class="vs-select--label" style="color:rgba(0,0,0,.7);">Owner</label>
                <vue-auto-suggest
                    @selected="updateOwner"
                    :placeholder="newOwner.displayName"
                    :data="usersAutocompleteData"
                    :filter-by-query="true">

                      <template v-slot:users="{ suggestion }">
                        <div class="flex items-end leading-none py-1">
                          <feather-icon :icon="suggestion.icon" svgClasses="h-5 w-5" class="mr-4" />
                          <span class="mt-1">{{ suggestion.displayName }}</span>
                        </div>
                      </template>
                   </vue-auto-suggest>
              </vs-col>

              <vs-col vs-w="12" class="spacer">
                <label class="vs-select--label" style="color:rgba(0,0,0,.7);">Team</label>
                <vue-auto-suggest
                    @selected="updateTeam"
                    :placeholder="newTeam.title"
                    :data="teamsAutocompleteData"
                    :filter-by-query="true">

                      <template v-slot:teams="{ suggestion }">
                        <div class="flex items-end leading-none py-1">
                          <feather-icon :icon="suggestion.icon" svgClasses="h-5 w-5" class="mr-4" />
                          <span class="mt-1">{{ suggestion.title }}</span>
                        </div>
                      </template>
                   </vue-auto-suggest>
              </vs-col>

              <vs-col vs-w="12" class="spacer">
                <label class="vs-select--label" style="color:rgba(0,0,0,.7);">Start Date</label>
                <vc-date-picker
                  popover-visibility="click" 
                  @input="updateStartDate"
                  :value="newStartDate" 
                  :popover="{visibility: 'click' }"
                  :input-props='{class:"vs-inputx vs-input--input normal hasValue",visibility:"hidden",placement:"bottom"}'>
                </vc-date-picker>
              </vs-col>

              <vs-col vs-w="12" class="spacer">
                <label class="vs-select--label" style="color:rgba(0,0,0,.7);">End Date</label>
                <vc-date-picker
                  popover-visibility="click" 
                  @input="updateEndDate"
                  :value="newEndDate"
                  :min-date='newStartDate'   
                  :popover="{visibility: 'click' }"
                  :input-props='{class:"vs-inputx vs-input--input normal hasValue",visibility:"hidden",placement:"bottom"}'>
                </vc-date-picker>
              </vs-col>
            

              <vs-col vs-w="12" class="spacer">
                
                <label class="vs-select--label" style="color:rgba(0,0,0,.7);">Privacy</label>
                <vs-row class="spacer field-border" >
                  <vs-col vs-w="0">
                    <vs-icon icon="lock"></vs-icon>
                  </vs-col> 
                  <vs-col vs-w="2">
                    <vs-switch v-model="newPrivate" />
                  </vs-col>
                  <vs-col vs-w="6">
                    <label><b>{{privacyType}}</b>{{privacyText}} </label>
                  </vs-col>
                </vs-row>
              </vs-col>

              <vs-col vs-w="12" class="spacer">
                <label class="vs-select--label" style="color:rgba(0,0,0,.7);">Thumbnail</label>
                <CustomImgUpload automatic @imgSrc="setPreviewSrc"/>
              </vs-col>

              <vs-col vs-w="12" class="spacer" v-if="showFileImport">
                <br>
                <label class="vs-select--label" style="color:rgba(0,0,0,.7);">Project File (MS Excel or Project)</label>
                <CustomFileUpload automatic />
              </vs-col>
          
            </vs-row>
          </vs-col>

          <!-- Preview -->
          <vs-col vs-w="6">
            <h6>Preview </h6>
            <br>
            <div class="card-preview">
              <div class="image">
                <img
                  class="image-preview"
                  id="image-preview"
                  src="@/assets/images/sample.png"
                />
              </div>

              <h3 id="card-title">{{ newTitle}}</h3>
              <p id="card-description">{{newDescription}}</p>
            </div>
            <div class="new-project-buttons">
                <vs-button class="mr-3 mb-2" @click="submitNewProject">Create</vs-button>
                <vs-button color="warning" type="border" class="mb-2" @click="showNewProjectForm = false ; showFileImport = false" >Cancel</vs-button>
              </div>
          </vs-col>
          
        </vs-row>

      </div>
      <!-- End New Project Form -->
     

      
  </vx-card>

</div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import CustomImgUpload from '../../custom/vsUpload/customImgUpload'
import CustomFileUpload from '../../custom/vsUpload/customFileUpload'
import VueAutoSuggest from '../../components/vx-auto-suggest/VxAutoSuggest.vue'
export default {
  data: () => ({
    newPrivate:false,
    showFileImport:false,
    showNewProjectForm:false,
    newTitle:"",
    newPrivate:false,
    newDescription:"",
    newSrc:null,
    newStartDate:null,
    newEndDate:null,
    newTeam:{
      title:"Search a team..."
    },
    newOwner:{
      displayName:"Search a coworker..."
    }
  }),
  components:{
    FormWizard,
    TabContent,
    CustomImgUpload,
    CustomFileUpload,
    VueAutoSuggest
  },
  computed:{
    ...mapState('auth', {
      activeUsers: state => state.activeUsers
    }),

    ...mapState('teams', {
      teams: state => state.teams
    }),

    privacyText(){
      if(this.newPrivate){
        return "(Only people you invite)"
      }
      return "(Visible to everyone in your organization)"
    },

    privacyType(){
      if(this.newPrivate){
        return "Private "
      }
      return "Public "
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
          key:el.key
        })
      })
      return data

    }
  },
  methods:{
    ...mapActions('project',[
      'createProject',
      'initializePublicProjectContents',
      'initializePrivateProjectContents',
    ]),

    submitNewProject() {
      this.$validator.validateAll().then(result => {
        if (result) {
        
        const project = {
          title:this.newTitle,
          description:this.newDescription,
          end_date:this.newEndDate,
          start_date:this.newStartDate,
          private:this.newPrivate,
          thumbnail:this.newSrc,
          owners:[this.newOwner.uid],
          users:[this.newOwner.uid],
          guests:null
        }

        const data ={
          project:project,
          team:this.newTeam
        }
          
          this.createProject(data)
          .then(async () => {
            await this.initializePublicProjectContents()
            await this.initializePrivateProjectContents()
          })
          .then(this.$router.push('/projects'))
        } 
        else{
          this.$vs.notify({
            color:'warning',
            title:'Something Went Wrong',
            text:'Please try again.'
          })
        }
      });
    },
    setPreviewSrc(src){
      console.log(src)
      document.querySelector('#image-preview').src = src
      this.newSrc = src
    },
     alertNewFeature(){
      //this.removeProject(this.deleteID)
      this.$vs.notify({
       
        title:'Under Development',
        text:'That feature isnt done yet. Stay tuned!'
      })
    },
    updateOwner(owner){
      this.newOwner = owner.users
    },
    updateTeam(obj){
      this.newTeam = obj.teams
    },
    updateStartDate(date){
      this.newStartDate = date
    },
    updateEndDate(date){
      this.newEndDate = date
    },
  }

}
</script>

<style scoped>
#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #707070;
}

.new-project-container{
  height: 100%;
  padding-top:20px;
}

.project-header{
  text-align: center;
  height: 40px;
}

.project-subtitle{
  text-align: center;
  padding-top:5px;
  height: 30px;
}

.project-center{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  margin-top:20px;
}

.card-container{
  height: 150%;
}
.extended{
   height: 1100px;
}

.vl{
  border-left: 1px solid grey;
  height: 100%;

}

.vl-blank{
  border-left: 0px solid grey;
}

.svg-size{
  width:30vh;
  height: 15vw;
}

.new-project-form-container{
  padding-top:20px;
}
.image-preview {
  margin-top:30px;
  width: 15vw;
  height: 30vh;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

.card-preview{
  border: 1px dashed #a7a7a7;
  height: 50vh;
  text-align: center;
}

.card-title {
  font-size: 14px!Important;
}

.field-border{
  border:1px solid rgba(0, 0, 0, 0.2); 
  border-radius:5px; 
  padding-bottom:10px;
  padding-top:10px;
}

.new-project-buttons{ 
  padding-top:25px;
  float: right;
}

.spacer{
  padding-top:10px;
}
</style>