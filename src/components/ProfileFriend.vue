<template>
  <b-sidebar id="sidebar-right" right shadow no-header>
    <div class="px-3 py-2">
      <b-container class="listPage">
        <b-row class="d-flex">
          <div class="buttonBack">
            <b-button
              v-b-toggle:sidebar-right
              v-b-tooltip.hover.top="'Back'"
              class="backs"
              @click=";(shown = false), (showMap = false)"
            >
              <img class="when-open" alt="Vue back" src="../assets/back.png" />
            </b-button>
          </div>
          <div class="flex-fill">
            <h3 class="titleColor" style="text-align: center">Profile</h3>
          </div>
        </b-row>
        <b-row
          class="profiles d-flex flex-column justify-content-center align-content-center"
        >
          <div class="profileImage">
            <b-img rounded="circle" :src="urlApi + friends.profile_picture" />
          </div>
        </b-row>
        <b-row
          class="d-flex flex-column align-content-center justify-content-center text-center"
        >
          <div>
            <h5 style="font-weight: bold">{{ friends.user_name }}</h5>
          </div>
        </b-row>
        <b-row style="padding: 20px" class="d-flex flex-column">
          <div>
            <h6 style="font-weight: bold">Email</h6>
          </div>
          <div>
            <p>{{ friends.user_email }}</p>
          </div>
          <div>
            <h6 style="font-weight: bold">Phone Number</h6>
          </div>
          <div>
            <p>{{ friends.user_phone }}</p>
          </div>
          <div>
            <h6 style="font-weight: bold">Bio</h6>
          </div>
          <div>
            <p>{{ friends.profile_bio }}</p>
          </div>
          <div>
            <h6 style="font-weight: bold">Location</h6>
          </div>
          <b-button variant="info" @click="getGeo(), (showMap = !showMap)">
            get Location
          </b-button>
          <GmapMap
            :center="coordinate"
            :zoom="15"
            map-type-id="terrain"
            style="width: 250px; height: 200px"
            v-if="showMap"
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
        </b-row>
      </b-container>
    </div>
  </b-sidebar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProfileFriend',
  data() {
    return {
      urlApi: process.env.VUE_APP_BASE_URL + '/',
      coordinate: {
        lat: 0,
        lng: 0
      },
      showMap: false
    }
  },
  computed: {
    ...mapGetters({
      friends: 'getMyFriend'
    })
  },
  methods: {
    clickMarker(position) {
      console.log('clicked')
      console.log(position.latLng.lat())
      console.log(position.latLng.lng())
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
    },
    getGeo() {
      const lat = Number(this.friends.user_lat)
      const lng = Number(this.friends.user_lng)
      this.coordinate = {
        lat,
        lng
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
.collapsed > .when-open {
  display: none;
}
.listPage {
  height: 700px;
  padding: 10px;
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
