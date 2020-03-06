<template>
  <div id="icon-controls" @mouseenter="icons = true" @mouseleave="icons = false">
      <transition name="fade" key="1" mode="out-in">
        <div id="expanded" v-if="icons">
          <vx-tooltip text="Add a new project" position="left">
            <i id="add-icon" @click="$router.push('/projects/new')" class="material-icons">folder</i>
          </vx-tooltip>

          <vx-tooltip text="Add a new task" position="left">
            <i id="add-icon" @click="addTask" class="material-icons">insert_drive_file</i>
          </vx-tooltip>
        </div>
        <i v-if="!icons" key="2" class="material-icons" id="add-icon">add</i>
      </transition>
    </div>
</template>

<script>
export default {
 data() {
   return{
    icons: false
   }
 }
}
</script>

<style>
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
</style>