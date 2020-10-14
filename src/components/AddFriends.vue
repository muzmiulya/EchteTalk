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
    <form ref="form" @submit.prevent="showModal = false">
      <b-form-group
        label="Email"
        label-for="email-input"
        invalid-feedback="Email is required"
      >
        <b-form-input
          type="search"
          id="email-input"
          v-model="searching"
          @change="handleSearch"
          required
        ></b-form-input>
      </b-form-group>
    </form>
    <b-row>
      <b-col xl="4" v-for="(item, index) in users" :key="index">
        <b-card class="jpeg">
          <b-img style="max-width: 100%" :src="urlApi + item.profile_picture">
          </b-img>
          <h6>{{ item.user_email }}</h6>
          <p>{{ item.user_name }}</p>
          <p>{{ item.user_phone }}</p>
          <b-button
            :disabled="isDisabled(item)"
            @click="addFriendss(item)"
            variant="primary"
            >Add Friend</b-button
          >
          <!-- <b-button v-show="isDisabled(item)" variant="primary" disabled>
            <b-img
              style="max-width: 20px"
              :src="require('../assets/check.png')"
            >
            </b-img>
          </b-button> -->
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
      }
      // isDisabled: false
    }
  },
  //   created() {
  //     this.inviteFriends()
  //   },
  computed: {
    ...mapGetters({
      user: 'setUser',
      users: 'getUsers',
      friend: 'getFriend',
      email: 'getEmail'
    })
  },
  methods: {
    ...mapActions(['inviteFriends', 'add', 'getRoom']),
    ...mapMutations(['setSearch']),

    closeModal() {
      this.users.length = 0
      this.form.user_email = ''
    },
    isDisabled(item, index) {
      if (this.friend) {
        for (let x in this.friend) {
          if (this.friend[x].user_email === item.user_email) {
            return true
          }
        }
      } else {
        return false
      }
    },
    handleSearch(event) {
      this.setSearch(event)
      this.inviteFriends()
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addFriendss(data) {
      const setData = {
        user_id: this.user.user_id,
        friend_id: data.user_id
      }
      this.add(setData)
        .then((response) => {
          this.handleSearch(this.email)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.jpeg img {
  width: 100%;
}
</style>
