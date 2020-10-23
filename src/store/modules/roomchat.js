/* eslint-disable */
import axios from 'axios'

export default {
    state: {
        roomchat: [],
        notification: []
    },
    mutations: {
        setRoomchat(state, payload) {
            state.roomchat = payload
        },
        setNotification(state, payload) {
            state.notification = payload
        }
    },
    actions: {
        getAllRoomChat(context, payload) {
            axios
                .get(
                    `${process.env.VUE_APP_BASE_URL}/roomchat/chat/room/${payload}`
                )
                .then(response => {
                    context.commit('setRoomchat', response.data.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getMessageByRoom(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(
                        `${process.env.VUE_APP_BASE_URL}/roomchat/chat/message/${payload.roomchat_id}`
                    )
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(error => {
                        reject(error.response)
                    })
            })
        },
        getNotification(context, payload) {
            axios
                .get(
                    `${process.env.VUE_APP_BASE_URL}/roomchat/chat/notif/${payload.user_id}`
                )
                .then(response => {
                    context.commit('setNotification', response.data.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        postRoom(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${process.env.VUE_APP_BASE_URL}/roomchat`, payload)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error.response)
                    })
            })
        },
        postMessage(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${process.env.VUE_APP_BASE_URL}/roomchat/message`, payload)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error.response)
                    })
            })
        },
    },
    getters: {
        getRoomchat(state) {
            return state.roomchat
        },
        getMessageInRoomchat(state) {
            return state.messageInRoomchat
        },
        getNotif(state) {
            return state.notification
        }
    }
}
