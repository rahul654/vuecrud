<template>
  <div>
    <Nav></Nav>
    <div class="container">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter username"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <div style="color: red" v-if="errors">{{ errorMsg }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import Nav from "./Nav.vue";

export default {
  name: "app-login",

  components: {
    Nav,
  },

  data() {
    return {
      username: "",
      password: "",
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
        this.$router.push("/");
      } else {
        this.$store.dispatch("updateUser", null);
        localStorage.removeItem("token");
      }
    }
  },

  methods: {
    async login() {
      const { username, password } = this;
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      if (data?.Error) {
        this.errors = true;
        this.errorMsg = data?.Error;
      } else {
        this.username = "";
        this.password = "";
        this.errors = false;
        this.errorMsg = "";

        localStorage.setItem("token", `Bearer ${data?.token}`);
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
