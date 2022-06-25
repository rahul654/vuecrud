<template>
  <div>
    <Nav></Nav>
    {{ $route.params.id }}
    <div class="container">
      <form @submit.prevent="updatePost">
        <div class="form-group">
          <label for="exampleInputEmail1">Title</label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter title"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail2">Category</label>
          <input
            v-model="category"
            type="text"
            class="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder="Enter category"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail3">Content</label>
          <input
            v-model="content"
            type="text"
            class="form-control"
            id="exampleInputEmail3"
            aria-describedby="emailHelp"
            placeholder="Enter content"
          />
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import Nav from "./Nav.vue";

export default {
  name: "app-updatepost",

  components: {
    Nav,
  },

  data() {
    return {
      title: "",
      category: "",
      content: "",
      errors: false,
      errorMsg: "",
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
    this.title = data?.title;
    this.category = data?.category;
    this.content = data?.content;
  },

  methods: {
    async updatePost() {
      const token = localStorage.getItem("token");
      const id = this.$route.params.id;
      const { title, category, content } = this;
      const res = await fetch(`http://localhost:5000/api/post/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          title,
          category,
          content,
        }),
      });
      const data = await res.json();
      if (data?.error) {
        this.errors = true;
        this.errorMsg = data?.error;
      } else {
        this.title = "";
        this.category = "";
        this.content = "";
        this.errors = false;
        this.errorMsg = "";

        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
