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

    <vs-button color="success" class="new-team-button" @click="newTeamActive = true">New Team</vs-button>

    <vs-table ref="table" search :data="this.teams" @selected="editData">

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
              <span v-for="user in tr.users" >
                <vx-tooltip :text="getDisplayName(user)" position="bottom" class="members-container">
                  <img class="avatarImg" :src="'https://ui-avatars.com/api/?name=' + getDisplayName(user)"/>
                </vx-tooltip>
              </span>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
              <feather-icon icon="ArchiveIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteConfirm(tr)" />
            </vs-td>

          </vs-tr>
        </tbody>
      </template>
    </vs-table>

    <vs-popup :title="selected.title" :active.sync="popupActive">
      <vs-tabs>
         <vs-tab label="Add Member" icon-pack="feather" icon="icon-user">
            
          <h6 class="revoke-header">Enter in a list of comma seperated email addresses. When you're done, click add!</h6>
          <vs-textarea label="Email Addresses" v-model="newMembers" placeholder="first.last@company.com, first.last@company.com" height="350"> </vs-textarea>
          <vs-button color="success" class="float-right" @click="addNewMembers()">Add</vs-button>
              
         </vs-tab>

         <vs-tab label="Revoke Access" icon-pack="feather" icon="icon-user">
           <h6 class="revoke-header">Revoke access from users on this team</h6>
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
          </template>
          
          </vs-table>
         </vs-tab>

      </vs-tabs>
    </vs-popup>

    <vs-popup title="New Team" :active.sync="newTeamActive">
      <vs-input label="Title" class="w-full" v-model="newTitle"></vs-input>
      <br>
      <vs-textarea label="Email Addresses" v-model="newMembers" placeholder="first.last@company.com, first.last@company.com" height="350"> </vs-textarea>
      <vs-button color="success" class="float-right" @click="createNewTeam()">Create</vs-button>
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
      popupActive:false,
      newTitle:"",
      newTeamActive:false,
      newMembers:"",
      teamToDelete:{}
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
    ...mapActions('teams',[
       'postTeam',
       'getTeams',
       'deleteTeam'
     ]),

    editData(tr){
      this.selected = tr
      this.popupActive = true
    },
    createNewTeam(){
      
      let team = {
        title:this.newTitle,
        users:[],
        archive:false,
      }

      this.postTeam(team)
      .then(this.getTeams())
      .then(this.addNewMembers())
      .then(this.newTeamActive = false)

    },
    addNewMembers(){
      let users = this.newMembers.split(',')
      let errors = []
      
      for(let user of users){
        // validate email address format

        //send email

        // append to error array 
      }

      if(errors.length > 0 ){
        // show error 
      }

      this.newMembers = ""

    },
    deleteConfirm(team){
      this.teamToDelete = team
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to delete this team? All child projects will also be deleted!.',
        accept:this.handleDelete
      })
    },

    handleDelete(){
      this.deleteTeam(this.teamToDelete)
      .then(this.getTeams())
      this.teamToDelete = {}

    }

  }
}
</script>

<style lang="scss">
.members-container{
  width: 64px;
}
.revoke-header{
  padding-top:15px;
  padding-bottom:15px;
}

.new-team-button{
  margin-left:15px;
  margin-top:15px;
}

.avatarImg{
   border-radius: 50%;
}

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
