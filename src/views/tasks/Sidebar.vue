<template>
 <transition name="ease" >
  <vs-row>
    <vs-col vs-offset="8" vs-w="4">
      <!-- START TOP NAV BUTTONS -->
      <vx-card class="sidebar-parent" v-if="active">
        <vs-button style="float: right;" class="closeButton" @click="closeSidebar()" icon="clear"></vs-button>
        <vs-button class="closeButton" type="border" @click="setSidebarEditing(!editing)"  icon="edit" v-if="!editing"></vs-button>
        <span style="display:flex;">
          <vs-button class="closeButton"  color="dark" @click="setSidebarEditing(!editing)" icon="save" v-if="editing" ></vs-button>
          <div style="padding-left:5px;padding-top:7px;"   @click.stop="$refs.menu.open($event)"  @contextmenu.prevent="$refs.menu.open" >
            <vs-icon class="buttonNoFill" icon-pack="feather" icon="icon-more-vertical" v-if="editing"> </vs-icon>
          </div>
        </span>

        <vue-context ref="menu">
          <li v-if="task.archive">
            <a href="#" @click="deleteTaskPrompt()" class="flex items-center text-sm">
              <feather-icon icon="Trash2Icon" svgClasses="w-5 h-5" />
              <span class="ml-2">Delete</span>
            </a>
          </li>
          <li v-else>
            <a href="#" @click="updateArchive(true)" class="flex items-center text-sm">
              <feather-icon icon="ArchiveIcon" svgClasses="w-5 h-5" />
              <span class="ml-2">Archive</span>
            </a>
          </li>
          <li>
            <a href="#" @click="alertNewFeature()" class="flex items-center text-sm">
              <feather-icon icon="CornerRightDownIcon" svgClasses="w-5 h-5" />
              <span class="ml-2">Shift Down</span>
            </a>
          </li>
          <li>
            <a href="#" @click="alertNewFeature()" class="flex items-center text-sm">
              <feather-icon icon="CornerLeftUpIcon" svgClasses="w-5 h-5" />
              <span class="ml-2">Shift Up</span>
            </a>
          </li>
          
      </vue-context>

      <!-- END TOP NAV BUTTONS -->
        
      <!-- START SIDEBAR CONTENT -->
        <div class="task-content" v-if="!editing">
            <vs-row>
              <vs-col vs-w="9" style="padding-left:0;padding-top:10px;">
                <h3 class="task-title">{{task.title}}</h3>
                <h4 :style="{color:getStatusColor(task.status)}">{{task.status}} </h4>
              </vs-col>
              <vs-col vs-w="3">
                <vx-tooltip :text="task.owner.displayName" position="bottom" v-if="task.owner" class="imgContainer">
                  <img class="avatarImg" :src="'https://ui-avatars.com/api/?name=' + task.owner.displayName"/>
                </vx-tooltip>
              </vs-col>
            </vs-row>
  
          <br>
          <div>
            <span class="field-label"><b>Start Date: </b> </span>
            <span>{{moment(task.start_date)}}</span>
          </div>

          <div class="spacer">
            <span class="field-label"><b>End Date: </b></span>
            <span>{{moment(task.end_date)}}</span>
          </div>

          <div class="spacer">
            <span class="field-label"><b>Details: </b></span>
            <br>
            <br>
            <span class="detailsList" v-html="task.details">{{task.details}}</span>
          </div>
        </div>

        <!--- END SIDEBAR CONTENT -->

        <!--- START SIDEBAR EDITING -->
        <div class="task-editing" v-else>
          <div class="spacer">
            <vs-input class="inputx spaced w-full" placeholder="Placeholder" :value="task.title" @input="updateTitle" label="Title" />
          </div>

          <div class="spacer">
            <vs-select @input="updateStatus" type="color" class="w-full select-large this.data" label="Status" :value="defaultTaskStatus(task.status)">
              <vs-select-item :key="index" :value="item.value" :text="item.value" v-for="(item,index) in status" class="w-full" :color="item.color"/>
            </vs-select>
          </div>

          <div class="spacer">
            <label class="vs-select--label this.data input-select-label-primary">Owner</label>
            <vue-auto-suggest
              @selected="updateOwner"
              :placeholder="autocompletePlaceholder"
              :data="autocompleteData"
              :filter-by-query="true">

              <template v-slot:users="{ suggestion }">
              <div class="flex items-end leading-none py-1">
                <feather-icon :icon="suggestion.icon" svgClasses="h-5 w-5" class="mr-4" />
                <span class="mt-1">{{ suggestion.displayName }}</span>
              </div>
            </template>
              <!-- Filter by input text to only show the matching results -->
            </vue-auto-suggest>
          </div>
          

          <div class="spacer">
            <label id="startDateLabel" class="vs-select--label this.data input-select-label-primary">Start Date</label>
            <vc-date-picker
              @popoverWillShow="toggleStartDateActive" 
              @popoverWillHide="toggleStartDateActive"
              @input="updateStartDate"  
              :value="defaultStartDateDatepicker(task.start_date)" 
              :popover="{visibility: 'click' }"
              :input-props='{class:"vs-inputx vs-input--input normal hasValue"}'>
            </vc-date-picker>
          </div>

          <div class="spacer">
            <label id="endDateLabel" class="vs-select--label this.data input-select-label-primary">End Date</label>
            <vc-date-picker
              popover-visibility="click" 
              @popoverWillShow="toggleEndDateActive" 
              @popoverWillHide="toggleEndDateActive"
              @input="updateEndDate"
              :min-date='task.start_date'  
              :value="defaultStartDateDatepicker(task.end_date)" 
              :popover="{visibility: 'click' }"
              :input-props='{class:"vs-inputx vs-input--input normal hasValue",visibility:"hidden"}'>
            </vc-date-picker>
          </div>

          <div class="spacer">
            <label id="detailsLabel" class="vs-select--label this.data input-select-label-primary">Details</label>
            <quill-editor
              class="w-full select-large"
              ref="myTextEditor"
              @input="updateDetails"
              :value="task.details"
              :options="editorOption"     
            />
          </div>
        <!-- END SIDEBAR EDITING -->
        </div>
      </vx-card>
    </vs-col>
  </vs-row>
 </transition>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import VueAutoSuggest from '../../components/vx-auto-suggest/VxAutoSuggest.vue'
import moment from 'moment'
import { quillEditor } from 'vue-quill-editor'
import { VueContext } from 'vue-context';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'vue-context/dist/css/vue-context.css';

export default {
  data(){
    return{
      status:[
        {
          value:'Not Started',
          color:'#000000'
        },
        {
          value:'In Progress',
          color:'#fdfa8c'
        },
        {
          value:'Complete',
          color:'#a6f099'
        }
      ],
      editorOption:{
        modules: {
          toolbar:[
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ]
        }
      }
    }
  },
  components:{
    VueAutoSuggest,
     quillEditor,
     VueContext
  },
  computed:{
    ...mapState('tasks',{
      task:'currentSelected',
      active:'sidebarActive',
      editing:'sidebarEditing',
    }),
    ...mapState('auth',{
      users:'activeUsers'
    }),
    autocompleteData(){
      let users = this.users
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
    autocompletePlaceholder(){
      if(this.task.owner !== null && typeof(this.task.owner) !== 'undefined'){
        return this.task.owner.displayName
      }
      return "Search a coworker.."
    }

  },
  methods:{
    ...mapActions('tasks',[
      'setSidebarActive',
      'setSidebarEditing',
      'setCurrentSelected',
    ]),
    updateTitle(e){
     this.$store.commit('tasks/SET_TITLE',e,{ root: true })
    },
    updateStatus(e){
      this.$store.commit('tasks/SET_STATUS',e,{ root: true })
    },
    updateStartDate(e){
      this.$store.commit('tasks/SET_START_DATE',e,{ root: true })
    },
    updateEndDate(e){
      this.$store.commit('tasks/SET_END_DATE',e,{ root: true })
    },
    updateOwner(e){
      console.log(e.users)
      this.$store.commit('tasks/SET_OWNER',e.users,{ root: true })
    },
    updateCustomColumns(e){
      this.$store.commit('tasks/SET_CUSTOM_COLUMNS',e,{ root: true })
    },
    updateDetails(e){
      this.$store.commit('tasks/SET_DETAILS',e,{ root: true })
    },
    updateArchive(e){
      this.$store.commit('tasks/SET_ARCHIVE',e,{ root: true })
      this.closeSidebar()
    },

    toggleStartDateActive(){
      let element = document.getElementById("startDateLabel")
      if(element.classList.contains('input-select-label-primary--active')){
          element.classList.remove('input-select-label-primary--active')
          element.classList.add('input-select-label-primary')
      }
      else{
        element.classList.remove('input-select-label-primary')
        element.classList.add('input-select-label-primary--active')
      }
     
    },
    toggleEndDateActive(){
      let element = document.getElementById("endDateLabel")
      if(element.classList.contains('input-select-label-primary--active')){
          element.classList.remove('input-select-label-primary--active')
          element.classList.add('input-select-label-primary')
      }
      else{
        element.classList.remove('input-select-label-primary')
        element.classList.add('input-select-label-primary--active')
      }
     
    },
    closeSidebar(){
      this.setSidebarActive(false);
      if(this.editing){
         this.setSidebarEditing(false)
      } 
    },
    getStatusColor(status){
      if(status == 'In Progress'){
        return '#ff9933'
      }
      else if(status == 'Complete'){
        return '#33cc00'
      }
      else{
        return '#626262'
      }
    },
     moment (date) {
       return moment(date).format('MMMM Do YYYY')
    },

    alertNewFeature(){
      //this.removeProject(this.deleteID)
      this.$vs.notify({
       
        title:'Under Development',
        text:'That feature isnt done yet. Stay tuned!'
      })
    },
    defaultStartDateDatepicker(date){
      if(date !== null && typeof(date) != 'undefined'){
        return new Date(date)
      }
      return new Date()
    },
    defaultTaskStatus(status){
      if(status !== null && typeof(status) != 'undefined'){
        return status
      }
      this.updateStatus('Not Started')
      return 'Not Started'
      
    }
    
  },

}
</script>

<style>
.sidebar-parent{
  right: 0;
  top:90px;
  height: 90vh;
  overflow-y:scroll;
  width: 20vw;
  position: fixed;
  z-index: 999;
}
.task-content{
  padding-top:10%;
}
.task-editing{
  padding-top:10%;
}
.spacer{
  padding-top:10px;
}
textarea{
  height: 200px;
}
.avatarImg{
  border-radius: 50%;
}
.spacer{
  padding-top:10px;
}

.buttonNoFill{
  background-color: white;
}


</style>