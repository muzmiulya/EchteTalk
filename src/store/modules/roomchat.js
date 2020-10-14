/* eslint-disable */
import axios from 'axios'

export default {
    state: {
        roomchat: []
    },
    mutations: {
        setRoomchat(state, payload) {
            state.roomchat = payload
        },
    },
    actions: {
        getAllRoomChat(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(
                        `${process.env.VUE_APP_BASE_URL}/roomchat/chat/room/${payload}`
                    )
                    .then(response => {
                        resolve(response.data)
                        context.commit('setRoomchat', response.data.data)
                    })
                    .catch(error => {
                        reject(error.response)
                    })
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
    },
    getters: {
        getRoomchat(state) {
            return state.roomchat
        },
    }
}
