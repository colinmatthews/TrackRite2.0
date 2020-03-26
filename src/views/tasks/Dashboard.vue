<template>
  <div id="main">
    <h4 class="dashboardTitle">{{ currentTask.title}} </h4>
    <div id="dashboard-page" v-if="visible">
      <vs-row type="flex" vs-w="12">
        <vs-col vs-justify="center" vs-align="center" vs-w="4">
          <!-- Pie Chart -->
          <content-loader
            v-if="!loaded"
            :height="475"
            :width="400"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="-1" y="16" rx="5" ry="5" width="400" height="400" />
          </content-loader>
          

          <div class="card" id="pie" v-else>
            <div id="header">
              <span id="title">Progress To Date</span>
            </div>
            <div id="chart">
              <vue-apex-charts type="pie" height="400" style="margin-bottom: 40px;" id="pie-chart" :options="pieChart.chartOptions" :series="Object.values(pieData)"></vue-apex-charts>
            </div>
            <div id="pie-footer">
              <div id="item-footer">
                <div id="circle-icon" class="primary"></div>
                <span>Completed: {{ pieData['Complete']}}</span>
              </div>

              <div id="item-footer">
                <div id="circle-icon" class="warning"></div>
                <span>In Progress: {{pieData['In Progress']}}</span>
              </div>

              <div id="item-footer">
                <div id="circle-icon" class="danger"></div>
                  <span>Not Started: {{pieData['Not Started']}}</span>
              </div>
            </div>
          </div>
        </vs-col>

        <!-- Bar chart -->
        <vs-col vs-w="8">
          <content-loader
            v-if="!loaded"
            :height="475"
            :width="400"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="-1" y="16" rx="5" ry="5" width="400" height="400" />
          </content-loader>


           <div class="card" v-else>
            <div id="header">
              <span id="title">Overdue Items</span>
            </div>
            <div id="aaf">
              <vue-apex-charts id="aff" type="bar"  :options="barChartOptions" :series="barChartData"></vue-apex-charts>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </div>
    <div v-else><h1 id="else-title">Not enough data to display dashboard.</h1></div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import LeadBar from '@/custom/LeadBar.vue';
import {mapState,mapActions} from 'vuex'
import { ContentLoader } from "vue-content-loader"
export default {
  components: {
    VueApexCharts, 
    LeadBar,
    ContentLoader
  },
  data: () => ({
    loaded:false,
    lastDays:7,
    pieChart: {
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'white',
          }
        },
        legend: {
          show: false,
        },
        labels: ['Not Started', 'In Progress','Completed' ],
        colors: ['#EA5455', '#FF9F43', '#7367F0'],
      }
    },
    
  }),
  computed:{
     ...mapState('dashboard', {
      pieData: state => state.pieData,
      barData: state => state.barData,
      columnData: state => state.columnData
    }),

    ...mapState('tasks', {
     currentTask: state => state.currentTask
    }),

    visible(){
      if(Object.keys(this.pieData).length !== 0){
        return true
      }
      return false
    },

    barChartOptions(){
      let categories = []
      let chartOptions = {
        colors: ["#7367F0"],
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        xaxis: {
          categories: categories,
        }
      }
      if(Object.keys(this.barData).length != 0){
        this.barData.forEach(el => {
          categories.push(el.title)
        })
        return chartOptions
      }
    },

    barChartData(){
      let data = []
      let series = [{
        data: data
      }]
      if(Object.keys(this.barData).length != 0){
        this.barData.forEach(el => {
          data.push(el.overdue)
        })
      }
      return series
    }
  },

  watch:{
    barData(){
      if(Object.keys(this.barData).length != 0){
        this.loaded = true
      }
    }
  },

  methods: {
    ...mapActions('dashboard',[
      'initializePieData', 
      'initializeBarData',
      'initializeColumnData',
    ]),
    
    

  },
  created(){
    this.initializePieData()
    this.initializeBarData()
    
  }
}
</script>

<style scoped>
#else-title {
  position: absolute;
  top: 170%;
  left: 50%;
  transform: translate(-50%,-50%);
}

#progress-bars {
  padding: 10px 15px;
}

#footer {
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  border-top: 1px solid lightgray;
  width: 100%;
}

#aaf {
  padding: 0px 20px;
}

#footer > div {
  width: 100%;
  height: 100%;
  text-align: center;   
  padding-top: 15px;
  padding-bottom: 15px;
  color: gray;
  font-size: 17px;
}

#footer > div {
  border-right: 1px solid lightgray;
}

#footer > div > span {
  color: black;
}

#pie-chart {
  margin-top: 30px;
}
.apexcharts-legend {
  display: flex;
  flex-direction: column;
  padding-left: 0px!important;
  padding-right: 0px!important;
}


.apexcharts-legend-series {
  margin:0px!important;
  padding: 8px 10px !important;
}

#help {
  color: gray;
}
.dd-text {
  color: gray;
  font-size: 16px;
}

#circle {
  height: 100%;
}

#bars {
  margin-top: 30px;
  height: 300px;
}


#dashboard-page {
  padding-top:20px;
  width: 100%;
}

#header {
  padding: 20px 15px;
  padding-bottom: 0px;
  display: flex;
  justify-content: space-between;
}

#title {
  color: black;
  font-size: 16px;
}

.card {
  color: black;
  background-color: white;
  box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
}

#circle-icon {
  margin: 4px 8px;
  height: 12px;
  width: 12px;
  border-radius: 100%;
}

.danger {
  background-color: #EA5455;
}

.primary {
  background-color: #7367F0;
}

.warning {
  background-color: #FF9F43;
}

#item-footer {
  padding: 15px 10px;
  border-top: 1px solid lightgray;
  display: flex;
}

.dashboardTitle{
  padding-left:25px;
  
}

</style>