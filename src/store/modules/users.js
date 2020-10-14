/* eslint-disable */
import axios from 'axios'

export default {
    state: {
        // friend: [],
        myId: [],
        otherUsers: []
    },
    mutations: {
        // setFriend(state, payload) {
        //     state.friend = payload
        // },
        setMyId(state, payload) {
            state.myId = payload
        },
        setOtherUsers(state, payload) {
            state.otherUsers = payload
        }
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
        // getRoom(context, payload) {
        //     return new Promise((resolve, reject) => {
        //         axios
        //             .get(
        //                 `${process.env.VUE_APP_BASE_URL}/roomchat/chat/room/${payload.user_id}`
        //             )
        //             .then(response => {
        //                 resolve(response.data)
        //                 context.commit('setFriend', response.data.data)
        //             })
        //             .catch(error => {
        //                 reject(error.response)
        //                 console.log(error)
        //             })
        //     })

        // },
        // getIdByRoom(context, payload) {
        //     axios
        //         .get(
        //             `${process.env.VUE_APP_BASE_URL}/roomchat/chat/room/${payload}`
        //         )
        //         .then(response => {
        //             console.log(response)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        // },
        getMessageByRoom(context, payload) {
            axios
                .get(
                    `${process.env.VUE_APP_BASE_URL}/roomchat/chat/message/${payload}`
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
        // getFriend(state) {
        //     return state.friend
        // },
        getMyId(state) {
            return state.myId
        },
        getOtherUser(state) {
            return state.otherUsers
        }
    }
}
