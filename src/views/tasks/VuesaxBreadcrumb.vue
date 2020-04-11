<template lang="html">
  <nav
    v-bind="$attrs"
    :class="`vs-align-${align}`"
    class="vs-breadcrumb"
    aria-label="breadcrumb"
    v-on="$listeners">
    <ol class="vs-breadcrumb--ol">
      <slot/>
      <li
        v-for="item in items"
        :key="item.title"
        :class="{'vs-active':item.active,'disabled-link':item.disabled}"
        :aria-current="item.active ? 'page' : null"
      >
        <a
          v-on:click.stop="navigateToCrumb(item)"
          v-if="!item.active"
          :title="item.title"
          class="vs-breadcrumb--link"
        >
          {{ item.title }}
        </a>
        <template v-else>
          <span
            :class="textClass"
            :style="textStyle"
            class="vs-breadcrumb--text"
          >
            {{ item.title }}
          </span>
        </template>
        <span
          v-if="!item.active"
          :class="separator.length > 1 ? 'material-icons' : null"
          class="separator notranslate vs-breadcrum--separator"
          translate="no"
          aria-hidden="true">{{ separator }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import _color from './VuesaxColors.js'
export default {
  name:'VsBreadcrumb',
  props:{
    items:{
      type:Array
    },
    separator:{
      type:String,
      default:'/'
    },
    color:{
      type:String,
      default: 'primary'
    },
    align:{
      type:String,
      default:'left'
    }
  },
  computed: {
    textClass() {
      const classes = {}
      if (_color.isColor(this.color)) {
        classes[`vs-breadcrumb-text-${this.color}`] = true
      }
      return classes
    },
    textStyle() {
      const style = {}
      if (!_color.isColor(this.color)) {
        style.color = _color.getColor(this.color)
      }
      return style
    },
    hasSlot () {
      return !!this.$slots.default
    }
  },
  created() {
    if(this.items) {
      this.items = this.items.map(item => {
        return item
      })
    }
  },
  computed:{
    ...mapState('tasks', {
      currentTask: state => state.currentTask,
       breadcrumbTitles: state => state. breadcrumbTitles
    }),
  },  
  methods:{
    ...mapActions('tasks',[
      'getTaskChildren',
      'setCurrentTask',
      'removeNFromBreadcrumb',
      'getProjectChildren'
    ]),
    async navigateToCrumb(task){
      // Update breadcrumb
      let currentPathLength = this.currentTask.key.path.length;
      let taskPathLength = task.key.path.length;
   
      let N = (currentPathLength - taskPathLength) / 2 //Each task has a key of length two (Task, ID)
      
      console.log("N")
      console.log(N)

      if(N === 0 && this.breadcrumbTitles.length > 2){ // Clicksthe same task as current
        return
      }

      else if(taskPathLength > 4){ // Going to a breadcrumb other than the root

        // Delete N items from the breadcrumb
        await this.removeNFromBreadcrumb(N - 1)

        // Set current path and task to selected task
        await this.setCurrentTask(task.tr)

        // Fetch new children and update table data
        await this.getTaskChildren()
      }

      else{
        let index = this.breadcrumbTitles.indexOf(task)
        if(index == 0){ // Clicking on Home
          await this.removeNFromBreadcrumb(N)
          await this.setCurrentTask({})
          await this.getProjectChildren() 
        }
        else if(this.breadcrumbTitles.length == 2 && index != 0){//Clicking on 1st task beneath home from that task (self-click)
          return 
        }
        else if(this.breadcrumbTitles.length > 1){//Click on 1st task beneath home from any other task
          await this.removeNFromBreadcrumb(N - 1)
          await this.setCurrentTask(task.tr)
          await this.getTaskChildren() 
        }
        
      }
      

    }
  }
}
</script>
<style >
.vs-breadcrumb--link{
  cursor: pointer;
}
</style>