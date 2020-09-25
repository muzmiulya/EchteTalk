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
          <b-container class="listPage">
            <b-row class="d-flex justify-content-between">
              <h3 class="listTitle">EchteTalk</h3>
              <b-button class="flex-fill listButton">
                <img alt="Vue back" src="../assets/back.png" />
              </b-button>
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
                  v-model="searching"
                  placeholder="Type your message..."
                  v-on:change="handleSearch"
                ></b-form-input>
              </b-input-group>
              <!-- <b-button  class="d-flex justify-content-end addButton">
                <img alt="Vue back" src="../assets/add.png" />
              </b-button> -->
              <b-dropdown
                id="dropdown-right"
                right
                text="Right align"
                variant="primary"
                class="m-2 d-flex justify-content-end"
              >
                <template slot="button-content">
                  <i class="py-0 fa fa-check"></i>
                </template>
                <b-dropdown-item href="#">Action</b-dropdown-item>
                <b-dropdown-item href="#">Another action</b-dropdown-item>
                <b-dropdown-item href="#">Something else here</b-dropdown-item>
              </b-dropdown>
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
            <b-row>
              <div class="gridbox">
                <div class="friends">
                  <div class="item-a">
                    <img alt="Vue pictures" src="../assets/add.png" />
                  </div>
                  <div class="item-b">
                    <p>Theressa Webb</p>
                  </div>
                  <div class="item-c">
                    <span class="input-group-text"
                      ><i class="fa fa-search fa-lg"></i
                    ></span>
                  </div>
                  <div class="item-d">
                    <p>15:20</p>
                  </div>
                  <div class="item-e">
                    <p>Why did you do that?</p>
                  </div>
                  <div class="item-f">
                    <span class="badge badge-pill badge-primary">1</span>
                  </div>
                </div>
              </div>
            </b-row>
          </b-container>
        </b-col>
        <b-col xl="9" class="chatPage">
          <b-row style="padding: 10px; background: white">
            <div class="friendChat">
              <div class="itemA">
                <img alt="Vue pictures" src="../assets/add.png" />
              </div>
              <div class="itemB">
                <p>Theressa Webb</p>
              </div>
              <div class="itemC">
                <p>Online</p>
              </div>
            </div>
          </b-row>
          <b-row
            class="d-flex flex-column"
            style="padding: 10px; height: 600px"
          >
            <b-card class="text">
              <b-row>
                <b-col xl="2" class="d-flex align-self-end textIn">
                  <b-img rounded="circle" :src="require('../assets/add.png')">
                  </b-img>
                </b-col>
                <b-col class="message" xl="5">
                  <p>Hi, Son how are you doing?</p>
                </b-col>
              </b-row>
            </b-card>
            <b-card class="text">
              <b-row>
                <b-col xl="2" class="d-flex align-self-end textIn">
                  <b-img rounded="circle" :src="require('../assets/add.png')">
                  </b-img>
                </b-col>
                <b-col class="message" xl="5">
                  <p>Hi, Son how are you doing?</p>
                </b-col>
              </b-row>
            </b-card>
          </b-row>
          <b-row>
            <b-form-input
              type="message"
              v-model="message"
              placeholder="Type your message..."
            ></b-form-input>
            <button class="send" @click="sendMessage">Send</button>
          </b-row>
          <!-- <div class="d-flex justify-content-center chatter">
            <p class="align-self-center noChat">
              Please select a chat to start messaging
            </p>
          </div> -->
        </b-col>
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
export default {
  name: 'Home',
  data() {
    return {
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
        // console.log(this.coordinate)
      })
      .catch((error) => {
        alert(error)
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
    }
  }
}
</script>

<style scoped>
div {
  border: 1px solid black;
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
.chatter {
  height: 100%;
}
.noChat {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  opacity: 0.4;
}
.chatPage {
  background: whitesmoke;
  max-width: 100%;
  overflow: auto;
  height: 500px;
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
  padding: 10px;
}
.listTitle {
  color: #7e98df;
}
.message {
  border-radius: 20px 20px 20px 0;
  background-color: #7e98df;
  color: white;
}
.searchAndAdd {
  height: 70px;
}
.searchMessage {
  max-width: 100%;
  width: 200px;
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
.friends {
  display: grid;
  max-width: 100%;
  height: 80px;
  grid-template-rows: 50% 50%;
  grid-template-columns: 25% 5% 20% 20% 10% 5%;
  grid-template-areas:
    'itema . itemb itemb itemc . itemd'
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
.item-c {
  grid-area: itemc;
}
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
</style>
