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
    <form ref="form">
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
          <b-img style="max-width: 100%" :src="require('../assets/rose.png')">
          </b-img>
          <h6>{{ item.user_email }}</h6>
          <p>{{ item.user_name }}</p>
          <p>{{ item.user_phone }}</p>
          <b-button @click="addFriendss(item)" variant="primary"
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
      searching: '',
      form: {
        user_email: ''
      }
    }
  },
  //   created() {
  //     this.inviteFriends()
  //   },
  computed: {
    ...mapGetters({
      user: 'setUser',
      users: 'getUsers'
    })
  },
  methods: {
    ...mapActions(['inviteFriends', 'add', 'getRoom']),
    ...mapMutations(['setSearch']),

    closeModal() {
      this.users.length = 0
      this.form.user_email = ''
    },
    handleSearch(event) {
      this.setSearch(event)
      this.inviteFriends()
    },
    addFriendss(data) {
      const setData = {
        user_id: this.user.user_id,
        friend_id: data.user_id
      }
      this.add(setData)
        .then((response) => {
          console.log(response)
          //   this.getRoom(setData.user_id)
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
