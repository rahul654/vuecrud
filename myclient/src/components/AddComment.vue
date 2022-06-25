<template>
  <div>
    <Nav></Nav>
    <div class="container">
      <form @submit.prevent="addComment">
        <div class="form-group">
          <label for="exampleInputEmail1">Comment</label>
          <textarea
            v-model="comment"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter title"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Add</button>
      </form>
      <div
        v-for="(siglecomment, index) in getComment"
        :key="index"
        class="card my-3"
      >
        <div>Comment by {{ siglecomment?.author }}</div>
        <div>
          {{ siglecomment?.comment }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./Nav.vue";
import { mapGetters } from "vuex";

export default {
  name: "app-addcomment",

  computed: {
    getComment() {
      return this.$store.state.comments;
    },
    ...mapGetters({
      getComments: "getComments",
    }),
  },

  components: {
    Nav,
  },

  data() {
    return {
      comment: "",
    };
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
    const id = this.$route.params.id;
    const res = await fetch(`http://localhost:5000/api/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const data = await res.json();

    let comments = data.comments;
    this.$store.dispatch("updateComment", comments);
  },

  methods: {
    async addComment() {
      const token = localStorage.getItem("token");
      const id = this.$route.params.id;
      const { comment } = this;
      if (comment) {
        const res = await fetch(
          `http://localhost:5000/api/post/addcomment/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              comment,
            }),
          }
        );

        const data = await res.json();
        this.$store.dispatch("updateComment", data);
        this.$router.push(`/`);
      }
    },
  },
};
</script>

<style></style>
