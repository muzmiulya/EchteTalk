<template>
  <b-modal
    id="modalInvite"
    size="lg"
    data-backdrop="static"
    no-close-on-backdrop
    no-close-on-esc
    hide-footer
    @close="closeModal()"
  >
    <form ref="form" @submit.prevent="handleSearch(searching)">
      <b-form-group
        label="Email"
        label-for="email-input"
        invalid-feedback="Email is required"
      >
        <b-form-input
          type="search"
          id="email-input"
          v-model="searching"
          required
        ></b-form-input>
      </b-form-group>
    </form>
    <b-alert variant="danger" v-bind:show="alert">{{ showMsg }}</b-alert>
    <b-alert variant="danger" v-bind:show="alertError">{{ msgError }}</b-alert>
    <b-row>
      <b-col xl="4" v-for="(item, index) in users" :key="index">
        <b-card class="jpeg">
          <b-img style="max-width: 100%" :src="urlApi + item.profile_picture">
          </b-img>
          <h6>{{ item.user_email }}</h6>
          <p>{{ item.user_name }}</p>
          <p>{{ item.user_phone }}</p>
          <b-button
            v-if="!isDisabled(item)"
            @click="addFriendss(item)"
            variant="primary"
            >Add Friend</b-button
          >
        </b-card>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'AddFriends',
  data() {
    return {
      urlApi: process.env.VUE_APP_BASE_URL + '/',
      searching: '',
      form: {
        user_email: ''
      },
      alert: false,
      showMsg: '',
      alertError: false,
      msgError: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'setUser',
      users: 'getUsers',
      friend: 'getFriend',
      email: 'getEmail'
    })
  },
  methods: {
    ...mapActions(['inviteFriends', 'add', 'getRoom', 'getFriends']),
    ...mapMutations(['setSearch']),

    closeModal() {
      this.users.length = 0
      this.form.user_email = ''
      this.searching = ''
      this.alert = false
      this.alertError = false
    },
    isDisabled(item, index) {
      if (this.friend) {
        for (let x in this.friend) {
          if (
            this.friend[x].user_email === item.user_email ||
            this.user.user_id === item.user_id
          ) {
            return true
          }
        }
      } else {
        return false
      }
    },
    handleSearch(searching) {
      this.setSearch(searching)
      this.inviteFriends()
    },
    addFriendss(data) {
      if (data.user_id === this.user.user_id) {
        this.alert = true
        this.showMsg = "can't add your own contact"
      } else {
        const setData = {
          user_id: this.user.user_id,
          friend_id: data.user_id
        }
        this.add(setData)
          .then((response) => {
            this.alert = false
            this.getFriends(this.user)
          })
          .catch((error) => {
            this.alertError = true
            this.msgError = error.data.msg
            this.alert = false
          })
      }
    }
  }
}
</script>

<style scoped>
.jpeg img {
  width: 100%;
}
</style>
