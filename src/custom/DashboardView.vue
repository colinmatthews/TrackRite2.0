<template>
  <div id="main">
    <div id="dashboard-page" v-if="visible">
      <vs-row type="flex" vs-w="12">
        <vs-col vs-justify="center" vs-align="center" vs-w="4">
          <div class="card" id="pie">
            <div id="header">
              <span id="title">Progress To Date</span>
              <vs-dropdown>
                <span class="dd-text flex items-center">
                  Last {{ lastDays }} days
                  <i class="material-icons"> expand_more </i>
                </span>
                <vs-dropdown-menu style="width: 130px">
                  <vs-dropdown-item @click="lastDays = 7">
                    Last 7 days
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="lastDays = 30">
                    Last 30 days
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
            <div id="chart">
              <vue-apex-charts type="pie" height="400" style="margin-bottom: 40px;" id="pie-chart" :options="pieChart.chartOptions" :series="pieChart.series"></vue-apex-charts>
            </div>
            <div id="pie-footer">
              <div id="item-footer">
                <div id="circle-icon" class="primary"></div>
                <span>Completed</span>
              </div>

              <div id="item-footer">
                <div id="circle-icon" class="warning"></div>
                <span>In Progress</span>
              </div>

              <div id="item-footer">
                <div id="circle-icon" class="danger"></div>
                  <span>Not Started</span>
              </div>
            </div>
          </div>
        </vs-col>
        <vs-row vs-w="8">
          <vs-col vs-justify="center" vs-align="center" vs-w="6">
            <div class="card" id="circle">
              <div id="header">
                <span id="title">Goal Completion</span>
                <vx-tooltip text="Help example text." position="top">
                  <i id="help" class="material-icons">help_outline</i>
                </vx-tooltip>
              </div>
              <vue-apex-charts type="radialBar" height="300" id="radial-chart" :options="radialChart.chartOptions" :series="radialChart.series"></vue-apex-charts>
              <div id="footer">
                <div id="section">
                  Completed <br>
                  <span>{{ pieChart.series[0] }} tasks</span>
                </div>
                <div id="section">
                  In Progress <br> 
                  <span>{{ pieChart.series[1] + pieChart.series[2] }} tasks</span>
                </div>
              </div>
            </div>
          </vs-col>
          
          <vs-col vs-justify="center" vs-align="center" vs-w="6">
            <div class="card" id="progress">
              <div id="header">
                <span id="title">Completion by Lead (monthly)</span>
              </div>
              <div id="progress-bars">
                <lead-bar v-for="(item, i) in progressChart" :key="i"
                :name="item.name" :progress="0" :percent="item.value"
                ></lead-bar>
              </div>
            </div>
          </vs-col>

          <vs-col vs-justify="center" vs-align="center" vs-w="12">
            <div class="card" id="bars">
              <div id="header">
                <span id="title">Completion by Task</span>
              </div>
              <div id="aaf">
                <vue-apex-charts id="aff" v-if="barChartVisible" type="bar" height="250px" :options="barChart.chartOptions" :series="barChart.series"></vue-apex-charts>
              </div>

            </div>
          </vs-col>
        </vs-row>
      </vs-row>
    </div>
    <div v-else><h1 id="else-title">Not enough data to display dashboard.</h1></div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import LeadBar from '@/custom/LeadBar.vue';

export default {
  components: {
    VueApexCharts, LeadBar
  },
  data: () => ({
    barChartVisible: false,
    data: null,
    visible: false,
    lastDays: 7,
    pieChart: {
      series: [],
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
        labels: ['Completed', 'In Progress', 'Not Started'],
        colors: ['#7367F0', '#FF9F43', '#EA5455'],
      }
    },
    radialChart: {
      series: [],
      chartOptions: {
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            hollow: {
              size: '74%',
            },
            track: {
              background: 'rgba(191,197,204,0.85)',
              strokeWidth: 60,
            },
            dataLabels: {
              show: true,
              name: {
                show: false,
              },
              value: {
                show: true,
                fontSize: '4rem',
                color: '#99a2ac',
                fontFamily: 'Helvetica, Arial, sans-serif',
                formatter: function (val) {
                  return val + '%'
                }
              }
            }
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            gradientToColors: ['#A333A1',],
            inverseColors: false,
            stops: [0, 100]
          }
        },
        stroke: {  
          lineCap: 'round',
        },
        labels: ['%']
      },
    },
    progressChart: [],
    barChart: {
      series: [{
        data: []
      }],
      chartOptions: {
        colors: ["#7367F0"],
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        xaxis: {
          categories: [],
        }
      },
    },
  }),
  methods: {
    updateData(projectId) {
      this.$http.get(`/p/${projectId}/d`)
      .then(res => { this.data = res.data.children; this.updateCharts(); })
      .catch(e => this.data = "Unable to fetch data");
    },
    updatePieChart() {
      this.pieChart.series = [];
      Object.keys(this.data.progress).forEach(x => {
        this.pieChart.series.push(this.data.progress[x]-0);
      });
    },
    updateRadialChart() {
      this.radialChart.series = [];
      let total = this.pieChart.series.reduce((a,b) => a + b, 0);
      total -= this.pieChart.series[0];
      this.radialChart.series = [((this.pieChart.series[0]/total)*100).toFixed(0)]
    },
    updateProgressChart() {
      this.progressChart = [];
       this.progressChart = [];
        this.progressChart = [];

      Object.keys(this.data.completion_by_lead).forEach(x => {
        this.progressChart.push({ name: x, value: this.data.completion_by_lead[x]-0 })
      });
    },
    updateBarChart() {
      this.barChartVisible = false;
      this.barChart.series[0].data = [];
      this.barChart.chartOptions.xaxis.categories = [];
      Object.keys(this.data.completion_by_task).forEach(x => {
        this.barChart.chartOptions.xaxis.categories.push(x);
        this.barChart.series[0].data.push(this.data.completion_by_task[x]-0);
      });
      setTimeout(() => this.barChartVisible = true, 300);
    },
    updateCharts() {
      let taskId = this.$route.query.task;
      
      if(!taskId) {
        this.visible = false;
        return;
      }
      
      this.visible = true;

      taskId.split("-").forEach((x, i) => {
        if(i == taskId.split("-").length-1)
          this.data = this.data[x - 1]
        else
          this.data = this.data[x - 1].children;
      });   
      

      console.log(this.data);
      this.updatePieChart();
      this.updateRadialChart();
      this.updateProgressChart();
      this.updateBarChart();
    }
  },
  beforeMount() {
    this.updateData(4);
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

#dashboard-page {
  margin-top: 50px;
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

</style>