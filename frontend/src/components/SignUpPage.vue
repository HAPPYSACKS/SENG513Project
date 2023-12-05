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
          v-model="name"
          type="text"
          id="name-input"
          placeholder="Full Name"
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
        <input
          v-model="re_password"
          type="password"
          id="re-enter-input"
          placeholder="Re-Enter Password"
        />
        <button class="button" id="signup-button" @click="signup">
          SIGN UP
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "../firebaseConfig";
const auth = getAuth(firebase);

export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",
      re_password: "",
    };
  },
  methods: {
    async signup() {
      if (this.password !== this.re_password) {
        alert("Passwords do not match");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.username,
          this.password
        );
        console.log("Account created for:", userCredential.user);
        this.$router.push("Home");
      } catch (error) {
        console.error("Error creating account:", error);
        // Handle account creation errors here (e.g., user already exists)
      }
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
}

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
  width: 235px;
  height: 13px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: 16px;
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

#name-input {
  top: 30%;
}

#username-input {
  top: 40%;
}

#password-input {
  top: 50%;
}

#re-enter-input {
  top: 60%;
}

#signup-button {
  top: 75%;
}

#icon-wreath {
  position: absolute;
  top: -10%;
  left: -20%;
  width: 145%;
  height: 120%;
}
</style>
