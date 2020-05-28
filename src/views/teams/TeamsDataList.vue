<!-- =========================================================================================
  File Name: DataListThumbView.vue
  Description: Data List - Thumb View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="data-list-thumb-view" class="data-list-container">

    <vs-table ref="table" search :data="this.teams">

      <template slot="thead">
        <vs-th></vs-th>
        <vs-th sort-key="title">Title</vs-th>
        <vs-th >Members</vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

            <vs-td class="img-container">
              <img :src="tr.img" class="product-img" />
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">{{ tr.title }}</p>
            </vs-td>

             <vs-td>
              <span v-for="user in tr.users">
                <vx-tooltip :text="getDisplayName(user.uid)" position="bottom" class="imgContainer">
                  <img class="avatarImg" :src="'https://ui-avatars.com/api/?name=' + getDisplayName(user.uid)"/>
                </vx-tooltip>
              </span>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
              <feather-icon icon="ArchiveIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" />
            </vs-td>

          </vs-tr>
        </tbody>
      </template>
    </vs-table>

    <vs-popup :title="selected.title" :active.sync="popupActive">
      <h3>Members</h3>
      <vs-table :data="selected.users"> 
        <template slot="header">

        </template>
        <template slot="thead" >
          <th class="ownerTableHeader">
            Name
          </th>
          <th class="ownerTableHeader">
            Actions
          </th>
      </template>

      <template slot-scope="{data}">
        <vs-tr v-for="tr in selected.users" :key ="tr" :data="tr" class="border_bottom">
          <vs-td>
            <span>{{getDisplayName(tr)}}</span>
          </vs-td>
          <vs-td>
            <vs-button color="danger">Delete</vs-button>
          </vs-td>
        </vs-tr>
        <tr>
          <vs-td>
            <vue-auto-suggest
            placeholder="Search a coworker.."
            :data="usersAutocompleteData"
            :filter-by-query="true">

              <template v-slot:users="{ suggestion }">
                <div class="flex items-end leading-none py-1">
                  <feather-icon :icon="suggestion.icon" svgClasses="h-5 w-5" class="mr-4" />
                  <span class="mt-1">{{ suggestion.displayName }}</span>
                </div>
              </template>
            </vue-auto-suggest>
          </vs-td>
          <vs-td>
            <vs-button color="success" style="margin-bottom:7px;">Add</vs-button>
          </vs-td>
        </tr>
      </template>
      
      </vs-table>
    </vs-popup>

  </div>
</template>

<script>
import {mapActions,mapState,mapGetters} from 'vuex'
export default {
  data () {
    return {
      selected:{},
      itemsPerPage: 4,
      isMounted: false,
      popupActive:false
    }
  },
  computed: {
    ...mapState('teams',{
      teams: state => state.teams
    }),
    ...mapGetters('project',[
      'getDisplayName'
    ]),
  },
  methods:{
    editData(tr){
      this.selected = tr
      this.popupActive = true
    }
  }
}
</script>

<style lang="scss">
#data-list-thumb-view {
  .vs-con-table {

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;


      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 10px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
            &.img-container {
              // width: 1rem;
              // background: #fff;

              span {
                display: flex;
                justify-content: flex-start;
              }

              .product-img {
                height: 110px;
              }
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
