<template>
  <div>
    <b-row class="d-flex">
      <div class="buttonBack">
        <b-button v-b-tooltip.hover.top="'Back'" class="backs" @click="showz()">
          <img alt="Vue back" src="../assets/back.png" />
        </b-button>
      </div>
      <div class="flex-fill">
        <h3 class="titleColor" style="text-align: center">
          @{{ myId.user_name }}
        </h3>
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
        <h6 style="font-weight: bold">Email</h6>
      </div>
      <div>
        <p>@{{ myId.user_email }}</p>
      </div>
      <div>
        <h6 style="font-weight: bold">Phone Number</h6>
      </div>
      <div>
        <p>{{ myId.user_phone }}</p>
      </div>

      <div>
        <h6 style="font-weight: bold">Bio</h6>
      </div>
      <div>
        <p>{{ myId.profile_bio }}</p>
      </div>
      <div>
        <h6 style="font-weight: bold">Location</h6>
      </div>
      <GmapMap
        :center="coordinate"
        :zoom="15"
        map-type-id="terrain"
        style="width: 300px; height: 200px"
      >
        <GmapMarker
          :position="coordinate"
          :clickable="true"
          :draggable="true"
          @click="clickMarker"
          icon="https://img.icons8.com/color/48/000000/map-pin.png"
        />
      </GmapMap>
      -->
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
          <img rounded="circle" :src="require('../assets/update.png')" />
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
          <b-alert variant="success" v-bind:show="alert">{{ msg }}</b-alert>
          <b-alert variant="danger" v-bind:show="alertError">{{
            msgError
          }}</b-alert>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Profile',
  data() {
    return {
      shown: false,
      urlApi: process.env.VUE_APP_BASE_URL + '/',
      form: {
        user_name: '',
        user_phone: '',
        profile_bio: '',
        profile_picture: {}
      },
      alert: false,
      msg: '',
      alertError: false,
      msgError: '',
      coordinate: {
        lat: 0,
        lng: 0
      }
    }
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
  computed: {
    ...mapGetters({
      user: 'setUser',
      myId: 'getMyId'
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
    ...mapActions(['updateMyUser', 'getUserById']),
    showz() {
      this.$emit('showns')
    },
    alertClose() {
      this.alert = false
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
          this.alert = true
          this.msg = response.msg
          this.getUserById(this.user)
        })
        .catch((error) => {
          this.alertError = true
          this.msgError = error.data.msg
        })
    },
    handleFile(event) {
      this.form.profile_picture = event.target.files[0]
      console.log(event.target.files[0])
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
.notificationSetting img {
  width: 25px;
  height: auto;
}
.profiles {
  height: 120px;
}
.profileImage {
  width: 70px;
  height: auto;
}

.profileImage img {
  max-width: 100%;
  max-height: 100%;
}
.titleColor {
  color: #7e98df;
}
</style>
