/* eslint-disable */
import axios from 'axios'

export default {
    state: {
        email: '',
        friends: [],
        users: [],
    },
    mutations: {
        setSearch(state, payload) {
            state.email = payload
        },
        setUsers(state, payload) {
            state.users = payload
        },
        setFriend(state, payload) {
            state.friends = payload
        }
    },
    actions: {
        add(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${process.env.VUE_APP_BASE_URL}/users/friend`, payload)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error.response)
                    })
            })
        },
        getFriends(context, payload) {
            axios
                .get(
                    `${process.env.VUE_APP_BASE_URL}/users/friend/${payload.user_id}`
                )
                .then(response => {
                    context.commit('setFriend', response.data.data)
                })
                .catch(error => {
                    console.log(error)
                })

        },
        inviteFriends(context, payload) {
            axios
                .get(
                    `${process.env.VUE_APP_BASE_URL}/users/invite?email=${context.state.email}`
                )
                .then(response => {
                    context.commit('setUsers', response.data.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getRoomchatForDelete(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(
                        `${process.env.VUE_APP_BASE_URL}/users/get/roomchat?user_id=${payload.user_id}&friend_id=${payload.friend_id}`
                    )
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error.response)
                    })
            })
        },
        deleteContact(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`${process.env.VUE_APP_BASE_URL}/users/delete/contact/${payload.id_friend}`)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error.response)
                    })
            })
        },
        deleteRoomchat(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`${process.env.VUE_APP_BASE_URL}/users/delete/roomchat/${payload.roomchat_id}`)
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
        getEmail(state) {
            return state.email
        },
        getUsers(state) {
            return state.users
        },
        getFriend(state) {
            return state.friends
        }
    }
}
