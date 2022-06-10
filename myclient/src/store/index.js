import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    posts: [],
  },
  getters: {
    getUserName: state => state.user,
    getPosts: state => state.posts
  },
  mutations: {
    UPDATE_USER(state, user) {
      state.user = user
    },
    UPDATE_POST(state, post_data) {
      state.posts = post_data
    },
  },
  actions: {
    updateUser({ commit }, user) {
      commit('UPDATE_USER', user);
    },
    updatePost({ commit }, post_data) {
      commit('UPDATE_POST', post_data);
    },
  },
  modules: {
  }
})
