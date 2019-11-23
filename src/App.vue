
<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import themeConfig from '@/../themeConfig.js'

export default {
  watch: {
    '$store.state.theme'(val) {
      this.toggleClassInBody(val);
    }
  },
  methods: {
    toggleClassInBody(className) {
      if (className == 'dark') {
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark');
        document.body.classList.add('theme-dark');
      } else if (className == 'semi-dark') {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-semi-dark');
      } else {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark');
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark');
      }
    },
    handleWindowResize(event) {
      this.$store.dispatch('updateWindowWidth', event.currentTarget.innerWidth);
    },
  },
  mounted() {
    this.toggleClassInBody(themeConfig.theme)
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleWindowResize);
    });
    this.$store.dispatch('updateWindowWidth', window.innerWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  },
}


</script>

<style>
::-webkit-scrollbar {
  width: 10px;
}

/* Icons fix */
.vs-table--tbody {
  position: inherit !important;
} 
.img-upload {
  width: 97%!important;
  height: 90px!important;
  margin: 3px 5px!important;
}

.con-input-upload {
  width: 97%!important;
  margin-bottom: 0px!important;
}

.con-img-upload {
  padding: 0px 3px!important;
}

/* Track */
::-webkit-scrollbar-track {
  background: gray; 
  border-radius: 10px;
}

.vs-dropdown--menu {
  width: 90vw;
}

.vs-dropdown--menu

/* Handle */
::-webkit-scrollbar-thumb {
  background: #f1f1f1;
  border: 2px solid gray;
  border-radius: 10px; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

/* Animations go here */

.list-enter-active,
.list-leave-active,
.list-move {
  transition: 600ms;
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: scaleY(0.8);
}

.list-enter-to {
  opacity: 1;
  transform: scaleY(1);
}

.list-leave-active {
  display: none;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>