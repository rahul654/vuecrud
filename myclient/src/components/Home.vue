<template>
  <div>
    <Nav></Nav>
    <div class="container">Username: {{ getUserName }}</div>

    <div
      class="container"
      style="
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      "
    >
      <div
        v-for="(post, index) in getPosts"
        :key="index"
        class="card my-3"
        style="width: 18rem"
      >
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ post.category }}</h6>
          <p class="card-text">
            {{ post.content }}
          </p>
          <div v-if="post.postedBy === getUserName">
            <a
              @click="update_post(post._id)"
              style="cursor: pointer"
              class="card-link"
              >Edit</a
            >
            <a
              @click="delete_post(post._id)"
              style="cursor: pointer"
              class="card-link"
              >Delete</a
            >
          </div>
          <div>
            <a
              @click="addcomment(post._id)"
              style="cursor: pointer"
              class="card-link"
              >Comment</a
            >
          </div>
          <div>
            Posted By :
            {{ post.postedBy === getUserName ? "you" : post.postedBy }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./Nav.vue";
import store from "../store/index.js";
import router from "../router/index.js";

import { mapGetters } from "vuex";

export default {
  name: "app-home",
  components: {
    Nav,
  },

  methods: {
    delete_post: async (post_id) => {
      let posts = store.state.posts;

      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/post/${post_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const result = posts.filter((post) => post._id != post_id);
      store.dispatch("updatePost", result);
    },
    update_post: (post_id) => {
      router.push(`/updatepost/${post_id}`);
    },
    addcomment: (post_id) => {
      router.push(`/addcomment/${post_id}`);
    },
  },

  beforeCreate: async function () {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const data = await res.json();
      if (!data?.error) {
        this.$store.dispatch("updateUser", data?.user?.username);
      } else {
        this.$store.dispatch("updateUser", null);
        localStorage.removeItem("token");
        this.$router.push("/login");
      }
    } else {
      this.$router.push("/login");
    }
  },
  created: async function () {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await fetch("http://localhost:5000/api/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const data = await res.json();

      this.$store.dispatch("updatePost", data);
    }
  },
  computed: {
    ...mapGetters({
      getPosts: "getPosts",
      getUserName: "getUserName",
    }),
  },
};
</script>

<style></style>
