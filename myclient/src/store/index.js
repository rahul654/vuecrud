import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    posts: [],
    comments: [],
  },
  getters: {
    getUserName: state => state.user,
    getPosts: state => state.posts,
    getComments: state => state.comments
  },
  mutations: {
    UPDATE_USER(state, user) {
      state.user = user
    },
    UPDATE_POST(state, post_data) {
      state.posts = post_data
    },
    UPDATE_COMMENT(state, comments_data) {
      state.comments = comments_data
    },
  },
  actions: {
    updateUser({ commit }, user) {
      commit('UPDATE_USER', user);
    },
    updatePost({ commit }, post_data) {
      commit('UPDATE_POST', post_data);
    },
    updateComment({ commit }, comments_data) {
      commit('UPDATE_COMMENT', comments_data);
    },
  },
  modules: {
  }
})
