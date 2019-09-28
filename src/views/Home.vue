<template>
  <div id="home">
    
    <div id="controls">
      <vs-button
        color="primary"
        @click="panelSwitcher = 2"
        type="border"
        :class="{ 'vs-button-filled': panelSwitcher == 2 }"
        icon="pie_chart"
      >Dashboard</vs-button>

      <vs-button
        color="primary"
        @click="panelSwitcher = 1"
        type="border"
        :class="{ 'vs-button-filled': panelSwitcher == 1 }"
        icon="list"
      >List</vs-button>

      <vs-button
        color="primary"
        @click="panelSwitcher = 0"
        type="border"
        ref="first-btn"
        :class="{ 'vs-button-filled': panelSwitcher == 0}"
        icon="grid_on"
      >Table</vs-button>
    </div>

    <transition name="fade" mode="out-in" key="1">
      <div id="table" v-if="panelSwitcher === 0">
        <span id="title">{{ title }}</span>

        <div id="navigation">
          <vs-breadcrumb id="breadcrumb" :items="breadcrumb"></vs-breadcrumb>
        </div>

        <vs-table :data="data">
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
                  <vs-input v-model="tr.name" />
                </template>
              </vs-td>

              <vs-td :data="data[index].start_date">{{data[index].start_date }}
                <template slot="edit">
                  <flat-pickr :config="{ dateFormat: 'm/d/Y'}" v-model="data[index].start_date"/>
                </template> 
              </vs-td>

              <vs-td :data="data[index].assignees[0].name">
                <vs-avatar :text="tr.assignees[0].name" :src="'https://i.imgur.com/ezM6SJ5.png'"/>  
              </vs-td>

              <vs-td :data="data[index].status">
                <span :class="{ 'text-success': data[index].status == 'Complete',
                'text-warning': data[index].status == 'In progress'
                }">
                {{data[index].status}}
                </span>
                <template slot="edit">
                  <vs-select v-model="data[index].status">
                    <vs-select-item value="Complete" text="Complete" />
                    <vs-select-item value="In progress" text="In progress" />
                    <vs-select-item value="Not Started" text="Not Started" />
                  </vs-select>
                </template>
              </vs-td>

              <vs-td :data="data[index].type">{{data[index].type}}
                <template slot="edit">
                  <vs-input v-model="tr.type"/>
                </template>
              </vs-td>

              <vs-td><vs-button @click="handleSelected(data[index])">Expand</vs-button> </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>

      <div id="list" v-else-if="panelSwitcher === 1" key="2">
        <h1>List view</h1>
      </div>

      <div id="dashboard" v-else key="3">
        <h1>Dashboard</h1>
      </div>
    </transition>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  components: {
    flatPickr
  },
  data: () => ({
    breadcrumb: [],
    data: [],
    title: null,
    panelSwitcher: 0,
    projectId: 0,
    taskId: 0,
  }),
  methods: {
    handleSelected(tr) {
      let route = this.$route.query.route;
      this.$router.push(`/?route=${route}-${tr.id.toString()[0]}`);
      this.$router.go(`/?route=${route}-${tr.id.toString()[0]}`);
    },
  },
  created() {
    if (!this.$route.query.route)
      this.$router.push({ query: { route: "p-1" } });

    let route = this.$route.query.route;
    this.projectId = route[2]-0;

    this.$http.get(`/p/${this.projectId}`)
    .then(res => {
      this.title = res.data.project_title;
      this.data = res.data.children;

      if(route.split('-').length > 2) {
        var taskLine = ''
        route.split('-').slice(2, route.split('-').length).forEach((x,i) => {
          taskLine += x + '-';  
          console.log(taskLine);
          this.breadcrumb.push({
            title: this.data[(x-0)-1].name,
            url: `/?route=p-${this.projectId}-${taskLine}`.slice(0,-1)
          });
          
          this.data = this.data[(x-0)-1].children;
        })
        
        if(this.breadcrumb.length > 4) {
          this.breadcrumb = this.breadcrumb.slice(-4);
          this.breadcrumb[0].title = '...' + this.breadcrumb[0].title;
        }
      }
    })

    this.breadcrumb = [{title: 'Home', url: `/?route=p-${this.projectId}` }];

  }
};
</script>

<style scoped>
* {
  text-decoration: none;
}
#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: #707070;
}

#navigation {
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