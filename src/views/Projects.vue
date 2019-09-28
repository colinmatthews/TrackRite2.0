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
             <img id="image-preview" width="70%" height="70%" src="@/assets/images/sample.png" />
            </div>

            <h2>{{ project.name }}</h2>
            <small id="description">Lorem ipsum dolor sit amet.</small>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>

    <form-wizard
      id="FW"
      v-if="modal"
      color="rgba(var(--vs-primary), 1)"
      title="Add new project"
      subtitle
      finishButtonText="Submit"
    >
      <tab-content title="Step 1" class="mb-5">
        <vs-row vs-justify="space-around" id="r">
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3">
            <vs-card fixedHeight>
              <img id="image-preview" width="70%" height="70%" src="@/assets/images/sample.png" />
              
              <div id="content">
                <h2>Marketplace</h2>
                <small id="description">Browse templates developed by Canada's leading healthcare organizations</small>
              </div>
              <template slot="footer">
                <vs-button size="small" type="border">View all</vs-button>
              </template>
           </vs-card>
          </vs-col>
                    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3">
            <vs-card fixedHeight>
              <img id="image-preview" width="70%" height="70%" src="@/assets/images/sample.png" />

              <div id="content">
                <h2>Import File</h2>  
                <small id="description">Browse templates developed by Canada's leading healthcare organizations</small>
              </div>
             
              <template slot="footer">
                <vs-button size="small" type="border">Upload</vs-button>
              </template>
            </vs-card>
          </vs-col>
                    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3">
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
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
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
  },
  methods: {
    addProject() {
      this.modal = true;
    }
  },
  components: {
    Card,
    FormWizard,
    TabContent
  }
};
</script>

<style scoped>
#FW {
  position: fixed;
  top: 50%;
  left: 57%;
  transform: translate(-50%, -50%);
  width: 70%;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  background: #ffffff;
}

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
  margin: 40px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

#projects-display {
  text-align: center;
}

#controls {
  position: absolute;
  top: 100%;
  line-height: 64px;
  height: 64px;
  user-select: none;
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
  user-select: none;
  background: #7367f0 0% 0% no-repeat padding-box;
  border-radius: 100%;
  color: white;
  font-size: 45px;
  vertical-align: middle;
}
</style>