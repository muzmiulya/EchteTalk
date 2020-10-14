<template>
  <div class="home">
    <b-container fluid>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
        integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
        crossorigin="anonymous"
      />
      <b-row>
        <b-col xl="3">
          <b-container v-if="!shown" class="listPage">
            <b-row class="d-flex justify-content-between">
              <h3 class="listTitle">EchteTalk</h3>
              <div>
                <b-button id="popoverMenu" class="flex-fill listButton">
                  <img alt="Vue back" src="../assets/Menu.png" />
                </b-button>
                <b-popover
                  target="popoverMenu"
                  :placement="placements"
                  :show.sync="show"
                  triggers="click"
                  class="popoverB"
                  variant="info"
                >
                  <div
                    class="d-flex flex-column justify-content-start popovers"
                  >
                    <b-button
                      variant="primary"
                      @click=";(shown = true), handleMyProfile()"
                    >
                      <img alt="Vue setting" src="../assets/Settings.png" />
                      Setting</b-button
                    >
                    <b-button
                      ref="btnShow"
                      variant="primary"
                      @click="onClose()"
                    >
                      <img alt="Vue contact" src="../assets/contacts.png" />
                      Contacts</b-button
                    >
                    <b-button
                      @click="closeInvite()"
                      variant="primary"
                      ref="btnShows"
                    >
                      <img
                        alt="Vue add friends"
                        src="../assets/Invite-friends.png"
                      />
                      Invite Friends</b-button
                    >
                    <b-button
                      variant="primary"
                      v-b-tooltip.hover.top="'Logout'"
                      @click="handleLogout"
                    >
                      <img alt="Vue logout" src="../assets/logout-2.png" />
                      Logout</b-button
                    >
                  </div>
                </b-popover>
              </div>
              <AddFriends></AddFriends>
              <b-modal
                id="modalContact"
                size="xl"
                data-backdrop="static"
                no-close-on-backdrop
                no-close-on-esc
                hide-footer
              >
                <b-row>
                  <b-col xl="3" v-for="(item, index) in friend" :key="index">
                    <b-card class="text">
                      <b-img
                        style="max-width: 100%"
                        :src="urlApi + item.profile_picture"
                      >
                      </b-img>
                      <h6>{{ item.user_email }}</h6>
                      <p>{{ item.user_name }}</p>
                      <p>{{ item.user_phone }}</p>
                      <b-button @click="makeRoomchat(item)" variant="primary"
                        >Chat</b-button
                      >
                    </b-card>
                  </b-col>
                </b-row>
              </b-modal>
            </b-row>
            <b-row
              class="searchAndAdd d-flex justify-content-between align-content-center"
            >
              <b-input-group class="searchMessage">
                <b-input-group-prepend>
                  <span class="input-group-text"
                    ><i class="fa fa-search fa-lg"></i
                  ></span>
                </b-input-group-prepend>
                <b-form-input
                  type="search"
                  placeholder="Type your message..."
                ></b-form-input>
              </b-input-group>
              <b-button class="d-flex justify-content-end addButton">
                <img alt="Vue back" src="../assets/add.png" />
              </b-button>
            </b-row>
            <b-row
              class="searchAndAdd d-flex justify-content-between align-content-center"
            >
              <b-button class="buttonMiddle" variant="outline-info">
                All
              </b-button>
              <b-button class="buttonMiddle" variant="outline-info">
                Important
              </b-button>
              <b-button class="buttonMiddle" variant="outline-info">
                Unread
              </b-button>
            </b-row>
            <b-row style="height: 600px; overflow: auto">
              <b-card v-for="(item, index) in roomchat" :key="index">
                <div class="gridbox">
                  <div class="friends">
                    <div class="item-a">
                      <b-link type="button" @click="getRoomChat(item)">
                        <b-img
                          alt="Vue pictures"
                          :src="urlApi + item.profile_picture"
                        />
                      </b-link>
                    </div>
                    <div class="item-b">
                      <b-link
                        style="color: black"
                        class="buttonLogSign"
                        variant="light"
                        type="button"
                        @click="setFriendUsers(item)"
                        v-b-toggle.sidebar-right
                        >{{ item.user_name }}</b-link
                      >
                      <!-- <p>{{ item.user_name }}</p> -->
                    </div>
                    <div class="item-d">
                      <p>15:20</p>
                    </div>
                    <div class="item-e">
                      <p>Why did you do that?</p>
                    </div>
                    <div
                      class="d-flex align-self-center justify-content-center item-f"
                    >
                      <span class="badge badge-pill badge-primary">1</span>
                    </div>
                  </div>
                </div>
              </b-card>
            </b-row>
          </b-container>
          <b-container class="listPage" v-else>
            <Profile @showns="shows"></Profile>
          </b-container>
          <ProfileFriend :form2="form2"></ProfileFriend>
        </b-col>
        <Chat :myInfo="myInfo" :startChat="startChat"></Chat>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddFriends from '../components/AddFriends'
import Chat from '../components/Chat'
import Profile from '../components/Profile'
import ProfileFriend from '../components/ProfileFriend'
export default {
  name: 'Home',
  data() {
    return {
      urlApi: process.env.VUE_APP_BASE_URL + '/',
      show: false,
      shown: false,
      placements: 'bottomleft',
      alert: false,
      msg: '',
      friend_id: '',
      form2: {
        friend_id: '',
        friend_email: '',
        friend_name: '',
        friend_phone: '',
        friend_bio: '',
        friend_picture: '',
        friend_lat: '',
        friend_lng: ''
      },
      startChat: false,
      myInfo: {},
      bodyBgVariant: 'light'
    }
  },
  components: {
    AddFriends,
    Chat,
    Profile,
    ProfileFriend
  },

  mounted() {
    // this.handleGetRoomUser()
    this.handleGetFriend()
    this.handleRoomChat()
    // this.handleMyProfile()
  },
  computed: {
    ...mapGetters({
      user: 'setUser',
      // friend: 'getFriend',
      friend: 'getFriend',
      otherUser: 'getOtherUser',
      roomchat: 'getRoomchat'
    })
  },
  methods: {
    ...mapActions({ handleLogout: 'logout' }),
    ...mapActions([
      // 'getRoom',
      'getFriends',
      'getUserById',
      'getMessageByRoom',
      'postRoom',
      'getAllRoomChat'
    ]),
    onClose() {
      this.$root.$emit('bv::show::modal', 'modalContact', '#btnShow')
      this.show = false
    },
    closeInvite() {
      this.$root.$emit('bv::show::modal', 'modalInvite', '#btnShows')
      this.show = false
    },
    shows() {
      this.shown = false
    },
    makeRoomchat(item) {
      const setData = {
        user_id: this.user.user_id,
        friend_id: item.friend_id
      }
      this.postRoom(setData)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleMyProfile() {
      this.getUserById(this.user)
    },
    getRoomChat(item) {
      this.startChat = true
      this.myInfo = {
        friend_id: item.friend_id,
        profile_bio: item.profile_bio,
        profile_picture: item.profile_picture,
        roomchat_id: item.roomchat_id,
        user_email: item.user_email,
        user_id: item.user_id,
        user_name: item.user_name,
        user_phone: item.user_phone
      }
      console.log(this.myInfo)
      // this.getMessageByRoom(item.roomchat_id)
    },
    // handleGetRoomUser(event) {
    //   this.getRoom(this.user)
    //     .then((response) => {
    //       // console.log(response)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    handleGetFriend() {
      this.getFriends(this.user)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error.data.msg)
        })
    },
    handleRoomChat() {
      this.getAllRoomChat(this.user.user_id)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error.data.msg)
        })
    },
    setFriendUsers(data) {
      this.form2 = {
        friend_id: data.friend_id,
        friend_email: data.user_email,
        friend_name: data.user_name,
        friend_phone: data.user_phone,
        friend_bio: data.profile_bio,
        friend_picture: data.profile_picture,
        friend_lat: data.user_lat,
        friend_lng: data.user_lng
      }
      console.log(this.form2)
    }
  }
}
</script>

<style scoped>
/* div {
  border: 1px solid black;
} */

.addButton {
  background-color: transparent;
  border: none;
  height: 60px;
  max-width: 100%;
  height: auto;
  width: 50px;
}

.addButton img {
  max-width: 100%;
  max-height: 100%;
  width: 50px;
}

.buttonMiddle {
  font-weight: bold;
}
.btn-outline-info {
  color: black !important;
  border-color: transparent !important;
}
.card-body {
  background: transparent;
}
.center {
  text-align: center;
}

.dropdownFriends {
  background-color: transparent;
}
.dropdownIcon {
  background-color: transparent;
  width: 25px;
  max-width: 100%;
  height: auto;
}

.listButton {
  max-width: 50px;
  background: transparent;
  border: none;
}
.listButton img {
  max-width: 100%;
  max-height: 100%;
}

.listPage {
  height: 700px;
  padding: 10px;
}

.listTitle {
  color: #7e98df;
}

.searchAndAdd {
  height: 70px;
}
.searchMessage {
  max-width: 100%;
  width: 250px;
  height: 40px;
}

.friends {
  display: grid;
  max-width: 100%;
  height: 80px;
  grid-template-rows: 50% 50%;
  grid-template-columns: 25% 5% 20% 20% 10% 5%;
  grid-template-areas:
    'itema . itemb itemb itemb . itemd'
    'itema . iteme iteme iteme . itemf';
}

.item-a {
  max-width: 100%;
  height: auto;
  grid-area: itema;
}
.item-a img {
  object-fit: cover;
  border-radius: 5px 5px 5px 5px;
  width: 100%;
  height: 100%;
}
.item-b {
  font-size: 15px;
  grid-area: itemb;
}
/* .item-c {
  grid-area: itemc;
}
.item-c img {
  max-width: 100%;
  height: auto;
} */
.item-d {
  grid-area: itemd;
}
.item-e {
  font-size: 15px;
  grid-area: iteme;
}
.item-f {
  grid-area: itemf;
}

.popovers button img {
  width: 20px;
  max-width: 100%;
}
</style>
