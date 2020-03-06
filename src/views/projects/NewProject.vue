<template>
<div>

  <span id="title">Projects</span>

  <vx-card>
    <transition name="fade">
      <vs-button type="border" style="margin: 10px" @click="$router.push('/projects')" icon="arrow_back">Back</vs-button>
    </transition>
    
    <form-wizard
      class="new-project-form"
      id="FW"
      ref="form-wiz"
      color="rgba(var(--vs-primary), 1)"
      :title="null"
      :subtitle="null"
      finishButtonText="Submit"
      @on-complete="submitNewProject"
    >
      <tab-content title="Step 1" class="mb-5">
        <vs-row>
          <vs-col vs-w="3">
            <vs-card>
              <p>Marketplace </p>
            </vs-card>
          </vs-col>
          <vs-col vs-w="3" vs-offset="1">
            <vs-card>
              <p>Import </p>
            </vs-card>
          </vs-col>
          <vs-col vs-w="3" vs-offset="1">
            <vs-card>
              <p>New </p>
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
            v-model="newTitle"
            class="mt-5 w-full"
          />
          <span
            class="text-danger text-sm"
            v-show="errors.has('project title')"
          >{{ errors.first('project title') }}</span>
          <div id="switch">
            <h3>Privacy:</h3>
            <label v-if="newPrivate">Private (Only me and the people I invite)</label>
            <label v-else>Public (Viewable by anyone in my organization)</label>
            <vs-switch v-model="newPrivate" />
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
            v-model="newTitle"
            class="mt-5 w-full"
          />
          <span
            class="text-danger text-sm"
            v-show="errors.has('project title')"
          >{{ errors.first('project title') }}</span>
          <div id="switch">
            <h3>Privacy:</h3>
            <label v-if="newPrivate">Private (Only me and the people I invite)</label>
            <label v-else>Public (Viewable by anyone in my organization)</label>
            <vs-switch disabled="true" v-model="newPrivate" />
          </div>
          <div id="switch">
            <h3>Template</h3>
            <vs-input size="large" value="None"></vs-input>
          </div>
        </div>
      </tab-content>
    </form-wizard>
  </vx-card>

</div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
export default {
  data: () => ({
    newPrivate:false,
    newTitle:"",
  }),
  components:{
    FormWizard,
    TabContent
  },
  methods:{
    submitNewProject() {
      this.$validator.validateAll().then(result => {
        if (result) {
          
          // add POST action here

          
          this.$vs.notify({
            color:'success',
            title:'New Project',
            text:'The project was successfully added!'
          })

          this.$router.push('/projects')

        } 
        else{

          this.modal = false;
          this.$vs.notify({
            color:'warning',
            title:'Something Went Wrong',
            text:'Please try again.'
          })
        }
      });
    },
  }

}
</script>

<style scoped>
#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #707070;
}

</style>