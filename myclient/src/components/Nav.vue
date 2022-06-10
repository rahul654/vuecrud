<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link to="/">Blogs</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul v-if="isLoggedIn" class="navbar-nav">
          <li class="nav-item">
            <router-link to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup">Signup</router-link>
          </li>
        </ul>
        <ul v-else class="navbar-nav">
          <li class="nav-item">
            <router-link to="/newpost">New Post</router-link>
          </li>
          <li class="nav-item">
            <router-link @click="logout" to="#">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "app-nav-bar",
  computed: {
    isLoggedIn() {
      return this.$store.state.user ? false : true;
    },
  },
  methods: {
    async logout() {
      const token = localStorage.getItem("token");
      localStorage.removeItem("token");
      if (token) {
        await fetch("http://localhost:5000/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
      }
      this.$router.push("/login");
      this.$store.dispatch("updateUser", null);
    },
  },
};
</script>

<style></style>
