<template>
<transition name="fade" >
  <div id="icon-controls" v-if="showControls">
          <vx-tooltip text="Add a new task" position="left">
            <i key="2" class="material-icons" id="add-icon" @click="addTask()">add</i>
          </vx-tooltip>
    </div>
</transition>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  props:{
    showControls:Boolean
  },
  computed:{
   ...mapState('tasks', {
      currentTask: state => state.currentTask,
    }),
  },
  methods:{
   ...mapActions('auth',[
      'setToken'
    ]),

    ...mapActions('tasks',[
      'submitNewTask',
    ]),
   addTask(){
    let user = firebase.auth().currentUser;
    let users = this.currentTask.users;

    if(users == null){
      users = [user.uid]
    }
    else if(! users.includes(user.uid)){
      users.push(user.uid)
    }

    this.setToken(user)
    .then(() => {
      this.submitNewTask({
        end_date:null,
        start_date:null,
        title:null,
        users:users,
        status:null,
        custom_columns:{},
        details:null,
        owner:null,
        archive:false
      })
    })
   }
  }
}
</script>

<style>
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

#icon-controls {
  position: absolute;
  right: 20px;
  user-select: none;
  bottom: 20px;
  z-index: 100;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>