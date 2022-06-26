<template>
  <div>
    <div v-if="isLoggedIn" class="topnav" id="myTopnav">
      <router-link :class="[navActive('/signup') ? 'active' : '']" to="/signup"
        >Signup</router-link
      >
      <router-link :class="[navActive('/login') ? 'active' : '']" to="/login"
        >Login</router-link
      >
      <a href="javascript:void(0);" class="icon" @click="myFunction()">
        Navbar
      </a>
    </div>
    <div v-else class="topnav" id="myTopnav">
      <router-link :class="[navActive('/') ? 'active' : '']" to="/"
        >Blogs</router-link
      >
      <router-link
        :class="[navActive('/newpost') ? 'active' : '']"
        to="/newpost"
        >New Post</router-link
      >
      <router-link @click="logout" to="#">Logout</router-link>
      <a href="javascript:void(0);" class="icon" @click="myFunction()">
        Navbar
      </a>
    </div>
  </div>
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
    myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    },
    navActive(path) {
      return this.$router.currentRoute._rawValue.fullPath === path
        ? true
        : false;
    },

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

<style scoped>
/* .nav-item {
  margin: 0 50px 0 0;
} */
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04aa6d;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {
    display: none;
  }
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
