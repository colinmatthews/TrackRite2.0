<template>
  <div>
    <vs-input
        v-validate="'required|email|min:3'"
        data-vv-validate-on="blur"
        name="email"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        label-placeholder="Email"
        v-model="email"
        class="w-full"/>
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input
        data-vv-validate-on="blur"
        v-validate="'required|min:6|max:10'"
        type="password"
        name="password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        label-placeholder="Password"
        v-model="password"
        class="w-full mt-6"
        id="password" 
        />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <div class="flex flex-wrap justify-between my-5">
        <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
        <router-link to="/pages/forgot-password">Forgot Password?</router-link>
    </div>
    <vs-button  type="border" @click="registerUser">Register</vs-button>
    <vs-button class="float-right" :disabled="!validateForm" @click="login">Login</vs-button>

    <vs-divider>OR</vs-divider>

    <div class="social-login-buttons flex flex-wrap items-center mt-4">

      <!-- GOOGLE -->
      <div class="bg-microsoft pt-3 pb-2 px-4 rounded-lg cursor-pointer mr-4" @click="loginWithMicrosoft">
        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="microsoft" class="text-white h-6 w-6 svg-inline--fa fa-microsoft fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"></path></svg>
        <span class="ms-signin">Sign in with Microsoft </span>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      checkbox_remember_me: false
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.email != '' && this.password != '';
    }
  },
  mounted(){
    let scope = this;
    var elem = document.getElementById('password');
    elem.addEventListener('keypress', function(e){
      if (e.keyCode == 13) {
        scope.login() 
      }
    });
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {

        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    },
    login() {
      // Loading
      this.$vs.loading()

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password
        },
        notify: this.$vs.notify,
        closeAnimation: this.$vs.loading.close
      }
      this.$store.dispatch('auth/loginAttempt', payload);
    },

    // Google login
    loginWithGoogle() {
      this.$store.dispatch('auth/loginWithGoogle', { notify: this.$vs.notify })
    },

    // Facebook login
    loginWithFacebook() {
      this.$store.dispatch('auth/loginWithFacebook', { notify: this.$vs.notify })
    },

    // Twitter login
    loginWithTwitter() {
      this.$store.dispatch('auth/loginWithTwitter', { notify: this.$vs.notify })
    },

    // Github login
    loginWithGithub() {
      this.$store.dispatch('auth/loginWithGithub', { notify: this.$vs.notify })
    },
    loginWithMicrosoft() {
      this.$store.dispatch('auth/loginWithMicrosoft', { notify: this.$vs.notify })
    },
    
    registerUser() {
      if (!this.checkLogin()) return
      this.$router.push('/pages/register').catch(() => {})
    }
  }
}

</script>


<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook { background-color: #1551b1 }
    .bg-twitter { background-color: #00aaff }
    .bg-google { background-color: #4285F4 }
    .bg-github { background-color: #333 }
    .bg-microsoft {background-color: #2F2F2F;}
  }
}

.ms-signin{
  color:white; 
  display:inline-block;
  vertical-align: middle;
  height: 100%;
  padding-left:5px;
  margin-bottom:10px;
}
</style>
