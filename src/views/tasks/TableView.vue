<template>
<div>
  <div style="float:left;">
    <vs-button @click="handleBackEvent" type="border" icon="arrow_back" class="inline" ></vs-button>
    <TaskBreadcrumb :items="breadcrumbTitles" class="inline"  /> 
  </div>
  <div class="container_row">
    <div class="layer1">
      <div id="table" >
        <transition name="fade" >
          <div>
            
            <br>
            <vs-table
            @dblSelection="doubleSelection"
            @selected="handleSelected"
            v-model="selected"
            :data="data">

              <template slot="thead">
                <th v-for="item in headers">
                  {{item}}
                </th>
              </template>

              <template slot-scope="{data}">
                <vs-tr v-for="tr in activeData" :key ="tr.title" :data="tr" class="border_bottom" >
                  <vs-td>
                     <vs-checkbox v-model="currentMultiSelected" :vs-value="tr" @click="checkboxSelected = true"></vs-checkbox>
                  </vs-td>
                  <vs-td>
                    <span v-if="tr.title != null">{{tr.title}}</span>
                    <span v-else><i>Empty</i> </span>
                  </vs-td>
                  <vs-td>
                    <span v-if="tr.start_date != null">{{moment(tr.start_date)}}</span>
                    <span v-else><i>Empty</i></span>
                  </vs-td>
                  <vs-td>
                    <span v-if="tr.end_date!= null">{{moment(tr.end_date)}}</span>
                    <span v-else><i>Empty</i></span>
                  </vs-td>
                  <vs-td>
                    <span v-if="tr.status != null" :style="{color:statusColor(tr.status)}">{{tr.status}}</span>
                    <span v-else><i>Empty</i></span>
                  </vs-td>
                  <vs-td>
                    <span v-if="tr.owner != null">{{tr.owner.displayName}}</span>
                    <span v-else><i>Empty</i></span>
                  </vs-td>
                  <vs-td>
                    <vs-button @click="changeTask(tr)">Open </vs-button>
                  </vs-td>
        
                </vs-tr>
              </template>

            </vs-table>
          </div>

        </transition>
      </div>  
    </div>
    <div class="layer2">
      <Sidebar :task="selected" :active="active" v-on:closeSidebar="handleCloseSidebar"/>
      <MultiSelectControls />
    </div>
    <Controls id="icon-controls" :showControls="showControls"/>
  </div> 
</div>
</template>

<script>
import {mapActions,mapState, mapGetters} from 'vuex'
import Sidebar from './Sidebar'
import MultiSelectControls from './MutliselectControls'
import Controls from './Controls.vue'
import TaskBreadcrumb from './VuesaxBreadcrumb'
import moment from 'moment'
export default {
  components:{
    Sidebar,
    Controls,
    TaskBreadcrumb,
    MultiSelectControls
  },
  data: () => ({
    headers:['','Title','Start Date','End Date', 'Status', 'Owner', 'Actions'],
    active:false,
    allowActive:true,
    checkboxSelected:false
  }),

  watch:{
    selected(){
      this.setCurrentSelected(this.selected)
    },
    children:{
      deep:true,
      handler(){
        let pid = this.$route.params.pid
        let tid = this.currentTask.urlSafeKey

        console.log(tid)

        if(typeof(tid) == 'undefined'){
          this.$router.push('/tasks/' + pid)
        }
        else{
          this.$router.push('/tasks/' + pid + "/" + tid)
        }
      }
    }
  },
  props:{
    data:Array,
    showControls:Boolean
  },
   computed:{
     ...mapState('tasks', {
      currentProject: state => state.currentProject,
      breadcrumbTitles: state => state.breadcrumbTitles,
      children: state => state.children,
      currentTask: state => state.currentTask
    }),

    selected:{
      get(){
        return this.$store.state.tasks.currentSelected
      },
      set(value){
        this.setCurrentSelected(value)
      }
    },

    currentMultiSelected:{
      get(){
        return this.$store.state.tasks.currentMultiSelected
      },
      set(value){
        this.setCurrentMultiSelected(value)
      }
    },
    activeData(){
      return this.data.filter(el => el.archive == false)
    }

  },
  
  methods:{
    ...mapActions('tasks',[
      'getTaskChildren',
      'setCurrentTask',
      'appendToBreadcrumbTitles',
      'popBreadcrumbTitles',
      'setCurrentChildren',
      'getPreviousTask',
      'setCurrentSelected',
      'setSidebarActive'
    ]),

    async changeTask(tr){
      //Prevents selection sidebar from opening
      this.allowActive = false

      this.$store.commit('SET_CURRENT_MULTISELECTED',[]) // uncheck any rows that have been selected for mulitselect
      
      // Update breadcrumb
      let key = tr.key
      let crumb = {
        title:tr.title,
        key:tr.key,
        tr:tr
      }
      
      this.appendToBreadcrumbTitles(crumb)

      // Set current path and task to selected task
      await this.setCurrentTask(tr)

      // Fetch new children and update table data
      await this.getTaskChildren()

      this.allowActive = true
    
    },
    async handleBackEvent(){
      if(this.breadcrumbTitles.length > 1){
        this.popBreadcrumbTitles()
      }

      await this.getPreviousTask()
      
    },
    addCustomerHeaders(){
      if('custom_columns' in this.data[0] && this.data[0].custom_columns.length >= 1){ 
        for(key in this.data[0].custom_columns){
          this.headers.push(key)
        }
      }
    },
    handleSelected(tr){
      if(this.allowActive){ // prevents sidebar from opening on "Open" click
        if( ! this.checkboxSelected){ // prevents sidebar from opening on checkbox click
          this.setSidebarActive(true)
        }       
      }
    },
    setCurrentMultiSelected(value){
      this.$store.commit('tasks/SET_CURRENT_MULTISELECTED',value)
      this.checkboxSelected = false // allows sidebar to open once state is commited
    },
    handleCloseSidebar(){
      this.active = false
      this.selected = {}
    },
    moment (date) {
       return moment(date).format('MMMM Do YYYY')
    },
    statusColor(status){
      if(status == 'In Progress'){
        return '#ff9933'
      }
      else if(status == 'Complete'){
        return '#33cc00'
      }
      else{
        return '#626262'
      }

    }
  }

}
</script>

<style>
.container_row{
  display: grid;
  width: 100%;
}

.layer1, .layer2{
  grid-column: 1;
  grid-row: 1;
}

.breadcrumb{
  display: inline;
}

a:visited {
  color:rgba(0, 0, 0, 0.4);
}
.inline{
  float: right;
}
#table{
  padding-bottom:50px;
}


</style>