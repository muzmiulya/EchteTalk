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
        <b-alert variant="success" v-bind:show="alert">{{ isMsg }}</b-alert>
        <b-alert variant="danger" v-bind:show="alertError">{{
          msgError
        }}</b-alert>
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
            <router-link
              class="d-flex justify-content-end buttonLogSign btn-block"
              style="padding-right: 20px"
              to="/reset"
            >
              <p>Forgot password?</p>
            </router-link>
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
          @click=";(isShown = !isShown), onReset()"
          >Sign up</b-link
        >
      </b-card>
      <b-card class="align-content-center" v-show="isShown">
        <b-alert variant="success" v-bind:show="alert">{{ isMsg }}</b-alert>
        <b-alert variant="danger" v-bind:show="alertError">{{
          msgError
        }}</b-alert>
        <b-row class="d-flex">
          <div class="buttonBack">
            <b-button
              v-b-tooltip.hover.top="'Back'"
              @click=";(isShown = !isShown), onResetSignUp()"
              class="flex-fill backButton"
            >
              <img alt="Vue back" src="../assets/back.png" />
            </b-button>
          </div>
          <div class="flex-fill">
            <h3 class="titleColor">Register</h3>
          </div>
        </b-row>
        <form @submit.prevent="addUser">
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
    </div>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      coordinate: {
        lat: 0,
        lng: 0
      },
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
      isShown: false,
      showForgot: false,
      alert: false,
      isMsg: '',
      alertError: false,
      msgError: ''
    }
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
      })
      .catch((error) => {
        alert(error)
      })
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
    }
  },
  methods: {
    ...mapActions(['login', 'addUsers', 'forgot', 'updateLocation']),
    onSubmit() {
      this.login(this.form)
        .then((result) => {
          const setData = {
            user_id: result.user_id,
            form: {
              user_lat: this.coordinate.lat,
              user_lng: this.coordinate.lng
            }
          }
          this.updateLocation(setData)
            .then((update) => {
              this.alert = true
              this.isMsg = update
            })
            .catch((errors) => {
              this.alertError = true
              this.msgError = errors
            })
          this.alert = true
          this.isMsg = result.msg
          this.alertError = false
          this.$router.push('/')
        })
        .catch((error) => {
          this.alertError = true
          this.msgError = error
          this.alert = false
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
      this.alert = false
      this.alertError = false
    },
    onResetSignUp() {
      this.formSignUp = {
        user_email: '',
        user_password: '',
        confirm_password: '',
        user_name: '',
        user_phone: ''
      }
      this.alert = false
      this.alertError = false
    },
    addUser() {
      const setData = {
        user_email: this.formSignUp.user_email,
        user_password: this.formSignUp.user_password,
        confirm_password: this.formSignUp.confirm_password,
        user_name: this.formSignUp.user_name,
        user_phone: this.formSignUp.user_phone,
        user_lat: this.coordinate.lat,
        user_lng: this.coordinate.lng
      }
      this.addUsers(setData)
        .then((response) => {
          this.alert = true
          this.isMsg = response.msg
          this.alertError = false
          this.formSignUp = {
            user_email: '',
            user_password: '',
            confirm_password: '',
            user_name: '',
            user_phone: ''
          }
        })
        .catch((error) => {
          this.alertError = true
          this.msgError = error.data.msg
          this.alert = false
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
  max-width: 40px;
  width: 100%;
  height: auto;
  background-color: transparent;
  border: none;
}

.backButton img {
  max-width: 50px;
  width: 100%;
  height: auto;
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
