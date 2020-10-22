<template>
  <div id="app">
    <router-view />
    <b-toast id="my-toast" variant="info" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <strong class="mr-auto">Notification</strong>
        </div>
      </template>
      {{ notification.friend_name }}: {{ notification.msg }}
    </b-toast>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      socket: io('http://localhost:3001'),
      notification: {}
    }
  },
  computed: {
    ...mapGetters({
      user: 'setUser'
    })
  },
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse']),
    setNotification() {
      this.socket.emit('joinNotification', {
        user: this.user.user_id
      })
    }
  },
  created() {
    this.interceptorRequest()
    this.interceptorResponse()
  },
  mounted() {
    this.setNotification()
    this.socket.on('notification', (data) => {
      console.log(data)
      this.notification = data
      this.$root.$emit('bv::show::toast', 'my-toast')
    })
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
