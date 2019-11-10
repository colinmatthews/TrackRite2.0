<template>
  <div id="projects-page">
    <div id="controls" @click="addProject">
      <vx-tooltip text="Add new project" position="left">
        <i class="material-icons add-new-project">add</i>
      </vx-tooltip>
    </div>

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
          v-for="(project,index) in projects"
          :key="project.id"
          style="position: relative!important; z-index: -10!important;"
        >
          <vs-card fixedHeight id="card-project">
            <div id="delete-icon" @click="removalProject = project; removePopup = true">
              <i class="material-icons">clear</i>
            </div>
            <div class="image">
              <img
                id="image-preview"
                v-on:click="popupDetails = projects[index]; popupActive = true"
                src="@/assets/images/sample.png"
              />
            </div>

            <h2 id="card-title">{{ project.project_title}}</h2>
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
            <vs-input
              size="large"
              v-validate="'required|alpha'"
              name="project title"
              v-model="newProjectTitle"
              class="mt-5 w-full"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('project title')"
            >{{ errors.first('project title') }}</span>
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
            <vs-input
              disabled="true"
              size="large"
              v-validate="'required|alpha'"
              name="project title"
              v-model="newProjectTitle"
              class="mt-5 w-full"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('project title')"
            >{{ errors.first('project title') }}</span>
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

    <vs-popup title="Confirm" v-if="removalProject" :active.sync="removePopup">
      <template lang="html">
        <h2 style="text-align: center; margin: 30px;">
          You are about to delete
          <span class="text-primary">{{ removalProject.project_title }}</span>
          <br />This cannot be reversed. Are you sure you want to do this?
        </h2>
        <div class="flex" style="justify-content: center;">
          <vs-button
            type="filled"
            color="danger"
            @click="removePopup = false; removeProject()"
          >Delete</vs-button>
        </div>
      </template>
    </vs-popup>

    <vs-popup title="Confirm" v-if="errorModal" :active.sync="errorModal">
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
            <h5 class="my-3">{{ popupDetails.project_title }}</h5>
          </vs-tab>

          <vs-tab label="Access" icon-pack="feather" icon="icon-box"></vs-tab>

          <vs-tab label="History" icon-pack="feather" icon="icon-mail"></vs-tab>

          <vs-tab label="Marketplace" icon-pack="feather" icon="icon-briefcase">
            <h5>Publish to Marketplace</h5>
            <div class="flex">
              <div style="position: relative">
                <div>
                  <vs-input
                    :disabled="!marketplace.publish"
                    placeholder="Description"
                    class="my-3"
                    v-model="marketplace.description"
                  ></vs-input>

                  <vs-input
                    :disabled="!marketplace.publish"
                    placeholder="By"
                    v-model="marketplace.by"
                  ></vs-input>
                  <vs-checkbox class="mx-0 my-3" v-model="marketplace.publish">Publish</vs-checkbox>
                </div>
                <div class="flex mt-3 submit-button">
                  <vs-button
                    :disabled="!(marketplace.by && marketplace.description)"
                    type="border"
                    style="width: 100%"
                    color="primary"
                    @click="submitMarketplaceObject"
                  >Submit</vs-button>
                </div>
              </div>
              <div style="height: 200px; width: 100%;">
                <transition name="fade">
                  <vs-upload
                    action="http://localhost:5000/s"
                    v-show="marketplace.publish"
                    :singleUpload="true"
                    limit="1"
                    class="p-0"
                    text="Thumbnail image"
                    ref="thumbnail"
                    :fileName="popupDetails.id"
                    @on-success="marketplacePost.image_url = '/images/' + popupDetails.id"
                  ></vs-upload>
                </transition>
              </div>
            </div>
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
    newProjectTitle: "",
    marketplace: {
      done: false,
      publish: false,
      description: null,
      by: null,
      thumbnail: null
    },
    marketplacePost: {
      id: null,
      title: null,
      desc: null,
      by: null,
      image_url: null,
      project_details: {}
    },
    removalProject: null,
    errorModal: false,
    successModal: false,
    removePopup: false,
    newProjectPrivate: false,
    popupActive: false,
    popupDetails: null,
    projects: null,
    modal: false
  }),

  created() {
    this.$http.get("/p").then(res => {
      this.projects = res.data;
      this.display = true;
    });
    if (this.$route.query.action == "new-project") {
      this.addProject();
      setTimeout(() => {
        if (this.$route.query.step) {
          for (let i = 0; i < this.$route.query.step - 1; i++) {
            this.$refs["form-wiz"].nextTab();
          }
        }
      }, 100);
    }
  },
  methods: {
    submitMarketplaceObject() {
      this.marketplace.done = true;
      this.marketplacePost.project_details = this.marketplace;
      this.marketplacePost.by = this.marketplace.by;
      this.marketplacePost.title = this.popupDetails.project_title;
      this.marketplacePost.desc = "Lorem ipsum dolor sit amet.";
      this.marketplacePost.id = "m" + Math.floor(Math.random() * 100000);
      this.marketplacePost.project_details.thumbnail = this.marketplacePost.image_url;
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
    submitNewProject() {
      this.$validator.validateAll().then(result => {
        if (result) {
          let id = Math.floor(Math.random() * Math.floor(100000)).toString();
          this.$http
            .post("/p", { id: id, project_title: this.newProjectTitle })
            .then(function(response) {
              // handle success
              console.log(response);
            })
            .catch(function(error) {
              // handle error
              console.log(error);
            });

          this.projects.unshift({
            project_title: this.newProjectTitle,
            private: this.newProjectPrivate
          });
          this.modal = false;
          this.successModal = true;
          this.newProjectPrivate = false;
          this.newProjectTitle = "";
        } else {
          this.modal = false;
          this.errorModal = true;
        }
      });
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