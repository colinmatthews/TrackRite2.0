<template>
<div>
  <vs-popup   title="Managed Archived" :active.sync="popupActive">
      <vs-button @click="deleteConfirm()" color="danger" >Delete</vs-button>
      <vs-button @click="handleRestoreTasks()" style="float:right;" color="success">Restore</vs-button>


      <vs-table
      style="padding-top:15px;"
      multiple
      v-model="selected"
      :data="archivedTasks"
      pagination
      >
      <template slot="header">
        
      </template>
      <template slot="thead">
        <vs-th>
          Title
        </vs-th>
        <vs-th>
          Owner
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr v-for="(tr,index) in archivedTasks" :key ="tr.key.id" :data="tr" >
          <vs-td :data="archivedTasks[index].title">
            {{tr.title}}
          </vs-td>

          <vs-td :data="tr.owner">
            <p v-if="tr.hasOwnProperty('owner')">{{tr.owner.displayName}}</p>
            <p v-else><i>Empty</i></p>
          </vs-td>

        </vs-tr>
      </template>
    </vs-table>
    </vs-popup>
</div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  props:{
    
  },
  data(){
    return{
      popupActive:false,
      selected:[],
    }
  },
  computed:{
  ...mapState('tasks', {
      archivedTasks: state => state.archivedTasks
    }),
  },
  methods:{
    ...mapActions('tasks',[
      'getArchivedTasks',
      'deleteTasks',
      'restoreTasks'
    ]),
     ...mapActions('auth',[
      'setToken',
     ]),
    handleDeleteTasks(){
      this.showConfirm = false
      this.popupActive = false
      if(this.selected.length > 0) {
        this.deleteTasks(this.selected)
      }
      this.selected = []

    },
    handleRestoreTasks(){
      this.showConfirm = false
      this.popupActive = false
      if(this.selected.length > 0) {
        this.restoreTasks(this.selected)
      }
      this.selected = []
    },

    deleteConfirm(){
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Deleting a task also deletes all tasks underneath it. Are you sure you want to proceed?',
        accept:this.handleDeleteTasks
      })
    },

    openPopup(){
      this.showConfirm = false
      this.selected = []
      this.popupActive = true
    },
    
  },
  watch:{
    popupActive(){
      if(this.popupActive){
        let user = firebase.auth().currentUser;
        this.setToken(user).then(async () => {
          this.getArchivedTasks()
        })
      }
    }, 
  }
}
</script>

<style>
.con-vs-dialog{
  z-index: 54000 !important;
}
</style>