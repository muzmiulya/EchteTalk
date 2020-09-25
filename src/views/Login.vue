<template>
  <b-container fluid>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
      integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
      crossorigin="anonymous"
    />
    <div class="d-flex justify-content-center h-100">
      <b-card v-show="!isShown">
        <b-alert v-bind:show="alert">{{ isMsg }}</b-alert>
        <h3 class="titleColor">Login</h3>
        <br />
        <div class="d-flex">
          <h6>Hi, Welcome back!</h6>
        </div>
        <br />
        <form @reset.prevent="onReset">
          <div class="d-flex">
            <h6 style="font-weight: normal">Email</h6>
          </div>
          <b-form-input
            type="email"
            id="emailLogin"
            class="formLogin"
            v-model="form.user_email"
            required
          ></b-form-input>
          <br />
          <div class="d-flex">
            <h6 style="font-weight: normal">Password</h6>
          </div>
          <b-form-input
            type="password"
            id="passwordLogin"
            v-model="form.user_password"
            class="formLogin"
            required
          ></b-form-input>
          <br />
          <b-row>
            <b-link
              class="d-flex justify-content-end buttonLogSign btn-block"
              variant="light"
              type="button"
              @click="showForgot = !showForgot"
              style="padding-right: 15px"
            >
              Forgot password?
            </b-link>
          </b-row>
          <br />
          <b-button
            :disabled="isDisabled2"
            class="btn-block"
            variant="primary"
            @click="onSubmit()"
            pill
            >Log in</b-button
          >
        </form>
        <hr />
        <h6>Don't have an account?</h6>
        <b-link
          class="buttonLogSign btn-block"
          variant="light"
          type="button"
          @click="isShown = !isShown"
          >Sign up</b-link
        >
      </b-card>
      <b-card class="align-content-center" v-show="isShown">
        <b-alert v-bind:show="alert">{{ isMsg }}</b-alert>
        <b-alert show variant="success" v-show="isSuccess"
          >Activation link has been sent to your email.</b-alert
        >
        <b-row class="d-flex">
          <div class="buttonBack">
            <b-button
              v-b-tooltip.hover.top="'Back'"
              v-show="!isSuccess"
              @click="isShown = !isShown"
              class="flex-fill backButton"
            >
              <img alt="Vue back" src="../assets/back.png" />
            </b-button>
          </div>
          <div class="flex-fill">
            <h3 class="titleColor">Register</h3>
          </div>
        </b-row>
        <form v-show="!isSuccess">
          <br />
          <div class="d-flex">
            <h6 style="font-weight: normal">Email</h6>
          </div>
          <b-form-input
            type="email"
            class="formLogin"
            v-model="formSignUp.user_email"
            required
          ></b-form-input>
          <br />
          <div class="d-flex">
            <h6 style="font-weight: normal">Password</h6>
          </div>
          <b-form-input
            type="password"
            class="formLogin"
            v-model="formSignUp.user_password"
            required
          ></b-form-input>
          <br />
          <div class="d-flex">
            <h6 style="font-weight: normal">Confirm Password</h6>
          </div>
          <b-form-input
            type="password"
            class="formLogin"
            v-model="formSignUp.confirm_password"
            required
          ></b-form-input>
          <br />
          <div class="d-flex">
            <h6 style="font-weight: normal">Name</h6>
          </div>
          <b-form-input
            type="text"
            class="formLogin"
            v-model="formSignUp.user_name"
            required
          ></b-form-input>
          <br />
          <div class="d-flex">
            <h6 style="font-weight: normal">Phone Number</h6>
          </div>
          <b-form-input
            type="number"
            class="formLogin"
            v-model="formSignUp.user_phone"
            required
          ></b-form-input>
          <br />
          <b-button
            :disabled="isDisabled"
            class="btn-block"
            variant="primary"
            @click="addUser()"
            pill
            >Register</b-button
          >
        </form>
      </b-card>
      <b-card class="align-content-center" v-show="isShown">
        <b-alert v-bind:show="alert">{{ isMsg }}</b-alert>
        <b-row class="d-flex">
          <div class="buttonBack">
            <b-button
              v-b-tooltip.hover.top="'Back'"
              v-show="!isSuccess"
              @click="isShown = !isShown"
              class="flex-fill backButton"
            >
              <img alt="Vue back" src="../assets/back.png" />
            </b-button>
          </div>
          <div class="flex-fill">
            <h3 class="titleColor">Forgot Password</h3>
          </div>
        </b-row>
        <br />
        <div class="d-flex">
          <h6>You'll get message soon on your email</h6>
        </div>
        <br />
        <form @reset.prevent="onReset">
          <div class="d-flex">
            <h6 style="font-weight: normal">Email</h6>
          </div>
          <div>
            <b-form-input
              type="email"
              id="forgotEmail"
              class="formLogin"
              v-model="formForgot.user_email"
              required
            ></b-form-input>
          </div>
          <br />
          <b-button
            :disabled="isDisabled3"
            class="btn-block"
            variant="primary"
            @click="onForgot()"
            pill
            >Send</b-button
          >
        </form>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      },
      formSignUp: {
        user_email: '',
        user_password: '',
        confirm_password: '',
        user_name: '',
        user_phone: ''
      },
      formForgot: {
        user_email: ''
      },
      isShown: false,
      showForgot: false,
      isSuccess: false,
      alert: false,
      isMsg: ''
    }
  },
  computed: {
    isDisabled() {
      return (
        this.formSignUp.user_email <= 0 ||
        this.formSignUp.user_password <= 0 ||
        this.formSignUp.confirm_password <= 0 ||
        this.formSignUp.user_name <= 0 ||
        this.formSignUp.user_phone <= 0
      )
    },
    isDisabled2() {
      return this.form.user_email <= 0 || this.form.user_password <= 0
    },
    isDisabled3() {
      return this.formForgot.user_email <= 0
    }
  },
  methods: {
    ...mapActions(['login', 'addUsers', 'forgot', 'activateEmail']),
    onSubmit() {
      this.login(this.form)
        .then((result) => {
          console.log(result)
          this.$router.push('/')
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
      this.alert = false
    },
    onResetSignUp() {
      this.formSignUp = {
        user_email: '',
        user_password: '',
        user_name: ''
      }
      this.alert = false
    },
    addUser() {
      this.addUsers(this.formSignUp)
        .then((response) => {
          const activate = {
            user_email: this.formSignUp.user_email
          }
          this.activateEmail(activate)
            .then((result) => {
              this.alert = false
              this.isSuccess = true
            })
            .catch((error) => {
              this.alert = true
              this.isMsg = error.data.msg
            })
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error.data.msg
        })
    },
    onForgot() {
      this.forgot(this.formForgot)
        .then((response) => {
          this.isShown = false
          this.alert = true
          this.isMsg = response.msg
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error.data.msg
        })
    }
  }
}
</script>

<style scoped>
.formLogin {
  max-width: 100%;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
}
.backButton {
  max-width: 100%;
  height: auto;
  background-color: transparent;
  border: none;
}
.buttonBack {
  max-width: 100%;
}
.buttonLogSign {
  font-weight: bold;
}
.card {
  margin-top: auto;
  margin-bottom: auto;
  height: auto;
  text-align: center;
  width: 400px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
}
.card-body {
  background: white;
}
.container-fluid {
  height: 700px;
  background: whitesmoke;
}
.container-fluid h3 {
  text-align: center;
}
.titleColor {
  color: #7e98df;
}
</style>
