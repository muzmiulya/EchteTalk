<template>
  <b-container fluid>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
      integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
      crossorigin="anonymous"
    />
    <div class="d-flex justify-content-center h-100">
      <b-card class="align-content-center">
        <b-alert variant="success" v-bind:show="alert">{{ isMsg }}</b-alert>
        <b-alert variant="danger" v-bind:show="alertError">{{
          msgError
        }}</b-alert>
        <b-row class="d-flex">
          <div class="buttonBack">
            <router-link class="d-flex btn-block" to="/login">
              <b-button
                v-b-tooltip.hover.top="'Back'"
                class="flex-fill backButton"
                @click="onReset()"
              >
                <img alt="Vue back" src="../assets/back.png" />
              </b-button>
            </router-link>
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
  name: 'Forgot',
  data() {
    return {
      formForgot: {
        user_email: ''
      },
      isShown: false,
      alert: false,
      isMsg: '',
      alertError: false,
      msgError: ''
    }
  },
  computed: {
    isDisabled3() {
      return this.formForgot.user_email <= 0
    }
  },
  methods: {
    ...mapActions(['forgot']),
    onReset() {
      this.formForgot = {
        user_email: ''
      }
      this.alert = false
      this.alertError = false
    },
    onForgot() {
      this.forgot(this.formForgot)
        .then((response) => {
          this.alert = true
          this.isMsg = response.msg
          this.alertError = false
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
.buttonBack {
  max-width: 100%;
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
  height: 600px;
  background: whitesmoke;
}
.container-fluid h3 {
  text-align: center;
}
.formLogin {
  max-width: 100%;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
}
.titleColor {
  color: #7e98df;
}
</style>
