<template>
  <b-col xl="9" lg="9" md="9" class="chatPage" v-if="startChat">
    <b-row
      class="d-flex justify-content-between"
      style="padding: 10px; background: white"
    >
      <div class="friendChat">
        <div class="itemA">
          <img alt="Vue pictures" :src="urlApi + myInfo.profile_picture" />
        </div>
        <div class="itemB" style="font-weight: bold">
          <p>{{ myInfo.user_name }}</p>
        </div>
        <div class="itemC">
          <p style="font-weight: bold; color: blue">Online</p>
        </div>
      </div>
      <div class="d-flex align-items-center itemD">
        <b-button
          v-b-toggle.sidebar-right
          @click="profileFriend(myInfo.friend_id)"
        >
          <img alt="Vue pictures" src="../assets/profilemenu.png" />
        </b-button>
      </div>
    </b-row>
    <ProfileFriend></ProfileFriend>
    <b-row
      class="d-flex flex-column"
      style="padding: 10px; height: 600px; overflow: scroll"
    >
      <b-container style="width: 100%">
        <!-- <p v-if="typing">
        <em>{{ typing }} is typing a message...</em>
      </p> -->
        <b-row
          v-for="(value, index) in messageInRoomchat"
          :key="index"
          style="margin-bottom: 10px; height: auto"
        >
          <b-container v-if="value.user_id === user.user_id">
            <!-- <b-col xl="2" class="d-flex">
              <p>
            <strong>{{ value.username }}:</strong>
          </p>
            </b-col> -->
            <b-col
              class="d-flex align-content-center message"
              xl="5"
              lg="5"
              md="5"
              sm="5"
            >
              <p>{{ value.msg }}</p>
            </b-col>
          </b-container>
          <b-container v-else class="d-flex justify-content-end">
            <b-col xl="2">
              <!-- <p>
            <strong>{{ value.username }}:</strong>
          </p> -->
            </b-col>
            <b-col
              class="d-flex align-content-center friendMessage"
              xl="5"
              lg="5"
              md="5"
              sm="5"
            >
              <p>{{ value.msg }}</p>
            </b-col>
          </b-container>
        </b-row>
      </b-container>
    </b-row>
    <b-row style="background: white; height: 100px">
      <b-container class="d-flex justify-content-center align-items-center">
        <b-form-input
          style="width: 80%"
          type="text"
          v-model="message"
          placeholder="Type your message..."
        ></b-form-input>
        <b-button @click="sendMessage()" class="send" variant="primary"
          >Send</b-button
        >
      </b-container>
    </b-row>
  </b-col>
  <b-col xl="9" lg="9" md="9" class="chatPage" v-else>
    <div class="d-flex justify-content-center chatter">
      <p class="align-self-center noChat">
        Please select a chat to start messaging
      </p>
    </div>
  </b-col>
</template>

<script>
import io from 'socket.io-client'
import ProfileFriend from '../components/ProfileFriend'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Chat',
  props: ['startChat', 'myInfo'],
  data() {
    return {
      socket: io('http://localhost:3001'),
      urlApi: process.env.VUE_APP_BASE_URL + '/',
      // username: '',
      // room: '',
      message: '',
      oldRoom: '',
      // messages: [],
      typing: false // false || nama si pengetik
    }
  },
  components: {
    ProfileFriend
  },
  // watch: {
  //   message(value) {
  //     if (value) {
  //       this.socket.emit('typing', { username: this.username, room: this.room })
  //     } else {
  //       this.socket.emit('typing', false)
  //     }
  //   }
  // },
  mounted() {
    // proses get message axios
    // this.getChat()
    // this.username = this.$route.params.username
    // this.room = this.$route.params.room
    this.socket.on('chatMessage', (data) => {
      this.messageInRoomchat.push(data)
    })
    // this.socket.on('typingMessage', (data) => {
    //   this.typing = data
    // })
  },
  computed: {
    ...mapGetters({
      user: 'setUser',
      messageInRoomchat: 'getMessageInRoomchat'
    })
  },
  methods: {
    ...mapActions(['profileFriend', 'postMessage', 'getMessageByRoom']),
    sendMessage() {
      const setData = {
        user_id: this.user.user_id,
        friend_id: this.myInfo.friend_id,
        roomchat_id: this.myInfo.roomchat_id,
        msg: this.message
      }
      this.socket.emit('roomMessage', setData)
      this.postMessage(setData)
        .then((response) => {
          this.message = ''
        })
        .catch((error) => {
          console.log(error.data.msg)
        })
    },
    selectRoom(data) {
      if (this.oldRoom) {
        // console.log('sudah pernah klik room ' + this.oldRoom);
        // console.log('dan akan masuk ke room ' + data);
        this.socket.emit('changeRoom', { oldRoom: this.oldRoom, newRoom: data })
        this.oldRoom = data
      } else {
        // console.log('belum pernah klik room');
        // console.log('dan akan masuk ke room ' + data);
        this.socket.emit('welcomeMessage', {
          room: data.roomchat_id
        })
        this.oldRoom = data
      }
    }
    // sendMessage() {
    //   //  const setData = {
    //   //     username: this.username,
    //   //     message: this.message
    //   //   }
    //   // Global == semua orang dapat melihatt
    //   // Private = hanya kita saja yang dapat melihat
    //   // Broadcast = semua orang dapat melihat kecuali kita
    //   //   this.socket.emit('globalMessage', setData)
    //   //   this.socket.emit('privateMessage', setData)
    //   //   this.socket.emit('broadcastMessage', setData)
    //   // ===================================================
    //   const setData = {
    //     username: this.username,
    //     message: this.message,
    //     room: this.room
    //   }
    //   this.socket.emit('roomMessage', setData)
    //   // bikin fungsi simpan ke database
    //   this.message = ''
    // }
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

.itemD {
  width: auto;
  background: transparent;
  background-color: transparent;
}

.itemD button {
  background-color: transparent;
  border: transparent;
}

.itemD button img {
  width: 20px;
  max-width: 100%;
  height: auto;
}
.friendMessage {
  border-radius: 20px 20px 0 20px;
  background-color: #f6be00;
  color: white;
}
.friendMessage p {
  margin-top: 16px;
  width: 500px;
}
.message {
  border-radius: 20px 20px 20px 0;
  background-color: #7e98df;
  color: white;
}
.message p {
  margin-top: 16px;
  width: 500px;
}

.noChat {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  opacity: 0.4;
}
.send {
  width: 10%;
  height: 40px;
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

@media screen and (max-width: 768px) {
  .send {
    width: 20%;
  }
}
@media screen and (max-width: 320px) {
  .send {
    width: 30%;
  }
}
</style>
