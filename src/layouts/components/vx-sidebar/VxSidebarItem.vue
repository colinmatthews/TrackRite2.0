<!-- =========================================================================================
    File Name: VxSidebarItem.vue
    Description: Sidebar item component. Extends vuesax framework's 'vs-sidebar-item' component
    Component Name: VxSidebarItem
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div :class="[{'vs-sidebar-item-active':activeLink}, {'disabled-item pointer-events-none': isDisabled}]" class="vs-sidebar--item">
        <router-link v-if="to" :to="to" :class="[{'router-link-active': activeLink}]" :target="target" exact>
            <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon">
            </vs-icon>
            <feather-icon :icon="icon" :class="{'w-3 h-3': iconSmall}" v-else></feather-icon>
            <slot></slot>
        </router-link>
        <a v-else :target="target" :href="href">
            <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon">
            </vs-icon>
            <feather-icon :icon="icon" :class="{'w-3 h-3': iconSmall}" v-else></feather-icon>
            <slot></slot>
        </a>
    </div>
</template>

<script>
export default {
    name: 'VxSidebarItem',
    props: {
        icon: {
            default: "",
            type: String
        },
        iconSmall: {
            default: false,
            type: Boolean,
        },
        iconPack: {
            default: 'material-icons',
            type: String
        },
        href: {
            default: '#',
            type: String
        },
        to: {
            default: null,
            type: String
        },
        slug: {
          default: null,
          type: String
        },
        index: {
            default: null,
            type: [String, Number]
        },
        featherIcon: {
            default: true,
            type: Boolean,
        },
        target: {
            default: '_self',
            type: String,
        },
        isDisabled: {
            default: false,
            type: Boolean
        },
    },
    data() {
        return {
            activeLink: false,
        }
    },
    watch: {
        '$route'() {
            this.CheckIsActive()
        }
    },
    methods: {
        CheckIsActive() {
            if (this.to) {

                if(this.$route.meta.parent = "/tasks/"){
                    // Split by / delimeter
                    let toRoute = this.to.split('/')
                    let toPid = null 

                     // If sidebar item matches project route (['/','tasks','566646455'])
                     // This works because the task id is added to the route after navigation - it is not used to load the task after the intial application load
                     // We use a watcher on Children in TableView to append the task id after the route loads

                    if(toRoute.length == 3 && toRoute[1] == "tasks"){        
                        
                         //Capture pid from route
                        toPid = toRoute[2]
                    }
                    // Set active link equal to boolean result of comparison
                    if(this.$route.params.pid == null) this.activeLink = false
                    else{
                        this.activeLink = toPid == this.$route.params.pid
                    }
                }
                else if((this.to == this.$router.path && this.to) || (this.$route.meta.parent == this.slug)) this.activeLink = true
                else this.activeLink = false
                
            }
        }
    },
    updated() {
        this.CheckIsActive();
    }
}
</script>
