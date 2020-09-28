/* eslint-disable */
import axios from 'axios'

export default {
    state: {
        email: '',
        users: [],
        friend: [],
        myId: [],
        otherUsers: []
    },
    mutations: {
        setSearch(state, payload) {
            state.email = payload
        },
        setUsers(state, payload) {
            state.users = payload
        },
        setFriend(state, payload) {
            state.friend = payload
        },
        setMyId(state, payload) {
            state.myId = payload
        },
        setOtherUsers(state, payload) {
            state.otherUsers = payload
        }
    },
    actions: {
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
        add(context, payload) {
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
        getUserById(context, payload) {
            axios
                .get(
                    `${process.env.VUE_APP_BASE_URL}/users/user/${payload.user_id}`
                )
                .then(response => {
                    context.commit('setMyId', response.data.data[0])
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getRoom(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(
                        `${process.env.VUE_APP_BASE_URL}/roomchat/chat/room/${payload.user_id}`
                    )
                    .then(response => {
                        resolve(response.data)
                        context.commit('setFriend', response.data.data)
                    })
                    .catch(error => {
                        reject(error.response)
                        console.log(error)
                    })
            })

        },
        getIdByRoom(context, payload) {
            axios
                .get(
                    `${process.env.VUE_APP_BASE_URL}/roomchat/chat/room/${payload}`
                )
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        updateMyUser(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .patch(
                        `http://127.0.0.1:3001/profile/patch/${payload.user_id}`,
                        payload.form
                    )
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error.response)
                    })
            })
        }
    },
    getters: {
        getUsers(state) {
            return state.users
        },
        getFriend(state) {
            return state.friend
        },
        getMyId(state) {
            return state.myId
        },
        getOtherUser(state) {
            return state.otherUsers
        }
    }
}
