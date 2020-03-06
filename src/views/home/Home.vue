<template>
  <div id="home">
    <Controls id="icon-controls" />
    
    <div id="controls">
       <vs-button
        color="primary"
        @click="panelSwitcher = 3;"
        type="border"
        ref="first-btn"
        :class="{ 'bg-primary':  panelSwitcher == 3 }"
        icon="account_tree"
      >Diagram</vs-button>

      <vs-button
        color="primary"
        @click="panelSwitcher = 2"
        type="border"
        :class="{ 'bg-primary': panelSwitcher == 2 }"
        icon="pie_chart"
      >Dashboard</vs-button>

      <vs-button
        ref="first-button"
        color="primary"
        @click="panelSwitcher = 1"
        type="border"
        :class="{ 'bg-primary': panelSwitcher == 1 }"
        icon="list"
      >List</vs-button>

      <vs-button
        color="primary"
        @click="panelSwitcher = 0; updateTable()"
        type="border"
        ref="first-btn"
        :class="{ 'bg-primary':  panelSwitcher == 0 }"
        icon="grid_on"
      >Table</vs-button>
    </div>

    <transition name="fade" mode="out-in" key="133">
      <div>

      <div class="title-block">
        <vs-dropdown :vsDropRight="true">
          <span id="title" href="#">
            {{ currentProject.title }}
            <i class="material-icons"> expand_more </i>
          </span>

          <vs-dropdown-menu>

            <vs-dropdown-item v-for="project in getProjects" :key="project.key.id">
              {{ project.title}}
            </vs-dropdown-item>

          </vs-dropdown-menu>
        </vs-dropdown>
   
        </div>
       

      
      <!-- TABLE VIEW -->
      <TableView v-if="panelSwitcher === 0" key="0" :data="children" />
      
      

      <!-- LIST VIEW -->
      <div id="list" v-else-if="panelSwitcher === 1" key="1">
        
      

      
      </div>

      <!-- DASHBOARD -->
      <div id="dashboard" v-else-if="panelSwitcher === 2" key="2">
        <span id="title">{{ data.project_title }}</span> 
        <DashboardView></DashboardView>
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
import DashboardView from '@/custom/DashboardView.vue';
import ListViewTable from '@/custom/ListViewTable.vue';
import Controls from './Controls.vue'
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import {tree} from 'vued3tree'
import {mapActions,mapState, mapGetters} from 'vuex'
import firebase from 'firebase'


export default {
  components: {
    Controls,
    flatPickr, 
    ListViewTable, 
    TableView,
    DashboardView, 
    tree
  },
  data: () => ({
    data: [],
    table: true,
    panelSwitcher: 0,
    icons: false,
  }),
  
  computed:{
    ...mapState('project', {
      allProjects: state => state.allProjects,
      projectsLoaded: state => state.projectsLoaded
    }),

     ...mapState('tasks', {
      currentProject: state => state.currentProject,
      currentPath: state => state.currentPath,
      breadcrumbTitles: state => state.breadcrumbTitles,
      children: state => state.children
    }),

    ...mapGetters('project',[
      'getProjects'
    ]),

  },
  methods: {
    ...mapActions('project',[
      'initializePublicProjectKeys', 
      'initializePublicProjectContents',
      'initializePrivateProjectKeys',
      'initializePrivateProjectContents'
    ]),

    ...mapActions('auth',[
      'setToken'
    ]),

    ...mapActions('tasks',[
      'setCurrentProject',
      'getProjectChildren',
      'setCurrentTask',
      'setCurrentPath',
    ]),
    addProject() {
      this.$router.push("/projects/new");
    },
  },
  created() {
    let user = firebase.auth().currentUser;
    this.setToken(user)
    .then(async () => {
      if(!this.projectsLoaded){
        await this.initializePublicProjectKeys()
        await this.initializePrivateProjectKeys()
        await this.initializePublicProjectContents()
        await this.initializePrivateProjectContents()
      } 
    })
    .then(async () => {
      let key = this.getProjects
      if(key !== 'undefined'){
        console.log(key)
        await this.setCurrentProject(key[0])
        await this.setCurrentPath(key[0].key.path)
        await this.getProjectChildren()
      }
      
    })
    
  }
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

#icon-controls {
  position: fixed;
  right: 20px;
  user-select: none;
  bottom: 20px;
  z-index: 100;
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
</style>