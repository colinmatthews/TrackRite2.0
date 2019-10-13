<template>
  <div id="projects-page">
    <div id="controls" @click="addProject">
      <vx-tooltip text="Add new project" position="left">
        <i class="material-icons">add</i>
      </vx-tooltip>
    </div>

    <span id="title">Projects</span>

    <div id="projects-display">
      <vs-row id="r2" >
        <vs-col 
          id="u1"
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="3"
          v-for="(project,index) in projects"
          v-on:click.native="popupDetails = projects[index]; popupActive = true"
          :key="project.id"
        >
          <vs-card 
          fixedHeight id="card-project">
            <div class="image">
              <img id="image-preview" src="@/assets/images/sample.png" />
            </div>

            <h2 id="card-title">{{ project.name }}</h2>
            <small id="card-description">Lorem ipsum dolor sit amet.</small>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>

    <vs-popup title="Add a new project" fullscreen :active.sync="modal">
      <form-wizard
        id="FW"
        ref="form-wiz"
        color="rgba(var(--vs-primary), 1)"
        :title="null"
        :subtitle="null"
        finishButtonText="Submit"
        @on-complete="submitNewProject"
      >
        <tab-content title="Step 1" class="mb-5">
          <vs-row vs-justify="space-around" id="r">
            <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="4">
              <vs-card fixedHeight>
                <img id="image-preview" src="@/assets/images/sample.png" />

                <div id="content">
                  <h2>Marketplace</h2>
                  <small
                    id="description"
                  >Browse templates developed by Canada's leading healthcare organizations</small>
                </div>
                <template slot="footer">
                  <vs-button size="small" type="border">View all</vs-button>
                </template>
              </vs-card>
            </vs-col>
            <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="4">
              <vs-card fixedHeight>
                <img id="image-preview" width="40%" height="40%" src="@/assets/images/sample.png" />

                <div id="content">
                  <h2>Import File</h2>
                  <small
                    id="description"
                  >Browse templates developed by Canada's leading healthcare organizations</small>
                </div>

                <template slot="footer">
                  <vs-button size="small" type="border">Upload</vs-button>
                </template>
              </vs-card>
            </vs-col>
            <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="4">
              <vs-card fixedHeight>
                <img id="image-preview" width="70%" height="70%" src="@/assets/images/sample.png" />
                <div id="content">
                  <h2>New project</h2>
                  <small id="description">Create a new project from scratch</small>
                </div>
              </vs-card>
            </vs-col>
          </vs-row>
        </tab-content>

        <tab-content title="Step 2" class="mb-5">
          <div id="info-form">
                <h3>Project Title:</h3>
                <vs-input size="large" v-validate="'required|alpha'" name="project title" v-model="newProjectTitle" class="mt-5 w-full" />
                <span class="text-danger text-sm" v-show="errors.has('project title')">{{ errors.first('project title') }}</span>
                <div id="switch">
                  <h3>Privacy:</h3>
                  <label v-if="newProjectPrivate">Private (Only me and the people I invite)</label>
                  <label v-else>Public (Viewable by anyone in my organization)</label>
                  <vs-switch v-model="newProjectPrivate" />
                </div>
          </div>
        </tab-content>

        <tab-content title="Step 3" class="mb-5">
           <div id="info-form">
                <h3>Project Title:</h3>
                <vs-input disabled="true" size="large" v-validate="'required|alpha'" name="project title" v-model="newProjectTitle" class="mt-5 w-full" />
                <span class="text-danger text-sm" v-show="errors.has('project title')">{{ errors.first('project title') }}</span>
                <div id="switch">
                  <h3>Privacy:</h3>
                  <label v-if="newProjectPrivate">Private (Only me and the people I invite)</label>
                  <label v-else>Public (Viewable by anyone in my organization)</label>
                  <vs-switch disabled="true" v-model="newProjectPrivate" />
                </div>
                <div id="switch">
                  <h3>Template</h3>
                  <vs-input size="large" value="None"></vs-input>
                </div>
          </div>
        </tab-content>
      </form-wizard>
    </vs-popup>


    <vs-popup title="Error" v-if="errorModal" :active.sync="errorModal">
      <template lang="html">
        <h1 style="text-align: center; margin: 30px;">Unable to validate the fields.</h1>
    </template>
    </vs-popup>

    <vs-popup title="Success" v-if="successModal" :active.sync="successModal">
      <template lang="html">
        <h1 style="text-align: center; margin: 30px;">Project successfully added.</h1>
    </template>
    </vs-popup>

    <vs-popup title="Project details" v-if="popupDetails" :active.sync="popupActive">
      <template lang="html">
      <vs-tabs>
        <vs-tab label="Details" icon-pack="feather" icon="icon-home">
          <h1>{{ popupDetails.name }}</h1>
        </vs-tab>
       
        <vs-tab label="Access" icon-pack="feather" icon="icon-box">
        </vs-tab>
       
        <vs-tab label="History" icon-pack="feather" icon="icon-mail">
        </vs-tab>
      </vs-tabs>
    </template>
    </vs-popup>

  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
export default {
  data: () => ({
    newProjectTitle: '',
    errorModal: false,
    successModal: false,
    newProjectPrivate: false,
    popupActive: false,
    popupDetails: null,
    projects: null,
    modal: false
  }),

  created() {
    this.$http.get("/p").then(res => {
      this.projects = res.data.projects;
      this.display = true;
    });
    if (this.$route.query.action == "new-project") {
      this.addProject();
      setTimeout(() => {
        if (this.$route.query.step) {
          for(let i = 0; i < this.$route.query.step-1; i++) {
            this.$refs['form-wiz'].nextTab();
          }
        }
      },100)
    }
  },
  methods: {
    test(e) {
      console.log(e);
    },
    submitNewProject() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.projects.unshift({name: this.newProjectTitle, private: this.newProjectPrivate });
          this.modal = false;
          this.successModal = true;
          this.newProjectPrivate = false;
          this.newProjectTitle = '';
        } else {
          this.modal = false;
          this.errorModal = true;
        }
      })
    },
    addProject() {
      this.modal = true;
    }
  },
  components: {
    FormWizard,
    TabContent
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
}

#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: #707070;
}

#projects {
  margin-top: 30px;
}

#image-preview {
  width: 50%;
  height: 30%;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

#card-title {
  font-size: 14px!Important;
}

#projects-display {
  text-align: center;
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

.material-icons {
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

.material-icons:hover {
  cursor: pointer;
}
</style>