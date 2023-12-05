<template>
  <div class="main">
    <h1>Welcome to StudyBuddy!</h1>
    <div class="centerpiece">
      <span class="circle">
        <img
          src="@/assets/icon_wreath.png"
          alt="Wreath of icons"
          id="icon-wreath"
        />
        <input
          v-model="username"
          type="text"
          id="username-input"
          placeholder="Username"
        />
        <input
          v-model="password"
          type="password"
          id="password-input"
          placeholder="Password"
        />
        <button class="button" id="login-button" @click="login">LOGIN</button>
      </span>
    </div>
  </div>
</template>
<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import firebase from "../firebaseConfig";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in so navigate to the home page
        this.$router.push("Home");
      } 
      // No user is signed in so stay on the login page
    });
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async login() {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, this.username, this.password);
        // Navigation after login is handled by the auth state observer
      } catch (error) {
        console.error("Authentication failed:", error);
        // Handle errors here, idk what to do for this so I'll just print out the error
      }
    },
  },
};
</script>

<style scoped>
.main {
  height: 100%;
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

h1 {
  font-size: 40px;
  font-weight: 900;
  width: 300px;
  margin-top: 20px;
  margin-bottom: 65px;
}

.circle {
  height: 450px;
  width: 450px;
  background-color: #ececec;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  top: 10%;
}

.button {
  width: 175px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: 20px;
  background-color: #000000;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: #ffffff;
  font-weight: 900;
  box-shadow: 0 4px 2px rgba(0, 0, 0, 0.1);
}

input {
  width: 250px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: 20px;
  background-color: #ffffff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: #000000;
  font-weight: 900;
}

input::placeholder {
  color: #000000;
}

#username-input {
  top: 35%;
}

#password-input {
  top: 50%;
}

#login-button {
  top: 70%;
}

#icon-wreath {
  position: absolute;
  top: -10%;
  left: -20%;
  width: 145%;
  height: 120%;
}
</style>
