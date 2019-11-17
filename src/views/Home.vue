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
        @click="panelSwitcher =3;"
        type="border"
        ref="first-btn"
        :class="{ 'bg-primary':  panelSwitcher == 3 }"
        icon="account_tree"
      >Diagram</vs-button>

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
        @click="panelSwitcher = 0; updateTable()"
        type="border"
        ref="first-btn"
        :class="{ 'bg-primary':  panelSwitcher == 0 }"
        icon="grid_on"
      >Table</vs-button>
    </div>

    <transition name="fade" mode="out-in" key="133" v-on:after-leave="removeDetailsCaret" v-on:before-enter="removeDetailsCaret">
      
      <!-- TABLE VIEW -->
      <div id="table" v-if="panelSwitcher === 0" key="0">
        <div class="title-block">
            <vs-dropdown :vsDropRight="true">
              <span id="title" href="#">
                {{ data.project_title }}
                <i class="material-icons"> expand_more </i>
              </span>

              <vs-dropdown-menu>

                <vs-dropdown-item v-for="project in projectList.filter(x => x.project_title != data.project_title)" :key="project.id"
                @click="$router.replace({ query: {'project': project.id}})">
                  {{ project.project_title }}
                </vs-dropdown-item>

              </vs-dropdown-menu>
            </vs-dropdown>
   
        </div>
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

        <transition name="fade" >
          <vs-table maxHeight="70vh" ref="table" id="t123" v-show="rend" :data="display">
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
                        :config="datetimePickerConfig"
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
                  {{data[index].start_date.split('T')[0]}}
                  <template slot="edit">
                    <div id="edit-row">
                      <vs-input ref="name" v-model="data[index].name" />
                      <flat-pickr
                        ref="date"
                        :config="datetimePickerConfig"
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
                        :config="datetimePickerConfig"
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
                        :config="datetimePickerConfig"
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
                        :config="datetimePickerConfig"
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
      <div id="list" v-else-if="panelSwitcher === 1" key="1">
        <span id="title">{{ data.project_title }}</span>
        <div id="navigation">
          <vs-breadcrumb id="breadcrumb" ref="breadcrumb">
            <li v-for="(item,i) in breadcrumb" :key="i" @click="push(item.query)"
              :class="{ 'active': i == breadcrumb.length-1 }"
            > {{ item.title }}<span v-if="i != breadcrumb.length - 1" class="vs-breadcrum--separator"
              >/</span>
            </li>
          </vs-breadcrumb>
        </div>
        
        <ListViewTable

        ></ListViewTable>
      
      </div>

      <!-- DASHBOARD -->
      <div id="dashboard" v-else-if="panelSwitcher === 2" key="2">
        <span id="title">{{ data.project_title }}</span> 
        <DashboardView></DashboardView>
      </div>

      <!-- DIAGRAM VIEW -->
      <div id="tree" v-else-if="panelSwitcher === 3" key="3">
        <span id="title">Diagram</span>
        <div class="flex mt-3" style="justify-content: center">
          <div class="tree-container">
            <tree :data="getTreeData()" 
            :duration="400"
            type="tree"
            :leafTextMargin="8"
            :radius="4"
            :strokeWidth="0.6"
            node-text="name">
            </tree>
          </div>
        </div>
      </div>

    </transition>
  </div>
</template>

<script>
import DashboardView from '@/custom/DashboardView.vue';
import ListViewTable from '@/custom/ListViewTable.vue';
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import {tree} from 'vued3tree'



export default {
  components: {
    flatPickr, ListViewTable, DashboardView, tree
  },
  data: () => ({
    projectList: [],
    datetimePickerConfig: {
      enableTime: true,
      dateFormat: 'Y-m-d'
    },
    rend: false,
    columnDefs: null,
    rowData: null,
    objToAdd: {},
    breadcrumb: [],
    data: [],
    display: [],
    table: true,
    panelSwitcher: 0,
    projectId: 0,
    taskId: 0,
    icons: false,
  }),

  methods: {
    addTask() {
      let newObject = Object.assign({}, this.objToAdd);
      if(this.display)
        newObject.id = this.display.length + 1;
      else 
        newObject.id = 1;

      this.updateData(newObject);
      this.updateTable();
    },
    updateData(project) {
      if(this.$route.query.task) {
        let path = this.$route.query.task.split('-');
        this.display.unshift(project);

        switch(path.length) {
          case 1:
            this.data
            .children[this.data.children.map(x => x.id).indexOf(path[0]-0)]
            .children = this.display; 
            break;
          case 2: 
            this.data
            .children[this.data.children.map(x => x.id).indexOf(path[0]-0)]
            .children[this.data.children.map(x => x.id).indexOf(path[1]-0)]
            .children = this.display;
            break;
          case 3: 
            this.data
            .children[this.data.children.map(x => x.id).indexOf(path[0]-0)]
            .children[this.data.children.map(x => x.id).indexOf(path[1]-0)]
            .children[this.data.children.map(x => x.id).indexOf(path[2]-0)]
            .children = this.display;
            break;
        }

        // project => children => chirdren
      }
      else {
        this.data.children.unshift(project);
      }

      // POST REQUEST GOES HERE.
      this.$http.post('/p', this.data).then(response => {
      
      })
    },
    getTreeData() {
      let data = this.data;
      data['name'] = data.project_title;

      return data;
    },
    removeDetailsCaret(duration) {
      this.rend = false;
      setTimeout(() => {
        if(this.panelSwitcher != 0) 
          return;

        if(!this.data.children) {
          this.rend = true;
          return;
        }
        this.$refs['table'].$children.slice(6).forEach(x => {
          x.$el.cells[0].onclick = x.clicktd;
          x.clicktr = function() {}
          x.clicktd = function() {}
        });

        var filtered = [];
        var elements = document.querySelectorAll('.vs-icon.notranslate.icon-scale.material-icons.null');
        for(let i = 0; i < elements.length; i++) {
          if(elements[i].innerHTML == 'keyboard_arrow_down')
            filtered.push(elements[i]);
        };

        for(let i = 0; i < filtered.length; i++) {
          if(!this.display[i].details) {
            filtered[i].classList.add('invisible');
            filtered[i].parentNode.onclick = null;
          } else {
            filtered[i].setAttribute('style', 'color: #7367F0!Important;')
          }
        }
        this.rend = true;
      }, duration || 1)
    },
    addProject() {
      this.$router.push("/projects?action=new-project");
    },
    fetchProject(id) {

      this.$http.get(`/p/${id}`).then(res => {
        this.data = res.data[0];
        if(res.data[0].children) {
          this.objToAdd = JSON.parse(JSON.stringify(this.data.children[0]));
          this.objToAdd.name = ''
          this.objToAdd.start_date = ''
          this.objToAdd.type = ''
          this.objToAdd.children = null;
        }

        this.removeDetailsCaret(0);
        this.updateTable();
      });
    },
    handleSelected(tr) {
      if (this.taskId)
        this.$router.push(
          `/?project=${this.projectId}&task=${this.taskId}-${tr.id}`
        );
      else
        this.$router.push(
          `/?project=${this.projectId}&task=${tr.id}`
        );
    },
    push(p) {
      this.$router.push(p);
    },
    updateTable() {

      this.projectId = this.$route.query.project;
      this.taskId = this.$route.query.task;
      if(!this.data.children) {
        this.display = []
        return;
      }
      else {
        this.display = this.data.children;
      }

      this.breadcrumb = [
        { title: "Home", query: `/?project=${this.projectId}` }
      ];

      if (this.taskId) {
        let taskLine = "";
        this.taskId.split("-").forEach((x, i) => {
          taskLine += x + "-";
           this.breadcrumb.push({
            title: this.display[this.display.map(x => x.id).indexOf(x-0)].name,
            query: `/?project=${this.projectId}&task=${taskLine}`.slice(0, -1)
          });

          this.display = this.display[this.display.map(x => x.id).indexOf(x-0)].children;
        });
      }

     
      if (this.breadcrumb.length > 4) {
        this.breadcrumb = this.breadcrumb.slice(-4);
        this.breadcrumb[0].title = "..." + this.breadcrumb[0].title;
      }

      this.removeDetailsCaret(500);
    }
  },
  watch: {
    $route(n) {
      this.table = false;
      setTimeout(() => (this.table = true), 100);

      if (n.query.project != this.projectId) {
        this.fetchProject(this.$route.query.project);
        this.updateTable();
      } else {
        this.updateTable();
      }
    }
  },
  mounted() {
    this.removeDetailsCaret(500);
  },
  created() {
    if (!this.$route.query.project) {
      this.$router.push({ query: { project: "1" } });
      this.projectId = 1;
    }
    
    this.$http.get('/p').then(res => {
      this.projectList = res.data;
    });
    
    this.fetchProject(this.$route.query.project);
    
  }
};
</script>

<style scoped>

.tree-container {
  width: 98%;
  height: 70vh;
}

#table-container {

  position: relative;
  z-index: 0;
}

.active-desc {
  border: 1px solid red;
}

.apexcharts-legend {
  display: flex;
  flex-direction: column;
}

.invisible {
  display: none!important;
}

#icon-controls {
  position: fixed;
  right: 20px;
  user-select: none;
  bottom: 20px;
  z-index: 100;
}

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

* {
  text-decoration: none;
}
#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 30px;
  margin-left: 10px;
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

#breadcrumb {
  cursor: pointer;
}
</style>