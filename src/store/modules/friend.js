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
        // add(context, payload) {
        //     return new Promise((resolve, reject) => {
        //         axios
        //             .post(`${process.env.VUE_APP_BASE_URL}/roomchat`, payload)
        //             .then(response => {
        //                 resolve(response.data)
        //             })
        //             .catch(error => {
        //                 reject(error.response)
        //             })
        //     })
        // },
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
            return new Promise((resolve, reject) => {
                axios
                    .get(
                        `${process.env.VUE_APP_BASE_URL}/users/friend/${payload.user_id}`
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
        inviteFriends(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(
                        `${process.env.VUE_APP_BASE_URL}/users/invite?email=${context.state.email}`
                    )
                    .then(response => {
                        resolve(response.data)
                        context.commit('setUsers', response.data.data)
                    })
                    .catch(error => {
                        reject(error.response)
                        console.log(error)
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
