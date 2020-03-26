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
            v-model="selected"
            @selected="handleSelected"
            @dblSelection="doubleSelection"
            :data="data">

              <template slot="thead">
                <th v-for="item in headers">
                  {{item}}
                </th>
              </template>

              <template slot-scope="{data}">
                <vs-tr v-for="tr in activeData" :key ="tr.title" :data="tr" class="border_bottom">
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
    </div>
    <Controls id="icon-controls" :showControls="showControls"/>
  </div> 
</div>
</template>

<script>
import {mapActions,mapState, mapGetters} from 'vuex'
import Sidebar from './Sidebar'
import Controls from './Controls.vue'
import TaskBreadcrumb from './VuesaxBreadcrumb'
import moment from 'moment'
export default {
  components:{
    Sidebar,
    Controls,
    TaskBreadcrumb
  },
  data: () => ({
    headers:['Title','Start Date','End Date', 'Status', 'Owner', 'Actions'],
    active:false,
    allowActive:true,
  }),

  watch:{
    selected(){
      this.setCurrentSelected(this.selected)
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
    }),

    selected:{
      get(){
        return this.$store.state.tasks.currentSelected
      },
      set(value){
        this.setCurrentSelected(value)
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
      await this.getTaskChildren(key)

      this.allowActive = true
    
    },
    handleBackEvent(){
      if(this.breadcrumbTitles.length > 1){
        this.popBreadcrumbTitles()
      }

      this.getPreviousTask()
    },
    addCustomerHeaders(){
      if('custom_columns' in this.data[0] && this.data[0].custom_columns.length >= 1){ 
        for(key in this.data[0].custom_columns){
          this.headers.push(key)
        }
      }
    },
    handleSelected(tr){
      if(this.allowActive){
        this.setSidebarActive(true)
      }
      
    },
    doubleSelection(tr){
       console.log(tr)
      this.$vs.notify({
        title:`Double clicked ${tr.title}`,
        color: 'success'
      })
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


</style>