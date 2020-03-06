<template>
  <div id="projects-page">

    <span id="title">Projects</span>

    <div id="projects-display">
      <vs-row id="r2">
        <vs-col
          id="u1"
          type="flex"
          vs-justify="center"
          vs-align="center"
          :vs-order="-1"
          vs-w="3"
          v-for="(project,index) in getProjects"
          :key="index"
          style="position: relative!important; z-index: -10!important;"
        >
          <vs-card fixedHeight id="card-project">
            <div id="delete-icon" @click="deleteConfirm(project.key.id)">
              <i class="material-icons">clear</i>
            </div>
            <div class="image">
              <img
                id="image-preview"
                v-on:click="popupDetails = project; popupActive = true"
                src="@/assets/images/sample.png"
              />
            </div>

            <h2 id="card-title">{{ project.title}}</h2>
            <small id="card-description">Lorem ipsum dolor sit amet.</small>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>


    <vs-popup title="Project details" v-if="popupDetails" :active.sync="popupActive">
      <template lang="html">
        <vs-tabs>
          <vs-tab label="Details" icon-pack="feather" icon="icon-home">
            <h5 class="my-3">{{ popupDetails.title }}</h5>
          </vs-tab>

          <vs-tab label="Access" icon-pack="feather" icon="icon-box"></vs-tab>

          <vs-tab label="History" icon-pack="feather" icon="icon-mail"></vs-tab>

          <vs-tab label="Marketplace" icon-pack="feather" icon="icon-briefcase">
            <h5>Publish to Marketplace</h5>
            
          </vs-tab>
        </vs-tabs>
      </template>
    </vs-popup>

    <div id="controls" @click="$router.push('/projects/new')">
      <vx-tooltip text="Add new project" position="left">
        <i class="material-icons add-new-project">add</i>
      </vx-tooltip>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase'
import {mapActions,mapState, mapGetters} from 'vuex'
export default {
  data: () => ({
    deleteID:null,
    popupActive: false,
    popupDetails: null,
  }),
  computed:{
    ...mapState('project', {
      allProjects: state => state.allProjects,
      projectsLoaded: state => state.projectsLoaded
    }),

    ...mapGetters('project',[
      'getProjects'
    ])

  },
  created() {
    let user = firebase.auth().currentUser;
    this.setToken(user)
    .then(() => {
      if(!this.projectsLoaded){
        this.initializePublicProjectKeys()
        this.initializePrivateProjectKeys()
        this.initializePublicProjectContents()
        this.initializePrivateProjectContents()
      } 
    })
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

    deleteConfirm(id){
      this.deleteID = id
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to delete this project? This action cannot be reversed.',
        accept:this.deleteAlert
      })
    },

    deleteAlert(){
      //this.removeProject(this.deleteID)
      this.$vs.notify({
        color:'danger',
        title:'Deleted',
        text:'The project was successfully deleted'
      })
    },
    removeProject() {
      // DELETE REQUEST GOES HERE
      // this.$http.delete('/p/' + id).then(x => {
      //   console.log(x.data);

      // })
      // .catch(e => {
      //   console.log(e);
      //   return;
      // });

      this.projects.splice(
        this.projects.map(x => x.id).indexOf(this.removalProject.id),
        1
      );
    },
  
  }
};
</script>

<style scoped>
#card-project {
  z-index: -1;
}

#switch {
  margin-top: 50px;
  margin-bottom: 50px;
}

#switch > * {
  margin-top: 20px;
}

#u1 {
  margin-top: 10px;
  margin-bottom: 10px;
}

#r {
  text-align: center;
}

#r2 {
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;
  z-index: -1;
}

#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #707070;
}

#projects {
  margin-top: 30px;
}

#image-preview {
  width: 50%;
  height: 30%;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

#card-title {
  font-size: 14px!Important;
}

#projects-display {
  text-align: center;
  position: relative;
  z-index: 999;
}

#controls {
  position: fixed;
  bottom: 20px;
  right: 20px;
  user-select: none;
}
.wizard-header {
  padding: 0px!Important;
}
#add {
  font-size: 20px;
  font-family: "Segoe UI", sans-serif;
  vertical-align: middle;
  margin: 10px;
}

#content {
  margin: 20px;
}

.add-new-project {
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(121, 9, 111, 1) 100%,
    rgba(0, 212, 255, 1) 100%
  );
  user-select: none;
  border-radius: 100%;
  color: white;
  padding: 8px;
  margin: 4px;
  font-size: 24px;
  font-weight: bold;
}

.add-new-project:hover {
  cursor: pointer;
}

#delete-icon {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 100;
  cursor: pointer;
}

.submit-button {
  position: absolute;
  width: 200px;
  bottom: 0px;
}

#delete-icon > i {
  font-size: 20px;
}
</style>