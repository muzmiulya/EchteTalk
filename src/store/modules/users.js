/* eslint-disable */
import axios from 'axios'

export default {
    state: {
        myId: [],
        myFriend: [],
        otherUsers: [],
    },
    mutations: {
        setMyId(state, payload) {
            state.myId = payload
        },
        setFriendId(state, payload) {
            state.myFriend = payload
        },
        setOtherUsers(state, payload) {
            state.otherUsers = payload
        },

    },
    actions: {
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
        profileFriend(context, payload) {
            axios
                .get(
                    `${process.env.VUE_APP_BASE_URL}/users/user/${payload}`
                )
                .then(response => {
                    context.commit('setFriendId', response.data.data[0])
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
        getMyId(state) {
            return state.myId
        },
        getMyFriend(state) {
            return state.myFriend
        },
        getOtherUser(state) {
            return state.otherUsers
        },
    }
}
