<template>
  <vs-popup class="holamundo"  title="Lorem ipsum dolor sit amet" :active.sync="popupActive">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

      </p>
    </vs-popup>
</template>

<script>
export default {
  props:{
    popupActive:Boolean
  }

}
</script>

<style>

</style>