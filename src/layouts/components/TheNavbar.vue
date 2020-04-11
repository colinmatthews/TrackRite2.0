<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
<div class="relative">
  <div class="vx-navbar-wrapper">
    
    <vs-navbar class="vx-navbar navbar-custom" :color="navbarColor" :class="classObj">
      <vs-spacer></vs-spacer>

          
              <div class="search-full-container w-full h-full absolute left-0 top-0" :class="{'flex': showFullSearch}" v-show="showFullSearch">
                <vx-auto-suggest
                  ref="navbarSearch"
                  :autoFocus="showFullSearch"
                  :data="$store.getters['project/getProjectsForNavbarSearch']"
                  search_key="title"
                  background-overlay
                  class="w-full"
                  inputClassses="w-full vs-input-no-border vs-input-no-shdow-focus"
                  icon="SearchIcon"
                  placeholder="Search a project..."
                  @input="hnd_search_query_update"
                  @selected="selected"
                  @closeSearchbar="showFullSearch = false">

                
                  <template v-slot:projects="{ suggestion }">
                    <div class="flex items-end leading-none py-1">
                      <feather-icon :icon="suggestion.icon" svgClasses="h-5 w-5" class="mr-4" />
                      <span class="mt-1">{{ suggestion.title }}</span>
                    </div>
                  </template>

                 
                  <template v-slot:noResult>
                    <div class="flex items-center">
                      <feather-icon icon="InfoIcon" svgClasses="h-5 w-5" class="mr-4" />
                      <span>No results found.</span>
                    </div>
                  </template>

                </vx-auto-suggest>

                <div class="absolute right-0 h-full z-50">
                  <feather-icon
                    icon="XIcon"
                    class="px-4 cursor-pointer h-full close-search-icon"
                    @click="showFullSearch = false" />
                </div>
              </div>
              <feather-icon icon="SearchIcon" @click="showFullSearch = true" class="cursor-pointer navbar-fuzzy-search mr-4" />
            

      
      
      <div class="the-navbar__user-meta flex items-center">
        <div class="text-right leading-tight hidden sm:block">
          <p class="font-semibold">{{ user_displayName }}</p>
        </div>
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
          <div class="con-img ml-3">
            <img
              v-if="activeUserImg.startsWith('http')"
              key="onlineImg"
              :src="activeUserImg"
              alt="user-img"
              width="40"
              height="40"
              class="rounded-full shadow-md cursor-pointer block" />
            <img
              v-else
              key="localImg"
              :src="require(`@/assets/images/portrait/small/${activeUserImg}`)"
              alt="user-img"
              width="40"
              height="40"
              class="rounded-full shadow-md cursor-pointer block" />
          </div>
          <vs-dropdown-menu class="vx-navbar-dropdown">
            <ul style="min-width: 9rem">
              <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="$router.push('/profile')"><feather-icon icon="UserIcon" svgClasses="w-4 h-4"></feather-icon> <span class="ml-2">Profile</span></li>
              <vs-divider class="m-1"></vs-divider>
              <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="logout()"><feather-icon icon="LogOutIcon" svgClasses="w-4 h-4"></feather-icon> <span class="ml-2">Logout</span></li>
            </ul>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

    </vs-navbar>


  </div>
</div>
</template>

<script>
import VxAutoSuggest from '../../components/vx-auto-suggest/VxAutoSuggest.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import draggable from 'vuedraggable'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: "the-navbar",
    props: {
        navbarColor: {
            type: String,
            default: "#fff",
        },
    },
    data() {
        return {
            searchQuery: '',
            showFullSearch: false,
            settings: { // perfectscrollbar settings
                maxScrollbarLength: 60,
                wheelSpeed: .60,
            },
            autoFocusSearch: false,
            showBookmarkPagesDropdown: false,
        }
    },
    watch: {
        '$route'() {
            if (this.showBookmarkPagesDropdown) this.showBookmarkPagesDropdown = false
        }
    },
    computed: {
        // HELPER
        sidebarWidth() {
            return this.$store.state.sidebarWidth;
        },
        breakpoint() {
            return this.$store.state.breakpoint;
        },

        // NAVBAR STYLE
        classObj() {
            if (this.sidebarWidth == "default") return "navbar-default"
            else if (this.sidebarWidth == "reduced") return "navbar-reduced"
            else if (this.sidebarWidth) return "navbar-full"
        },

        // BOOKMARK & SEARCH
        data() {
            return this.$store.state.navbarSearchAndPinList
        },
        starredPages() {
            return this.$store.state.starredPages
        },
        starredPagesLimited: {
            get() {
                return this.starredPages.slice(0, 10)
            },
            set(list) {
                this.$store.dispatch('arrangeStarredPagesLimited', list)
            }
        },
        starredPagesMore: {
            get() {
                return this.starredPages.slice(10);
            },
            set(list) {
                this.$store.dispatch('arrangeStarredPagesMore', list)
            }
        },

        // PROFILE
        user_displayName() {
            let user = firebase.auth().currentUser;
            return user.displayName
            // return JSON.parse(localStorage.getItem('userInfo')).displayName
        },
        activeUserImg() {
            return "https://ui-avatars.com/api/?name=" + this.user_displayName
            // return JSON.parse(localStorage.getItem('userInfo')).photoURL || this.$store.state.AppActiveUser.img;
        }
    },
    methods: {
        showSidebar() {
            this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true);
        },
        selected(item) {
            console.log(item)
            this.$router.push('/tasks/' + item.projects.id)
            this.showFullSearch = false
        },
        actionClicked(item) {
            // e.stopPropogation();
            this.$store.dispatch('updateStarredPage', { index: item.index, val: !item.highlightAction })
        },
        showNavbarSearch() {
            this.showFullSearch = true
        },
        showSearchbar() {
            this.showFullSearch = true
        },
        elapsedTime(startTime) {
            let x = new Date(startTime)
            let now = new Date();
            var timeDiff = now - x
            timeDiff /= 1000;

            var seconds = Math.round(timeDiff);
            timeDiff = Math.floor(timeDiff / 60);

            var minutes = Math.round(timeDiff % 60);
            timeDiff = Math.floor(timeDiff / 60);

            var hours = Math.round(timeDiff % 24);
            timeDiff = Math.floor(timeDiff / 24);

            var days = Math.round(timeDiff % 365);
            timeDiff = Math.floor(timeDiff / 365);

            var years = timeDiff;

            if (years > 0) {
                return years + (years > 1 ? ' Years ' : ' Year ') + 'ago';
            } else if (days > 0) {
                return days + (days > 1 ? ' Days ' : ' Day ') + 'ago';
            } else if (hours > 0) {
                return hours + (hours > 1 ? ' Hrs ' : ' Hour ') + 'ago';
            } else if (minutes > 0) {
                return minutes + (minutes > 1 ? ' Mins ' : ' Min ') + 'ago';
            } else if (seconds > 0) {
                return seconds + (seconds > 1 ? ` sec ago` : 'just now');
            }

            return 'Just Now'
        },
        outside: function() {
            this.showBookmarkPagesDropdown = false
        },
        // Method for creating dummy notification time
        randomDate({hr, min, sec}) {
          let date = new Date()

          if(hr) date.setHours(date.getHours() - hr)
          if(min) date.setMinutes(date.getMinutes() - min)
          if(sec) date.setSeconds(date.getSeconds() - sec)

          return date
        }, 
        logout() {
           
            // if user is looged in via firebase
            const firebaseCurrentUser = firebase.auth().currentUser

            if (firebaseCurrentUser) {
                firebase.auth().signOut().then(() => {
                    this.$router.push('/pages/login')
                    localStorage.removeItem('userInfo');
                })
            }
        },
    },
    directives: {
        'click-outside': {
            bind: function(el, binding) {
                const bubble = binding.modifiers.bubble
                const handler = (e) => {
                    if (bubble || (!el.contains(e.target) && el !== e.target)) {
                        binding.value(e)
                    }
                }
                el.__vueClickOutside__ = handler
                document.addEventListener('click', handler)
            },

            unbind: function(el) {
                document.removeEventListener('click', el.__vueClickOutside__)
                el.__vueClickOutside__ = null

            }
        }
    },
    components: {
        VxAutoSuggest,
        VuePerfectScrollbar,
        draggable
    },
}
</script>

<style >
.navbar-fuzzy-search{
  padding-right:10px;
}
.auto-suggest__suggestion-group-container{
  position: relative;
  z-index: 5000;
}
.auto-suggest__suggestion-group__suggestion{
  position: relative;
  z-index: 5000;
}


</style>
