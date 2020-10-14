<template>
  <b-col xl="9" class="chatPage" v-if="startChat">
    <b-row style="padding: 10px; background: white">
      <div class="friendChat">
        <div class="itemA">
          <img alt="Vue pictures" :src="urlApi + myInfo.profile_picture" />
        </div>
        <div class="itemB">
          <p>{{ myInfo.user_name }}</p>
        </div>
        <div class="itemC">
          <p>Online</p>
        </div>
      </div>
    </b-row>
    <b-row class="d-flex flex-column" style="padding: 10px; height: 600px">
      <p v-if="typing">
        <em>{{ typing }} is typing a message...</em>
      </p>
      <!-- <p v-for="(value, index) in messages" :key="index">
        <strong>{{ value.username }} :</strong>
        {{ value.message }}
      </p> -->
      <!-- <b-card class="text" > -->
      <b-row
        v-for="(value, index) in messages"
        :key="index"
        style="margin-bottom: 10px; height: auto"
      >
        <b-col xl="2" class="d-flex">
          <!-- <b-img rounded="circle" :src="require('../assets/rose.png')">
            </b-img> -->
          <p>
            <strong>{{ value.username }}:</strong>
          </p>
        </b-col>
        <b-col class="d-flex align-content-center message" xl="5">
          <p style="width: 500px">{{ value.message }}</p>
        </b-col>
      </b-row>
      <!-- </b-card> -->
      <!-- <b-card class="text">
        <b-row>
          <b-col xl="2" class="d-flex align-self-end textIn">
            <b-img rounded="circle" :src="require('../assets/rose.png')">
            </b-img>
          </b-col>
          <b-col class="message" xl="5">
            <p>Hi, Son how are you doing?</p>
          </b-col>
        </b-row>
      </b-card> -->
    </b-row>
    <b-row class="d-flex">
      <b-form-input
        style="width: 90%"
        type="text"
        v-model="message"
        placeholder="Type your message..."
      ></b-form-input>
      <b-button
        style="width: 10%"
        @click="sendMessage"
        class="send"
        variant="primary"
        >Send</b-button
      >
      <!-- <input
        class="message"
        type="text"
        v-model="message"
        placeholder="Message"
      />
      <button class="send" @click="sendMessage">Send</button> -->
    </b-row>
  </b-col>
  <b-col xl="9" class="chatPage" v-else>
    <div class="d-flex justify-content-center chatter">
      <p class="align-self-center noChat">
        Please select a chat to start messaging
      </p>
    </div>
  </b-col>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters } from 'vuex'
export default {
  name: 'Chat',
  props: ['startChat', 'myInfo'],
  data() {
    return {
      socket: io('http://localhost:3001'),
      urlApi: process.env.VUE_APP_BASE_URL + '/',
      username: '',
      room: '',
      message: '',
      messages: [],
      typing: false // false || nama si pengetik
    }
  },
  watch: {
    message(value) {
      if (value) {
        this.socket.emit('typing', { username: this.username, room: this.room })
      } else {
        this.socket.emit('typing', false)
      }
    }
  },
  mounted() {
    // proses get message axios
    // this.getChat()
    // this.username = this.$route.params.username
    // this.room = this.$route.params.room
    this.username = this.user.user_name
    this.room = this.myInfo.room_id
    this.socket.emit('welcomeMessage', {
      username: this.username,
      room: this.room
    })
    this.socket.on('chatMessage', (data) => {
      this.messages.push(data)
    })
    this.socket.on('typingMessage', (data) => {
      this.typing = data
    })
  },
  computed: {
    ...mapGetters({
      user: 'setUser'
    })
  },
  methods: {
    sendMessage() {
      //  const setData = {
      //     username: this.username,
      //     message: this.message
      //   }
      // Global == semua orang dapat melihatt
      // Private = hanya kita saja yang dapat melihat
      // Broadcast = semua orang dapat melihat kecuali kita
      //   this.socket.emit('globalMessage', setData)
      //   this.socket.emit('privateMessage', setData)
      //   this.socket.emit('broadcastMessage', setData)
      // ===================================================
      const setData = {
        username: this.username,
        message: this.message,
        room: this.room
      }
      this.socket.emit('roomMessage', setData)
      // bikin fungsi simpan ke database
      this.message = ''
    }
  }
}
</script>

<style scoped>
.chatPage {
  background: whitesmoke;
  max-width: 100%;
  overflow: auto;
  height: 800px;
}

.chatter {
  height: 100%;
}
.friendChat {
  display: grid;
  width: 200px;
  max-width: 100%;
  height: 80px;
  grid-template-rows: 50% 50%;
  grid-template-columns: 40% 5% 55%;
  grid-template-areas:
    'a . b'
    'a . c';
}

.itemA {
  max-width: 100%;
  height: auto;
  grid-area: a;
}
.itemA img {
  object-fit: cover;
  border-radius: 5px 5px 5px 5px;
  width: 100%;
  height: 100%;
}
.itemB {
  font-size: 15px;
  grid-area: b;
}

.itemC {
  grid-area: c;
}

.message {
  border-radius: 20px 20px 20px 0;
  background-color: #7e98df;
  color: white;
}

.noChat {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  opacity: 0.4;
}
.text {
  background-color: transparent;
  width: 500px;
  height: 100px;
  max-height: 100%;
}

.textIn img {
  max-width: 100%;
  max-height: 100%;
}
</style>
