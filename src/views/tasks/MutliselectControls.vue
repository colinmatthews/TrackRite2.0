<template>
<transition name="ease" >
  <vs-row>
    <vs-col vs-offset="10" vs-w="2">
      <!-- START TOP NAV BUTTONS -->
       <vx-card v-if="showControls" class="multiselect-parent">
         <vs-row>
           <vs-col vs-w="3">
             <span href="#" @click="updateArchive()" class="flex items-center text-sm mouse-click">
              <feather-icon icon="ArchiveIcon" svgClasses="w-5 h-5" />
              <span class="ml-2">Archive</span>
            </span>
           </vs-col>
           <vs-col vs-w="3">
             <span @click="alertNewFeature()" class="flex items-center text-sm mouse-click">
              <feather-icon icon="CornerRightDownIcon" svgClasses="w-5 h-5" />
              <span class="ml-2">Shift Down</span>
            </span>
           </vs-col>
           <vs-col vs-w="3">
             <span href="#" @click="alertNewFeature()" class="flex items-center text-sm mouse-click">
              <feather-icon icon="CornerLeftUpIcon" svgClasses="w-5 h-5" />
              <span class="ml-2">Shift Up</span>
            </span>
           </vs-col>
           <vs-col vs-w="3">

           </vs-col>
         </vs-row>
      </vx-card>
    </vs-col>
  </vs-row>
</transition>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return{
      showControls:false
    }
  },
  methods:{
    ...mapActions('tasks',[
      'archiveMultiSelected'
    ]),
    updateArchive(){
      this.archiveMultiSelected()
    },
    alertNewFeature(){
      //this.removeProject(this.deleteID)
      this.$vs.notify({
       
        title:'Under Development',
        text:'That feature isnt done yet. Stay tuned!'
      })
    },
  

  },
  created(){
    if(this.currentMultiSelected.length > 0){
        this.showControls = true
      }
      else{
        this.showControls = false
      }
  },
  watch:{
    currentMultiSelected(){
      if(this.currentMultiSelected.length > 0){
        this.showControls = true
      }
      else{
        this.showControls = false
      }
    }
  },
  computed:{
    ...mapState('tasks',{
      currentMultiSelected: state => state.currentMultiSelected
    })
  }
}
</script>

<style>
.multiselect-parent{
  bottom:0px;
  left:150px;
  height: 7vh;
  width: 85vw;
  position: fixed;
  z-index: 900;
}

@media screen and (max-width: 1200px) {
  .multiselect-parent{
    width: 70vw;;
    left:75px;
  }
}

@media screen and (max-width: 1270px) {
  .multiselect-parent{
    width: 80vw;;
  }
}

.mouse-click{
  cursor: pointer;
}
</style>