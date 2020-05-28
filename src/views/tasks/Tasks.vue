<template>
  <div id="home">
     <ManageArchived  ref="managedArchived" />
    <div id="controls">
      <!--
       <vs-button
        color="primary"
        @click="panelSwitcher = 3;"
        type="border"
        ref="first-btn"
        :class="{ 'bg-primary':  panelSwitcher == 3 }"
        icon="account_tree"
      >Diagram</vs-button>
      -->
      <vs-button color="primary" @click="panelSwitcher = 2" type="border" :class="{ 'bg-primary': panelSwitcher == 2 }" icon="pie_chart">Dashboard</vs-button>
      <!--
      <vs-button
        ref="first-button"
        color="primary"
        @click="panelSwitcher = 1"
        type="border"
        :class="{ 'bg-primary': panelSwitcher == 1 }"
        icon="list"
      >List</vs-button>
      -->
      <vs-button color="primary" @click="panelSwitcher = 0;" type="border" ref="first-btn" :class="{ 'bg-primary':  panelSwitcher == 0 }" icon="grid_on">
        Table
      </vs-button>
    </div>
    

    <transition name="fade" mode="out-in" key="133">
      <div>
        
      <div class="title-block">
        <span id="title" href="#">
          {{ currentProject.title }}
        </span>
        <div @click.stop="$refs.contextMenu.open($event)"  @contextmenu.prevent="$refs.contextMenu.open" class="contextDiv">
            <vs-icon class="contextButton" icon-pack="feather" icon="icon-more-vertical" v-if="Object.keys(currentProject).length !== 0"> </vs-icon>
          </div>

        <vue-context ref="contextMenu" >
          <li>
            <a href="#" @click="$refs.managedArchived.openPopup()" class="flex items-center text-sm">
              <feather-icon icon="PackageIcon" svgClasses="w-5 h-5" />
              <span class="ml-2">Managed Archived</span>
            </a>
          </li>
          <li>
            <a href="#" @click="alertNewFeature()" class="flex items-center text-sm">
              <feather-icon icon="RepeatIcon" svgClasses="w-5 h-5" />
              <span class="ml-2">Merge Project</span>
            </a>
          </li>
      </vue-context>
      </div>
      <br>
       

      
      <!-- TABLE VIEW -->
      <TableView v-if="panelSwitcher === 0" key="0" :data="children" :showControls="showControls" />
     
      

      <!-- LIST VIEW -->
      <div id="list" v-else-if="panelSwitcher === 1" key="1">
      </div>

      <!-- DASHBOARD -->
      <div id="dashboard" v-else-if="panelSwitcher === 2" key="2">
        <Dashboard></Dashboard>
      </div>

      <!-- DIAGRAM VIEW -->
      <div id="tree" v-else-if="panelSwitcher === 3" key="3">
        <span id="title">Diagram</span>
      </div>

      </div>
    </transition>
  
   
    
  </div>
</template>

<script>
import TableView from './TableView.vue';
import Dashboard from './Dashboard';
import ListViewTable from '@/custom/ListViewTable.vue';
import ManageArchived from './ManageArchived.vue'
import "flatpickr/dist/flatpickr.css"
import { VueContext } from 'vue-context';
import {mapActions,mapState, mapGetters} from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'vue-context/dist/css/vue-context.css';


export default {
  components: {
    ListViewTable, 
    TableView,
    Dashboard,
    VueContext,
    ManageArchived
  },
  data: () => ({
    manageArchivedActive:false,
    data: [],
    table: true,
    panelSwitcher: 0,
    icons: false,
    showControls:false,
  }),
  watch: {
    $route(to, from) {
      if('pid' in to.params && 'tid' in to.params){
        console.log("loading to task")
      }
      else if('pid' in to.params){
        this.loadProject()
      }
    },
    contentLoaded(){
      if(this.contentLoaded){
        let loadProject = false
        let loadTask = false

        if('pid' in this.$route.params) loadProject = true
        if('tid' in this.$route.params) loadTask = true

        // Load specific project and task
        if(loadProject && loadTask){
          this.loadTaskAndProject()
        }
        //Load specific project at root
        else if(loadProject){
          this.loadProject()
        }
       
        this.showControls = true
        
      }
    }
  },
  computed:{
    ...mapState('project', {
      projects: state => state.projects,
      contentLoaded: state => state.contentLoaded
    }),

    ...mapState('tasks', {
      currentProject: state => state.currentProject,
      breadcrumbTitles: state => state.breadcrumbTitles,
      children: state => state.children
    }),

    ...mapState('auth', {
      activeUsers: state => state.activeUsers
    }),

  },
  methods: {
    ...mapActions('tasks',[
      'setCurrentProject',
      'getProjectChildren',
      'setCurrentTask',
      'setBreadcrumbTitles',
      'setCurrentTaskByURLSafeKey',
      'getCurrentTaskBreadcrumbTitles'
    ]),

    

    addProject() {
      this.$router.push("/projects/new");
    },
    alertNewFeature(){
      //this.removeProject(this.deleteID)
      this.$vs.notify({
       
        title:'Under Development',
        text:'That feature isnt done yet. Stay tuned!'
      })
    },
    async loadProject(){
      try{
        this.$store.commit('tasks/SET_CURRENT_MULTISELECTED',[]) // clear mutliselect

        let projects = this.projects
        if(typeof(projects) !== 'undefined'){ // if projects are loaded

          let pid = this.$route.params.pid
          let project = projects.filter(el => el.key.id == pid) // get project based on route param
          console.log(project)

          if(project.length == 1){ // if param id matches a single project
            await this.setCurrentProject(project[0])
            await this.getProjectChildren()
            if(this.children.length > 0) { 
            let currentChild = this.children[0]
              await this.setBreadcrumbTitles([{
                key:currentChild.key,
                title:'Home',
                tr:currentChild
              }])
            }
            else{
              this.setBreadcrumbTitles([{
                key:{path:[1,2,3,4,5,6],id:1234},
                title:'Home',
                tr:project[0]
              }])
            }
          }
          else{
            console.log('invalid url')
            //Invalid project URL
            this.$vs.notify({
                title: 'Error',
                text: 'Invalid URL. Please navigate to a valid project.',
                color: 'danger',
                iconPack: 'feather',
                icon: 'icon-alert-circle'
            })
          }
        }
      }
      catch(err){
        //Invalid project URL
        this.$vs.notify({
            title: 'Error',
            text: 'Something went wrong! You most likely navigated to an incorrect project link - please try again.',
            color: 'danger',
            iconPack: 'feather',
            icon: 'icon-alert-circle'
        })
      }
    },
    async loadTaskAndProject(){
      try{
        this.$store.commit('tasks/SET_CURRENT_MULTISELECTED',[]) // clear mutliselect

        let projects = this.projects
        if(typeof(projects) !== 'undefined'){ // if projects are loaded

          let pid = this.$route.params.pid
          let tid = this.$route.params.tid

          let project = projects.filter(el => el.key.id == pid) // get project based on route param

          console.log(projects)

          if(project.length == 1){ // if param id matches a single project
            await this.setCurrentProject(project[0])
            await this.setCurrentTaskByURLSafeKey(tid)
            await this.getCurrentTaskBreadcrumbTitles()
          }
          else{
            console.log('invalid url')
            //Invalid project URL
            this.$vs.notify({
                title: 'Error',
                text: 'Invalid URL. Please navigate to a valid project.',
                color: 'danger',
                iconPack: 'feather',
                icon: 'icon-alert-circle'
            })
          }    

        }
      }
      catch(err){
        this.$vs.notify({
            title: 'Error',
            text: 'Something went wrong! You most likely navigated to an incorrect project link - please try again.',
            color: 'danger',
            iconPack: 'feather',
            icon: 'icon-alert-circle'
        })
      }
    }
  },
  async mounted() {
    if(this.contentLoaded){
      setTimeout(() => {
         this.showControls = true
      }, 200)
      
    }
      
  },
};
</script>

<style scoped>

.tree-container {
  width: 98%;
  height: 70vh;
}

#table-container {

  position: relative;
  z-index: 0;
}

.active-desc {
  border: 1px solid red;
}

.apexcharts-legend {
  display: flex;
  flex-direction: column;
}

.invisible {
  display: none!important;
}


#add-icon {
  border-radius: 100%;
  color: white;
  font-size: 24px;
  margin: 4px;
  padding: 10px;
  font-weight: bold;
  box-shadow: 0rem 0rem 0.5rem 1px darkmagenta;
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(121, 9, 111, 1) 100%,
    rgba(0, 212, 255, 1) 100%
  );
}

* {
  text-decoration: none;
}
#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 30px;
  margin-left: 10px;
  font-weight: bold;
  color: #707070;
}

#pie-chart {
  background: #fff;
  box-shadow: 1px,1px,1px,10px rgba(0, 0, 0, 0.1);
}

#t1 {
  width: 96%;
}
#description {
  margin-right: 80%;
}

.bg-primary {
  color: white;
  background-color:#7367F0!Important;
}

#navigation {
  display: flex;
}

#edit-row > * {
  margin-left: 10px;
}

#edit-row {
  display: flex;
}

#controls {
  display: flex;
  flex-direction: row-reverse;
}

#controls > button {
  padding: 4px;
  margin-right: 7px;
}

#breadcrumb {
  cursor: pointer;
}
.contextButton{
  display: inherit;
}
.contextDiv{
   display: initial;
}
</style>