<template>
  <div id="projects-page">
    <div id="controls" @click="addProject">
      <i class="material-icons">add</i>
      <span id="add">Add new project</span>
    </div>

    <span id="title">Projects</span>

    <div id="projects-display">
      <vs-row id="r2">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="4"
          v-for="project in projects"
          :key="project.id"
        >
          <vs-card fixedHeight>
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
        color="rgba(var(--vs-primary), 1)"
        :title="null"
        :subtitle="null"
        finishButtonText="Submit"
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
          <h2>Second</h2>
        </tab-content>

        <tab-content title="Step 3" class="mb-5">
          <h3>Third</h3>
        </tab-content>
      </form-wizard>
    </vs-popup>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  data: () => ({
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
    }
  },
  methods: {
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
#r {
  text-align: center;
}

#r2 {
  margin-top: 30px;
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
  top: 88%;
  line-height: 64px;
  height: 64px;
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
  font-size: 45px;
  vertical-align: middle;
}

.material-icons:hover {
  cursor: pointer;
}
</style>