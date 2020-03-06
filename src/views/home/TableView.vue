<template>
  <div id="table" >
    <transition name="fade" >
      <vs-table
      :data="data">

        <template slot="thead">
          <th v-for="item in headers" v-bind:key="item.key">
            {{item}}
          </th>
        </template>

        <template :slot-scope="data">
          <vs-tr v-for="tr in data" :key ="tr.key">
            <vs-td>
              {{tr.title}}
            </vs-td>
            <vs-td>
              {{tr.start_date}}
            </vs-td>
            <vs-td>
              {{tr.end_date}}
            </vs-td>
            <vs-td>
              {{tr.status}}
            </vs-td>
            <vs-td>
              {{tr.users}}
            </vs-td>
            <vs-td>
              <vs-button @click="changeTask(tr)">Open </vs-button>
            </vs-td>
  
          </vs-tr>
        </template>

      </vs-table>

    </transition>
  </div>
</template>

<script>
import {mapActions,mapState, mapGetters} from 'vuex'
export default {
  data: () => ({
    headers:['Title','Start Date','End Date', 'Status', 'Users', 'Actions']
  }),
  props:{
    data:Array
  },
   computed:{
     ...mapState('tasks', {
      currentProject: state => state.currentProject,
      currentPath: state => state.currentPath,
      breadcrumbTitles: state => state.breadcrumbTitles,
      children: state => state.children
    }),

  },
  methods:{
    ...mapActions('tasks',[
      'getTaskChildren',
      'setCurrentPath',
      'setCurrentTask',
      'appendToBreadcrumbTitles',
      'popBreadcrumbTitles',
      'setCurrentChildren'
    ]),

    async changeTask(tr){
      console.log(tr)

      // Update breadcrumb
      let key = tr.key
      this.appendToBreadcrumbTitles(tr.title)

      // Set current path and task to selected task
      await this.setCurrentPath(tr.key.path)
      await this.setCurrentTask(tr)

      // Fetch new children and update table data
      await this.getTaskChildren(key)
    
    },
    addTask(tr){

    },
    deleteTask(tr){

    },
    updateTask(tr){

    },
    popTask(tr){

    },
    addCustomerHeaders(){
      if('custom_columns' in this.data[0] && this.data[0].custom_columns.length >= 1){ 
        for(key in this.data[0].custom_columns){
          this.headers.push(key)
        }
      }
    },
  }

}
</script>

<style>

</style>