<template>
  <div class="login-container">
    <b-row class="d-flex justify-content-center">
      <b-col md="6" sm="6" class="content-right">
        <b-container>
          <b-row>
            <b-col class="text-left">
              <h3>Reset Password</h3>
              <p>You need to change your password to activate your account</p>
            </b-col>
          </b-row>
          <b-row class="login-form">
            <b-col>
              <b-alert show variant="success" v-show="isSuccess"
                >Reset Password Success ! <br />
                Click
                <router-link to="/login">here</router-link>
                to login</b-alert
              >
              <b-alert show variant="danger" v-show="isError">{{
                error
              }}</b-alert>
              <b-form @submit.prevent="onSubmit" v-show="!isSuccess">
                <b-row class="component-form">
                  <b-col class="text-left">
                    <label for="password">Password</label>
                    <b-input
                      type="password"
                      id="password"
                      v-model="form.user_password"
                      required
                    ></b-input>
                  </b-col>
                </b-row>
                <b-row class="component-form">
                  <b-col class="text-left">
                    <label for="confirmpassword">Confirm Password</label>
                    <b-input
                      type="password"
                      id="confirmpassword"
                      v-model="form.confirm_password"
                      required
                    ></b-input>
                  </b-col>
                </b-row>
                <b-row class="component-form">
                  <b-col>
                    <b-button
                      type="submit"
                      block
                      style="
                        background-color: #fbb017;
                        border-color: transparent;
                      "
                      >Reset Password</b-button
                    >
                  </b-col>
                </b-row>
              </b-form>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      form: {},
      isError: false,
      isSuccess: false,
      error: ''
    }
  },
  methods: {
    ...mapActions(['changePassword']),
    onSubmit() {
      const payload = {
        keys: this.$route.query.keys,
        form: this.form
      }
      this.changePassword(payload)
        .then((result) => {
          this.isError = false
          this.isSuccess = true
        })
        .catch((error) => {
          this.isError = true
          this.error = error.data.msg
        })
    }
  }
}
</script>

<style scoped>
.login-container {
  background-color: #f6f7f8;
  padding: 40px 75px;
  height: 600px;
}

.login-container .content-right {
  padding: 5em 0em;
}

.login-form {
  padding: 3vh 0vw;
}

.component-form {
  padding: 1.8vh 0vw;
}
</style>
