<template>
  <div id="home">
    <div id="icon-controls" @mouseenter="icons = true" @mouseleave="icons = false">
      <transition name="fade" key="1" mode="out-in">
        <div id="expanded" v-if="icons">
          <vx-tooltip text="Add a new project" position="left">
            <i id="add-icon" @click="addProject" class="material-icons">folder</i>
          </vx-tooltip>

          <vx-tooltip text="Add a new task" position="left">
            <i id="add-icon" @click="addTask" class="material-icons">insert_drive_file</i>
          </vx-tooltip>
        </div>
        <i v-if="!icons" key="2" class="material-icons" id="add-icon">add</i>
      </transition>
    </div>
    <div id="controls">
      <vs-button
        color="primary"
        @click="panelSwitcher = 2"
        type="border"
        :class="{ 'bg-primary': panelSwitcher == 2 }"
        icon="pie_chart"
      >Dashboard</vs-button>

      <vs-button
        ref="first-button"
        color="primary"
        @click="panelSwitcher = 1"
        type="border"
        :class="{ 'bg-primary': panelSwitcher == 1 }"
        icon="list"
      >List</vs-button>

      <vs-button
        color="primary"
        @click="panelSwitcher = 0"
        type="border"
        ref="first-btn"
        :class="{ 'bg-primary':  panelSwitcher == 0 }"
        icon="grid_on"
      >Table</vs-button>
    </div>

    <transition name="fade" mode="out-in" key="1">
      
      <!-- TABLE VIEW -->
      <div id="table" v-if="panelSwitcher === 0">
        <span id="title">{{ data.project_title }}</span>
        <transition name="fade">
          <vs-button
            type="border"
            style="margin: 10px"
            @click="push(breadcrumb[breadcrumb.length-2].query)"
            v-if="breadcrumb.length > 1"
            icon="arrow_back"
          >Back</vs-button>
        </transition>
        <div id="navigation">
          <vs-breadcrumb id="breadcrumb" ref="breadcrumb">
            <li
              v-for="(item,i) in breadcrumb"
              :key="i"
              @click="push(item.query)"
              :class="{ 'active': i == breadcrumb.length-1 }"
            >
              {{ item.title }}
              <span
                v-if="i != breadcrumb.length - 1"
                class="vs-breadcrum--separator"
              >/</span>
            </li>
          </vs-breadcrumb>
        </div>

        <transition name="fade">
          <vs-table ref="table" v-if="table" :data="display">
            <template slot="thead">
              <vs-th>Name</vs-th>
              <vs-th>Due Date</vs-th>
              <vs-th>Assignee</vs-th>
              <vs-th>Status</vs-th>
              <vs-th>Type</vs-th>
              <vs-th>Controls</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr :key="index" v-for="(tr, index) in data" :data="tr">
                <vs-td :data="tr.name">
                  {{ tr.name }}
                  <template slot="edit">
                    <div id="edit-row">
                      <vs-input ref="name" v-model="data[index].name" />
                      <flat-pickr
                        ref="date"
                        :config="{ dateFormat: 'm/d/Y'}"
                        v-model="data[index].start_date"
                      />
                      <vs-input ref="as-name" v-model="data[index].assignees[0].name"></vs-input>
                      <vs-select v-model="data[index].status">
                        <vs-select-item value="Complete" text="Complete" />
                        <vs-select-item value="In progress" text="In progress" />
                        <vs-select-item value="Not Started" text="Not Started" />
                      </vs-select>
                      <vs-input ref="type" v-model="tr.type" />
                    </div>
                  </template>
                </vs-td>

                <vs-td :data="data[index].start_date">
                  {{data[index].start_date }}
                  <template slot="edit">
                    <div id="edit-row">
                      <vs-input ref="name" v-model="data[index].name" />
                      <flat-pickr
                        ref="date"
                        :config="{ dateFormat: 'm/d/Y'}"
                        v-model="data[index].start_date"
                      />
                      <vs-input ref="as-name" v-model="data[index].assignees[0].name"></vs-input>
                      <vs-select v-model="data[index].status">
                        <vs-select-item value="Complete" text="Complete" />
                        <vs-select-item value="In progress" text="In progress" />
                        <vs-select-item value="Not Started" text="Not Started" />
                      </vs-select>
                      <vs-input ref="type" v-model="tr.type" />
                    </div>
                  </template>
                </vs-td>

                <vs-td :data="data[index].assignees[0].name">
                  <vx-tooltip :text="tr.assignees[0].name" position="left">
                    <vs-avatar
                      :text="tr.assignees[0].name"
                      :src="require('@/assets/images/portrait/small/avatar-s-11.png')"
                    />
                  </vx-tooltip>
                  <template slot="edit">
                    <div id="edit-row">
                      <vs-input ref="name" v-model="data[index].name" />
                      <flat-pickr
                        ref="date"
                        :config="{ dateFormat: 'm/d/Y'}"
                        v-model="data[index].start_date"
                      />
                      <vs-input ref="as-name" v-model="data[index].assignees[0].name"></vs-input>
                      <vs-select v-model="data[index].status">
                        <vs-select-item value="Complete" text="Complete" />
                        <vs-select-item value="In progress" text="In progress" />
                        <vs-select-item value="Not Started" text="Not Started" />
                      </vs-select>
                      <vs-input ref="type" v-model="tr.type" />
                    </div>
                  </template>
                </vs-td>

                <vs-td :data="data[index].status">
                  <span
                    :class="{ 'text-success': data[index].status == 'Complete',
                'text-warning': data[index].status == 'In progress'
                }"
                  >{{data[index].status}}</span>
                  <template slot="edit">
                    <div id="edit-row">
                      <vs-input ref="name" v-model="data[index].name" />
                      <flat-pickr
                        ref="date"
                        :config="{ dateFormat: 'm/d/Y'}"
                        v-model="data[index].start_date"
                      />
                      <vs-input ref="as-name" v-model="data[index].assignees[0].name"></vs-input>
                      <vs-select v-model="data[index].status">
                        <vs-select-item value="Complete" text="Complete" />
                        <vs-select-item value="In progress" text="In progress" />
                        <vs-select-item value="Not Started" text="Not Started" />
                      </vs-select>
                      <vs-input ref="type" v-model="tr.type" />
                    </div>
                  </template>
                </vs-td>

                <vs-td :data="data[index].type">
                  {{data[index].type}}
                  <template slot="edit">
                    <div id="edit-row">
                      <vs-input ref="name" v-model="data[index].name" />
                      <flat-pickr
                        ref="date"
                        :config="{ dateFormat: 'm/d/Y'}"
                        v-model="data[index].start_date"
                      />
                      <vs-input ref="as-name" v-model="data[index].assignees[0].name"></vs-input>
                      <vs-select v-model="data[index].status">
                        <vs-select-item value="Complete" text="Complete" />
                        <vs-select-item value="In progress" text="In progress" />
                        <vs-select-item value="Not Started" text="Not Started" />
                      </vs-select>
                      <vs-input ref="type" v-model="tr.type" />
                    </div>
                  </template>
                </vs-td>

                <template slot="expand">
                  <div id="description" v-if="data[index].details">
                    <strong>Guidelines:</strong>
                    <br />
                    <span>{{ data[index].details }}</span>
                  </div>
                  <span v-else>Not availale</span>
                </template>

                <vs-td>
                  <vs-button @click="handleSelected(data[index])">Expand</vs-button>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </transition>
      </div>

      <!-- LIST VIEW -->
      <div id="list" v-else-if="panelSwitcher === 1" key="2">
        <span id="title">{{ data.project_title }}</span>
        <div id="navigation">
          <vs-breadcrumb id="breadcrumb" ref="breadcrumb">
            <li
              v-for="(item,i) in breadcrumb"
              :key="i"
              @click="push(item.query)"
              :class="{ 'active': i == breadcrumb.length-1 }"
            >
              {{ item.title }}
              <span
                v-if="i != breadcrumb.length - 1"
                class="vs-breadcrum--separator"
              >/</span>
            </li>
          </vs-breadcrumb>
        </div>
        <vs-table ref="table" v-if="table" :data="display">
          <template slot="thead">
            <vs-th>Name</vs-th>
            <vs-th>Due Date</vs-th>
            <vs-th>Assignee</vs-th>
            <vs-th>Status</vs-th>
            <vs-th>Type</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="index" v-for="(tr, index) in data" :data="tr">
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>

              <vs-td :data="data[index].start_date">{{data[index].start_date }}</vs-td>

              <vs-td :data="data[index].assignees[0].name">
                <vx-tooltip :text="tr.assignees[0].name" position="left">
                  <vs-avatar
                    :text="tr.assignees[0].name"
                    :src="require('@/assets/images/portrait/small/avatar-s-11.png')"
                  />
                </vx-tooltip>
              </vs-td>

              <vs-td :data="data[index].status">
                <span
                  :class="{ 'text-success': data[index].status == 'Complete', 'text-warning': data[index].status == 'In progress'}"
                >{{data[index].status}}</span>
              </vs-td>

              <vs-td :data="data[index].type">{{data[index].type}}</vs-td>
              <!-- EXPAND SLOT -->
              <template slot="expand">
                <vs-table :data="data[index].children" id="t1">
                  <template slot-scope="{data}">
                    <vs-tr :key="index" v-for="(tr, index) in data" :data="tr">
                      <vs-td :data="tr.name">{{ tr.name }}</vs-td>

                      <vs-td :data="data[index].start_date">{{data[index].start_date }}</vs-td>

                      <vs-td :data="data[index].assignees[0].name">
                        <vx-tooltip :text="tr.assignees[0].name" position="left">
                          <vs-avatar
                            :text="tr.assignees[0].name"
                            :src="require('@/assets/images/portrait/small/avatar-s-11.png')"
                          />
                        </vx-tooltip>
                      </vs-td>

                      <vs-td :data="data[index].status">
                        <span
                          :class="{ 'text-success': data[index].status == 'Complete', 'text-warning': data[index].status == 'In progress'}"
                        >{{data[index].status}}</span>
                      </vs-td>

                      <vs-td :data="data[index].type">{{data[index].type}}</vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </template>
            </vs-tr>
          </template>
        </vs-table>
      </div>

      <!-- DASHBOARD -->
      <div id="dashboard" v-else key="3">
        <span id="title">{{ data.project_title }}</span> 
         <div id="navigation">
          <vs-breadcrumb id="breadcrumb" ref="breadcrumb">
            <li
              v-for="(item,i) in breadcrumb"
              :key="i"
              @click="push(item.query)"
              :class="{ 'active': i == breadcrumb.length-1 }"
            >
              {{ item.title }}
              <span
                v-if="i != breadcrumb.length - 1"
                class="vs-breadcrum--separator"
              >/</span>
            </li>
          </vs-breadcrumb>
        </div>
            
        <div id="charts-block">
          
        </div>
      </div>

    </transition>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  components: {
    flatPickr
  },
  data: () => ({
    breadcrumb: [],
    data: [],
    display: [],
    table: true,
    panelSwitcher: 2,
    projectId: 0,
    taskId: 0,
    icons: false,
    pieTest: {
      options: {
        colors: ['#7367F0', "#CFC357", "#F2135D"],
        labels: ['Completed', 'In Progress', 'Not Started'],
        legend: {
          position: 'bottom'
        }
      },
      series: [60,35,15]
    }
  }),
  methods: {
    
    addTask() {
      let obj = JSON.parse(JSON.stringify(this.display[0]));
      obj.name = "Name";
      obj.details = null;
      this.display.unshift(obj);
    },
    addProject() {
      this.$router.push("/projects?action=new-project");
    },
    test(data) {
      console.log(data);
    },
    handleSelected(tr) {
      if (this.taskId)
        this.$router.push(
          `/?project=${this.projectId}&task=${this.taskId}-${
            tr.id.toString()[0]
          }`
        );
      else
        this.$router.push(
          `/?project=${this.projectId}&task=${tr.id.toString()[0]}`
        );
    },
    setFocus(inputName) {
      console.log(inputName);
      this.$refs[inputName].$el.querySelector("input").focus();
    },
    push(p) {
      this.$router.push(p);
    },
    updateTable() {
      this.projectId = this.$route.query.project;
      this.taskId = this.$route.query.task;

      this.display = this.data.children;

      this.breadcrumb = [
        { title: "Home", query: `/?project=${this.projectId}` }
      ];

      if (this.taskId) {
        let taskLine = "";
        this.taskId.split("-").forEach((x, i) => {
          taskLine += x + "-";

          this.breadcrumb.push({
            title: this.display[x - 0 - 1].name,
            query: `/?project=${this.projectId}&task=${taskLine}`.slice(0, -1)
          });

          this.display = this.display[x - 0 - 1].children;
        });
      }

      if (this.breadcrumb.length > 4) {
        this.breadcrumb = this.breadcrumb.slice(-4);
        this.breadcrumb[0].title = "..." + this.breadcrumb[0].title;
      }
    }
  },
  watch: {
    $route(n) {
      this.table = false;
      setTimeout(() => (this.table = true), 100);

      if (n.query.project != this.projectId) {
        this.$http.get(`/p/${this.$route.query.project}`).then(res => {
          this.data = res.data;
          this.updateTable();
        });
      } else {
        this.updateTable();
      }
    }
  },
  mounted() {
  },
  created() {
    if (!this.$route.query.project) {
      this.$router.push({ query: { project: "1" } });
      this.projectId = 1;
    }

    this.$http.get(`/p/${this.$route.query.project}`).then(res => {
      this.data = res.data;
      this.updateTable();
    });
  }
};
</script>

<style scoped>
.apexcharts-legend {
  display: flex;
  flex-direction: column;
}
#icon-controls {
  position: fixed;
  right: 20px;
  user-select: none;
  bottom: 20px;
}

#add-icon {
  border-radius: 100%;
  color: white;
  font-size: 24px;
  margin: 4px;
  padding: 10px;
  font-weight: bold;
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(121, 9, 111, 1) 100%,
    rgba(0, 212, 255, 1) 100%
  );
}

* {
  text-decoration: none;
}
#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: #707070;
}

#pie-chart {
  background: #fff;
  box-shadow: 1px,1px,1px,10px rgba(0, 0, 0, 0.1);
}

#t1 {
  width: 96%;
}
#description {
  margin-right: 80%;
}

.bg-primary {
  color: white;
  background-color:#7367F0!Important;
}

#navigation {
  display: flex;
}

#edit-row > * {
  margin-left: 10px;
}

#edit-row {
  display: flex;
}

#controls {
  display: flex;
  flex-direction: row-reverse;
}

#controls > button {
  padding: 4px;
  margin-right: 7px;
}
</style>