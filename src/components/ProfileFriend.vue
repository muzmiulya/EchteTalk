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
              @click="shown = false"
            >
              <img class="when-open" alt="Vue back" src="../assets/back.png" />
            </b-button>
          </div>
          <div class="flex-fill">
            <h3 class="titleColor" style="text-align: center">
              @{{ form2.friend_name }}
            </h3>
          </div>
        </b-row>
        <b-row
          class="profiles d-flex flex-column justify-content-center align-content-center"
        >
          <div class="profileImage">
            <b-img rounded="circle" :src="urlApi + form2.friend_picture" />
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
            <h6 style="font-weight: bold">Email</h6>
          </div>
          <div>
            <p>@{{ form2.friend_email }}</p>
          </div>
          <div>
            <h6 style="font-weight: bold">Phone Number</h6>
          </div>
          <div>
            <p>{{ form2.friend_phone }}</p>
          </div>
          <div>
            <h6 style="font-weight: bold">Bio</h6>
          </div>
          <div>
            <p>{{ form2.friend_bio }}</p>
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
export default {
  name: 'ProfileFriend',
  props: ['form2'],
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
  //   mounted() {
  //   this.$getLocation()
  //     .then((coordinates) => {
  //       this.coordinate = {
  //         lat: this.form2.friend_lat,
  //         lng: this.form2.friend_lng
  //       }
  //     })
  //     .catch((error) => {
  //       alert(error)
  //     })
  //   },
  //   created() {
  //     this.$getLocation()
  //       .then((coordinates) => {
  //         this.coordinate = {
  //           lat: 4545,
  //           lng: 2000
  //         }
  //       })
  //       .catch((error) => {
  //         alert(error)
  //       })
  //   },
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
      this.$getLocation()
        .then((coordinates) => {
          this.coordinate = {
            lat: this.form2.friend_lat,
            lng: this.form2.friend_lng
          }
        })
        .catch((error) => {
          alert(error)
        })
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
