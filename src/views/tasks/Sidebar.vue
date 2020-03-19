<template>
 <transition name="ease" >
  <vs-row>
    <vs-col vs-offset="8" vs-w="4">
      <vx-card class="sidebar-parent" v-if="active">
       
        <vs-button style="float: right;" class="closeButton" @click="closeSidebar()" icon="clear"></vs-button>
        <vs-button class="closeButton" type="border" @click="setSidebarEditing(!editing)"  icon="edit" v-if="!editing"></vs-button>
        <vs-button class="closeButton"  color="dark" @click="setSidebarEditing(!editing)"  icon="save" v-if="editing"></vs-button>
        
        <div class="task-content" v-if="!editing">
          <h1 class="task-title">{{task.title}}</h1>
          <h3 class="this.data">{{task.status}} </h3>
          <h4 class="this.data">Start date: <span>{{new Date(task.start_date).toLocaleString()}} </span></h4>
          <h4 class="this.data">End date: <span>{{new Date(task.end_date).toLocaleString()}} </span></h4>
          <h4 class="this.data">Details: <span>{{new Date(task.end_date).toLocaleString()}} </span></h4>
        </div>

        <div class="task-editing" v-else>
          <div class="spacer">
            <vs-input class="inputx spaced w-full" placeholder="Placeholder" :value="task.title" @input="updateTitle" label="Title" />
          </div>

          <div class="spacer">
            <vs-select @input="updateStatus" type="color" class="w-full select-large this.data" label="Status" :value="task.status">
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
              :value="task.start_date" 
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
              :value="task.end_date" 
              :input-props='{class:"vs-inputx vs-input--input normal hasValue"}'>
            </vc-date-picker>
          </div>

          <div class="spacer">
            <label id="detailsLabel" class="vs-select--label this.data input-select-label-primary">Details</label>
            <vs-textarea @input="updateDetails" class="w-full select-large this.data" :value="task.details"/>
          </div>



          
        </div>
      
      </vx-card>
    </vs-col>

  </vs-row>
 </transition>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import VueAutoSuggest from '../../components/vx-auto-suggest/VxAutoSuggest.vue'
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
      ]
    }
  },
  components:{
    VueAutoSuggest
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
</style>