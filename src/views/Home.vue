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
        <b-col xl="3" lg="3" md="3" class="borderRight">
          <b-container v-if="!shown" class="listPage">
            <b-row class="d-flex justify-content-between">
              <div style="margin: 0">
                <h3 class="listTitle">EchteTalk</h3>
              </div>
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
                  variant="primary"
                >
                  <div
                    class="d-flex flex-column justify-content-start popovers"
                    style="backgound-color: blue"
                  >
                    <b-button
                      variant="primary"
                      @click="
                        ;(shown = true), (show = false), handleMyProfile()
                      "
                    >
                      <img alt="Vue setting" src="../assets/Settings.png" />
                      Setting</b-button
                    >
                    <b-button
                      ref="btnShow"
                      variant="primary"
                      @click="onClose(), handleGetFriend()"
                    >
                      <img alt="Vue contact" src="../assets/contacts.png" />
                      Contacts</b-button
                    >
                    <b-button
                      @click="closeInvite(), handleGetFriend()"
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
                      @click="closeLogout()"
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
                <b-row v-if="contactExist">
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
                      <b-button
                        v-if="!inChat(item)"
                        @click="makeRoomchat(item)"
                        variant="primary"
                        >Chat</b-button
                      >
                      <b-button
                        v-if="inChat(item)"
                        @click="setDelete(item)"
                        variant="danger"
                        v-b-modal.modal-delete
                        >Delete Contact</b-button
                      >
                    </b-card>
                  </b-col>
                </b-row>
                <b-row v-else class="d-flex justify-content-center">
                  <h5>Please Add Contact</h5>
                </b-row>
              </b-modal>
              <b-modal
                id="modal-delete"
                hide-header
                hide-footer
                no-close-on-backdrop
                no-close-on-esc
              >
                <b-container class="modaldelete">
                  <div class="youSure">
                    <h3>Are You Sure?</h3>
                  </div>
                  <br />
                  <b-button
                    class="buttonCancelDel"
                    pill
                    variant="warning"
                    @click="$bvModal.hide('modal-delete')"
                    >Cancel</b-button
                  >
                  <b-button
                    class="buttonYesDel"
                    pill
                    variant="danger"
                    @click="handleDelete(), $bvModal.hide('modal-delete')"
                    >Yes</b-button
                  >
                </b-container>
              </b-modal>
              <b-modal
                id="modal-logout"
                hide-header
                hide-footer
                no-close-on-backdrop
                no-close-on-esc
              >
                <b-container class="modaldelete">
                  <div class="youSure">
                    <h3>Are You Sure?</h3>
                  </div>
                  <br />
                  <b-button
                    class="buttonCancelDel"
                    pill
                    variant="warning"
                    @click="$bvModal.hide('modal-logout')"
                    >Cancel</b-button
                  >
                  <b-button
                    class="buttonYesDel"
                    pill
                    variant="danger"
                    @click="handleLogout(), $bvModal.hide('modal-logout')"
                    >Yes</b-button
                  >
                </b-container>
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
              <div class="d-flex justify-content-end bellButton">
                <b-button
                  id="popoverNotif"
                  class="addButton"
                  @click="handleNotif()"
                >
                  <img alt="Vue back" src="../assets/notification.png" />
                </b-button>
                <b-popover
                  target="popoverNotif"
                  :placement="placements"
                  :show.sync="showns"
                  triggers="click"
                  class="popoverB"
                >
                  <b-container style="max-height: 250px; overflow-y: scroll">
                    <b-card
                      v-for="(item, index) in notification"
                      :key="index"
                      style="height: 50px; width: 200px"
                    >
                      <div class="notif">
                        <p>{{ item.user_name }}: {{ item.notif }}</p>
                      </div>
                    </b-card>
                  </b-container>
                </b-popover>
              </div>
            </b-row>
            <b-row
              class="searchAndAdd d-flex justify-content-between align-content-center"
            >
              <b-button class="buttonMiddle" variant="outline-info">
                All
              </b-button>
              <b-button class="buttonMiddle" variant="outline-info">
                Read
              </b-button>
              <b-button class="buttonMiddle" variant="outline-info">
                Unread
              </b-button>
            </b-row>
            <b-row style="height: 600px; overflow: auto">
              <b-container class="d-flex align-items-start flex-column">
                <b-card
                  v-for="(item, index) in roomchat"
                  :key="index"
                  style="height: 110px; width: 100%"
                >
                  <div class="gridbox">
                    <div class="friends">
                      <div class="item-a">
                        <b-link
                          type="button"
                          @click="getRoomChat(item), getMessageByRoom(item)"
                        >
                          <b-img
                            alt="Vue pictures"
                            :src="urlApi + item.profile_picture"
                          />
                        </b-link>
                      </div>
                      <div class="item-b">
                        <p style="color: black; font-weight: bold">
                          {{ item.user_name }}
                        </p>
                      </div>
                      <div class="item-d">
                        <p>{{ item.messageDate }}</p>
                      </div>
                      <div class="item-e">
                        <p>{{ item.latestMessage }}</p>
                      </div>
                      <div
                        class="d-flex align-self-center justify-content-center item-f"
                      >
                        <!-- <span class="badge badge-pill badge-primary">1</span> -->
                      </div>
                    </div>
                  </div>
                </b-card>
              </b-container>
            </b-row>
          </b-container>

          <b-container class="listPage" v-else>
            <Profile @showns="shows"></Profile>
          </b-container>
        </b-col>
        <Chat ref="selection" :myInfo="myInfo" :startChat="startChat"></Chat>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddFriends from '../components/AddFriends'
import Chat from '../components/Chat'
import Profile from '../components/Profile'
export default {
  name: 'Home',
  data() {
    return {
      urlApi: process.env.VUE_APP_BASE_URL + '/',
      show: false,
      shown: false,
      showns: false,
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
      bodyBgVariant: 'light',
      forms: {
        user_id: 0,
        friend_id: 0
      }
      // oldRoom: ''
    }
  },
  components: {
    AddFriends,
    Chat,
    Profile
  },

  mounted() {
    this.handleRoomChat()
  },
  computed: {
    ...mapGetters({
      user: 'setUser',
      friend: 'getFriend',
      otherUser: 'getOtherUser',
      roomchat: 'getRoomchat',
      notification: 'getNotif'
    }),
    contactExist() {
      return this.friend.length > 0
    }
  },
  methods: {
    ...mapActions({ handleLogout: 'logout' }),
    ...mapActions([
      'getFriends',
      'getUserById',
      'getMessageByRoom',
      'postRoom',
      'getAllRoomChat',
      'getNotification',
      'getRoomchatForDelete',
      'deleteContact',
      'deleteRoomchat'
    ]),
    onClose() {
      this.$root.$emit('bv::show::modal', 'modalContact', '#btnShow')
      this.show = false
    },
    closeInvite() {
      this.$root.$emit('bv::show::modal', 'modalInvite', '#btnShows')
      this.show = false
    },
    closeLogout() {
      this.$root.$emit('bv::show::modal', 'modal-logout', '#btnShow')
      this.show = false
    },
    shows() {
      this.shown = false
    },
    inChat(item) {
      if (this.roomchat) {
        for (let x in this.roomchat) {
          if (this.roomchat[x].user_email === item.user_email) {
            return true
          }
        }
      } else {
        return false
      }
    },
    makeRoomchat(item) {
      const setData = {
        user_id: this.user.user_id,
        friend_id: item.friend_id
      }
      this.postRoom(setData)
        .then((response) => {
          this.handleRoomChat()
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
      const select = this.$refs.selection
      select.selectRoom(item)
      // if (this.oldRoom) {
      //   console.log('sudah pernah klik room ' + this.oldRoom)
      //   console.log('dan akan masuk ke room ' + item)
      //   this.socket.emit('changeRoom', { oldRoom: this.oldRoom, newRoom: item })
      //   this.oldRoom = item
      // } else {
      //   console.log('belum pernah klik room')
      //   console.log('dan akan masuk ke room ' + item)
      //   this.socket.emit('welcomeMessage', {
      //     room: item.roomchat_id
      //   })
      //   this.oldRoom = item
      // }
    },
    handleGetFriend() {
      this.getFriends(this.user)
    },
    handleRoomChat() {
      this.getAllRoomChat(this.user.user_id)
    },
    handleNotif() {
      this.getNotification(this.user)
    },
    setDelete(item) {
      this.forms = {
        user_id: item.user_id,
        friend_id: item.friend_id
      }
      this.id_friend = item.id_friend
    },
    handleDelete() {
      const setData = {
        id_friend: this.id_friend,
        user_id: this.forms.user_id,
        friend_id: this.forms.friend_id
      }
      this.getRoomchatForDelete(setData)
        .then((response) => {
          this.deleteRoomchat(response.data[0])
            .then((response) => {
              this.deleteContact(setData)
                .then((response) => {
                  this.handleGetFriend()
                  this.handleRoomChat()
                  this.startChat = false
                })
                .catch((error) => {
                  console.log(error)
                })
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
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
.borderRight {
  border-right: 3px whitesmoke outset;
}
.buttonCancelDel {
  grid-area: cancel;
}
.buttonYesDel {
  grid-area: yes;
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

.friends {
  display: grid;
  max-width: 100%;
  height: 80px;
  grid-template-rows: 50% 50%;
  grid-template-columns: 25% 5% 40% 5% 25%;
  grid-template-areas:
    'itema . itemb . itemd'
    'itema . iteme . itemf';
}

.item-a {
  max-width: 100%;
  height: auto;
  grid-area: itema;
}
.item-a a img {
  object-fit: cover;
  border-radius: 5px 5px 5px 5px;
  width: 60px;
  max-width: 100%;
  height: auto;
}
.item-b {
  font-size: 15px;
  grid-area: itemb;
}

.item-b p {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item-d {
  grid-area: itemd;
  font-size: 15px;
}

.item-d p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item-e {
  font-size: 15px;
  grid-area: iteme;
}

.item-e p {
  width: 100%;
  height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item-f {
  grid-area: itemf;
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
.notif p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.modaldelete {
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: auto auto;
  grid-template-areas:
    'yousure yousure yousure'
    'cancel . yes';
}

.popover-body {
  color: #7e98df !important;
}
.popovers button img {
  width: 20px;
  max-width: 100%;
}

.searchAndAdd {
  height: 70px;
}
.searchMessage {
  max-width: 100%;
  width: auto;
  height: 40px;
}
.youSure {
  text-align: center;
  grid-area: yousure;
}

@media screen and (max-width: 1280px) {
  .searchMessage {
    width: 200px;
    height: 30px;
  }
}
@media screen and (max-width: 1180px) {
  .searchMessage {
    width: 150px;
  }
}

@media screen and (max-width: 900px) {
  .searchMessage {
    width: 120px;
  }
}

@media screen and (max-width: 768px) {
  .borderRight {
    border-right: none;
    border-bottom: 3px whitesmoke outset;
  }
  .searchMessage {
    width: 75%;
  }
}
</style>
