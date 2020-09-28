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
                >
                  <div
                    class="d-flex flex-column justify-content-start popovers"
                  >
                    <b-button variant="primary" @click="shown = true">
                      <img alt="Vue setting" src="../assets/Settings.png" />
                      Setting</b-button
                    >
                    <b-button v-b-modal.modalContact variant="primary">
                      <img alt="Vue contact" src="../assets/contacts.png" />
                      Contacts</b-button
                    >
                    <b-button v-b-modal.modalInvite variant="primary">
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
                        :src="require('../assets/rose.png')"
                      >
                      </b-img>
                      <h6>{{ item.user_email }}</h6>
                      <p>{{ item.user_name }}</p>
                      <p>{{ item.user_phone }}</p>
                      <b-button @click="seeItem(item)" variant="primary"
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
            <!-- <b-row
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
            </b-row> -->
            <b-row style="height: 600px; overflow: auto">
              <b-card v-for="(item, index) in friend" :key="index">
                <div class="gridbox">
                  <div class="friends">
                    <div class="item-a">
                      <b-img
                        alt="Vue pictures"
                        :src="urlApi + friend[0].profile_picture"
                      />
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
            <b-row class="d-flex">
              <div class="buttonBack">
                <b-button
                  v-b-tooltip.hover.top="'Back'"
                  class="backs"
                  @click="shown = false"
                >
                  <img alt="Vue back" src="../assets/back.png" />
                </b-button>
              </div>
              <div class="flex-fill center">
                <h3 class="titleColor">@{{ myId.user_name }}</h3>
              </div>
            </b-row>
            <b-row
              class="profiles d-flex flex-column justify-content-center align-content-center"
            >
              <div class="profileImage">
                <b-img rounded="circle" :src="urlApi + myId.profile_picture" />
              </div>
            </b-row>
            <b-row
              class="d-flex flex-column align-content-center justify-content-center text-center"
            >
              <div>
                <h5 style="font-weight: bold">{{ myId.user_name }}</h5>
              </div>
              <div>
                <h6>@{{ myId.user_name }}</h6>
              </div>
            </b-row>
            <b-row style="padding: 20px" class="d-flex flex-column">
              <div>
                <h5 style="font-weight: bold">Account</h5>
              </div>
              <div>
                <h6>{{ myId.user_phone }}</h6>
              </div>
              <hr />
              <div>
                <h6 style="font-weight: bold">@{{ myId.user_name }}</h6>
              </div>
              <div>
                <p>Username</p>
              </div>
              <hr />
              <div>
                <h6 style="font-weight: bold">
                  {{ myId.profile_bio }}
                </h6>
              </div>
              <div>
                <p>Bio</p>
              </div>
              <hr />
              <div>
                <h5 style="font-weight: bold">Settings</h5>
              </div>
              <div class="d-flex justify-content-start notificationSetting">
                <b-button
                  class="d-flex flex-fill"
                  style="background-color: transparent; color: black"
                >
                  <img rounded="circle" :src="require('../assets/Union.png')" />
                  <h6 style="padding-left: 20px">Notification</h6>
                </b-button>
              </div>
              <br />
              <div class="d-flex justify-content-start notificationSetting">
                <b-button
                  v-b-modal.updateModal
                  class="d-flex flex-fill"
                  style="background-color: transparent; color: black"
                  @click="setUsers()"
                >
                  <img
                    rounded="circle"
                    :src="require('../assets/update.png')"
                  />
                  <h6 style="padding-left: 20px">Update</h6>
                </b-button>
              </div>
              <b-modal
                id="updateModal"
                title="Update User"
                hide-footer
                no-close-on-backdrop
                @close="alertClose()"
              >
                <b-container>
                  <b-alert v-bind:show="alert">{{ msg }}</b-alert>
                  <form class="formAdd">
                    <b-form-input
                      type="text"
                      v-model="form.user_name"
                      placeholder="User Name"
                      required
                    ></b-form-input>
                    <br />
                    <b-form-input
                      type="number"
                      v-model="form.user_phone"
                      placeholder="User Phone"
                      required
                    ></b-form-input>
                    <br />
                    <b-form-input
                      type="text"
                      v-model="form.profile_bio"
                      placeholder="User Bio"
                      required
                    ></b-form-input>
                    <br />
                    <b-form-file
                      id="inputPi"
                      type="file"
                      @change="handleFile"
                      placeholder="Choose a file..."
                      drop-placeholder="Drop file here..."
                    ></b-form-file>
                    <br />
                    <hr />
                    <b-button
                      variant="primary"
                      @click="updateUser()"
                      :disabled="isDisabled"
                      >Update</b-button
                    >
                  </form>
                </b-container>
              </b-modal>
            </b-row>
          </b-container>
          <b-sidebar id="sidebar-right" right shadow>
            <div class="px-3 py-2">
              <b-container class="listPage">
                <b-row class="d-flex">
                  <div class="buttonBack">
                    <b-button
                      v-b-toggle:sidebar-right
                      v-b-tooltip.hover.top="'Back'"
                      class="backs"
                      @click="shown = false"
                    >
                      <img
                        class="when-open"
                        alt="Vue back"
                        src="../assets/back.png"
                      />
                    </b-button>
                  </div>
                  <div class="flex-fill center">
                    <h3 class="titleColor">@{{ form2.friend_name }}</h3>
                  </div>
                </b-row>
                <b-row
                  class="profiles d-flex flex-column justify-content-center align-content-center"
                >
                  <div class="profileImage">
                    <b-img
                      rounded="circle"
                      :src="urlApi + form2.friend_picture"
                    />
                  </div>
                </b-row>
                <b-row
                  class="d-flex flex-column align-content-center justify-content-center text-center"
                >
                  <div>
                    <h5 style="font-weight: bold">{{ form2.friend_name }}</h5>
                  </div>
                  <div>
                    <h6>@{{ form2.friend_name }}</h6>
                  </div>
                </b-row>
                <b-row style="padding: 20px" class="d-flex flex-column">
                  <div>
                    <h5 style="font-weight: bold">Phone Number</h5>
                  </div>
                  <div>
                    <h6>{{ form2.friend_phone }}</h6>
                  </div>
                  <hr />
                  <div>
                    <h6 style="font-weight: bold">@{{ form2.friend_name }}</h6>
                  </div>
                  <div>
                    <p>Username</p>
                  </div>
                  <hr />
                  <div>
                    <h6 style="font-weight: bold">
                      {{ form2.friend_bio }}
                    </h6>
                  </div>
                  <div>
                    <p>Bio</p>
                  </div>
                  <hr />
                </b-row>
              </b-container>
            </div>
          </b-sidebar>
        </b-col>
        <Chat></Chat>
      </b-row>
    </b-container>

    <!-- <h1>Maps</h1>
    <GmapMap
      :center="coordinate"
      :zoom="15"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :position="coordinate"
        :clickable="true"
        :draggable="true"
        @click="clickMarker"
        icon="https://img.icons8.com/color/48/000000/map-pin.png"
      />
    </GmapMap> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddFriends from '../components/AddFriends'
import Chat from '../components/Chat'
export default {
  name: 'Home',
  data() {
    return {
      urlApi: process.env.VUE_APP_BASE_URL + '/',
      coordinate: {
        lat: 0,
        lng: 0
      },
      show: false,
      shown: false,
      placements: 'bottomleft',
      alert: false,
      msg: '',
      form: {
        user_name: '',
        user_phone: '',
        profile_bio: '',
        profile_picture: {}
      },
      form2: {
        friend_id: '',
        friend_email: '',
        friend_name: '',
        friend_phone: '',
        friend_bio: '',
        friend_picture: ''
      },
      friend_id: ''
    }
  },
  components: {
    AddFriends,
    Chat
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
      })
      .catch((error) => {
        alert(error)
      })
  },
  mounted() {
    this.handleGetRoomUser()
    this.handleMyProfile()
  },
  computed: {
    ...mapGetters({
      user: 'setUser',
      friend: 'getFriend',
      myId: 'getMyId',
      otherUser: 'getOtherUser'
    }),
    isDisabled() {
      return (
        this.form.user_name <= 0 ||
        this.form.user_phone <= 0 ||
        this.form.profile_bio <= 0
      )
    }
  },
  methods: {
    ...mapActions({ handleLogout: 'logout' }),
    ...mapActions(['getRoom', 'getIdByRoom', 'getUserById', 'updateMyUser']),
    onClose() {
      this.show = false
    },
    alertClose() {
      this.alert = false
    },
    seeItem(data) {
      console.log(data)
    },
    setFriendUsers(data) {
      this.form2 = {
        friend_id: data.friend_id,
        friend_email: data.user_email,
        friend_name: data.user_name,
        friend_phone: data.user_phone,
        friend_bio: data.profile_bio,
        friend_picture: data.profile_picture
      }
    },
    setUsers() {
      this.form = {
        user_name: this.myId.user_name,
        user_phone: this.myId.user_phone,
        profile_bio: this.myId.profile_bio,
        profile_picture: this.myId.profile_picture
      }
      this.user_id = this.myId.user_id
    },
    updateUser() {
      const data = new FormData()
      data.append('user_name', this.form.user_name)
      data.append('user_phone', this.form.user_phone)
      data.append('profile_bio', this.form.profile_bio)
      data.append('profile_picture', this.form.profile_picture)
      const setData = {
        user_id: this.user_id,
        form: data
      }
      this.updateMyUser(setData)
        .then((response) => {
          console.log(response)
          this.alert = true
          this.msg = response.msg
          this.getUserById(this.user)
        })
        .catch((error) => {
          console.log(error)
          this.alert = true
          this.msg = error.data.msg
        })
    },
    handleFile(event) {
      this.form.profile_picture = event.target.files[0]
      console.log(event.target.files[0])
    },
    handleMyProfile() {
      this.getUserById(this.user)
    },
    handleGetRoomUser(event) {
      this.getRoom(this.user)
        .then((response) => {
          // console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getListFriend() {
      console.log(this.user)
    },
    clickMarker(position) {
      console.log('clicked')
      console.log(position.latLng.lat())
      console.log(position.latLng.lng())
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
    }
  }
}
</script>

<style scoped>
/* div {
  border: 1px solid black;
} */
.collapsed > .when-open {
  display: none;
}

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
.backs {
  max-width: 40px;
  height: auto;
  background-color: transparent;
  border: none;
}

.backs img {
  max-width: 40px;
  width: 100%;
  height: auto;
}
.buttonBack {
  max-width: 100%;
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
.chatter {
  height: 100%;
}
.noChat {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  opacity: 0.4;
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
.notificationSetting img {
  width: 25px;
  height: auto;
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

.profileImage {
  width: 70px;
  height: auto;
}

.profileImage img {
  max-width: 100%;
  max-height: 100%;
}
.profiles {
  height: 120px;
}
.titleColor {
  color: #7e98df;
}
</style>
