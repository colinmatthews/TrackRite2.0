<!-- =========================================================================================
  File Name: UserView.vue
  Description: User View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
<!-- EDITING PAGE --->
  <div v-if="editing">
    <div id="page-user-edit">

      <vx-card v-if="user_data">

        <div slot="no-body" class="tabs-container px-6 pt-6">

          <div id="user-edit-tab-info">

    
            <!-- Content Row -->
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full">
                <vs-input class="w-full mt-4" label="Display Name" v-model="user_data.displayName" v-validate="'required'" name="username" />
                <span class="text-danger text-sm"  v-show="errors.has('username')">{{ errors.first('username') }}</span>
                 <vs-button class="ml-auto mt-2" @click="changeDisplayName()" >Save Changes</vs-button>


                <vs-input class="w-full mt-4" label="Email" v-model="user_data.email" type="email" v-validate="'required|email'" name="email" />
                <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>
                 <vs-button class="ml-auto mt-2" @click="changeEmail()" >Save Changes</vs-button>
              </div>

              <div class="vx-col md:w-1/2 w-full">

              </div>
            </div>

            <!-- Save & Reset Button -->
            <div class="vx-row">
              <div class="vx-col w-full">
                <div class="mt-8 flex flex-wrap items-center justify-end">
                 
                  <vs-button class="ml-4 mt-2" type="border" color="warning" @click="editing = false">Back</vs-button>
                </div>
                <br>
              </div>
            </div>
          </div>
          

        </div>

      </vx-card>
    </div>


  </div>
  
  <!-- VIEW PROFILE PAGE --->
  <div v-else id="page-user-view">
   

    <vs-alert color="danger" title="User Not Found" :active.sync="this.user_data == null">
      <span>User record not found. Please log in!</span>
    </vs-alert>

    <div id="user-data" v-if="user_data">

      <vx-card title="Account" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

        

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Display Name</td>
                <td>{{ user_data.displayName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Login Provider</td>
                <td>{{ user_data.providerId }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Email</td>
                <td>{{ user_data.email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Dark Mode</td>
                <vs-checkbox v-model="checkbox"></vs-checkbox>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- /Information - Col 2 -->
          <div class="vx-col w-full flex" id="account-manage-buttons" >
            <vs-button type="border" icon-pack="feather" icon="icon-edit" class="mr-4" v-if="can_edit" @click="editAccount()">Edit</vs-button>
            <vs-button type="border" color="warning" icon-pack="feather" class="mr-4" icon="icon-edit" v-if="can_edit" @click="changePassword()">Change Password</vs-button>
            <vs-button type="border" color="dark" icon-pack="feather" class="mr-4"  icon="icon-mail" v-if="can_edit" @click="sendValidationEmail()">Resend Validation Email</vs-button>
          
            <vs-button color="danger" icon-pack="feather" class="mr-4"  icon="icon-trash" @click="openConfirm()">Delete</vs-button>
            
            
          </div>

        </div>

      </vx-card>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      user_data: null,
      can_edit:false,
      editing:false,
      popupActive:false,
      checkbox:false
    }
  },
  computed:{
    ...mapState({
      theme: state => state.theme
    })
  },
  watch:{
    checkbox(){
      if(this.checkbox){
        this.updateTheme('dark')
      }
      else{
        this.updateTheme('semi-dark')
      }
    }
  },
  created(){
    if(this.theme == 'dark'){
      this.checkbox = true
    }
  },
  methods: {
    ...mapActions([
      'updateUserInfo',
      'updateTheme'
    ]),
    editAccount() {
     
    this.editing = true

    },
    sendValidationEmail(){
      let user = firebase.auth().currentUser;
      let scope = this;
      let actionCodeSettings = {
        url: "https://app.trackrite.ca/home"
      }

      user.sendEmailVerification(actionCodeSettings).then(function() {
          scope.$vs.notify({
              title:'Email Sent!',
              text: "Please navigate to your email to verify your account",
              color:'success'
          })
      }).catch(function(error) {
          scope.$vs.notify({
              title:'Error Sending Email!',
              text: error,
              color:'danger'
          })
      });

    },
    changePassword(){
      var user = firebase.auth().currentUser;
      let auth = firebase.auth();
      let scope = this;
      let actionCodeSettings = {
        url: "https://app.trackrite.ca/home"

      }

      auth.sendPasswordResetEmail(user.email,actionCodeSettings).then(function() {
        scope.$vs.notify({
          title:'Email Sent!',
          text: "Please navigate to your email to reset your password",
          color:'success'})
      }).catch(function(error) {
        scope.$vs.notify({
          title:'Error Sending Email!',
          text: error,
          color:'danger'})
      });


    },
    deleteAccount() {
      var user = firebase.auth().currentUser;
      let scope = this;

      user.delete().then(function() {
        scope.acceptAlert();
       
      }).catch(function(error) {
        scope.$vs.notify({
          title:'Error Deleting Account!',
          text: error,
          color:'danger'})
      });

    },
    changeDisplayName(){
      var user = firebase.auth().currentUser;
      let scope = this;

      user.updateProfile({ displayName: this.user_data.displayName}).then(function() {
         scope.$vs.notify({
          title:'Updated Display Name!',
          color:'success'})
 
      })
      .then(() => {
        this.updateUserInfo({'displayName':this.user_data.displayName})
      }).catch(function(error) {
        scope.$vs.notify({
          title:'Error Updating Display Name!',
          text: error,
          color:'danger'})
      });


    },
    changeEmail(){
      var user = firebase.auth().currentUser;
      let scope = this;

      user.updateEmail(this.user_data.email).then(function() {
        scope.$vs.notify({
          title:'Updated Email!',
          color:'success'})
      
      }).catch(function(error) {
       scope.$vs.notify({
          title:'Error Updating Email!',
          text: error,
          color:'danger'})
      });

    },
    openConfirm() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: "Are you sure you want to delete your account? If you haven't logged in recently you will need to re-authenicate your account.",
        accept: this.deleteAccount
      })
    },
    acceptAlert() {
      this.$vs.notify({
        color: 'danger',
        title: 'Deleted account',
        text: 'Your account was deleted. You will be redirected shortly.'
      })
    },
  },
  created() {
    let user = firebase.auth().currentUser;
    let user_data = {};
    if(user !=  null){
      console.log(user.providerData)
        user.providerData.forEach(function (profile) {
          user_data.providerId = profile.providerId
          user_data.uid = profile.uid
          user_data.displayName = profile.displayName
          user_data.email = profile.email
          user_data.photoURL = profile.photoURL
        });

      this.user_data = user_data;
      if(user_data.providerId != 'microsoft.com'){
        this.can_edit = true
      }
    }
  }
}

</script>

<style lang="scss">
.delete-modal-buttons{
  display: inline-block;
}
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }

}

</style>
