<template>
  <div id="pseudo-body">
    <div id="topbar" class="bg-rounded-light">
      <div class="topbar-wrapper-l"><ClockWidget /></div>
      <div class="topbar-wrapper-r">
        <p>{{ formatDate() }}</p>
        <p>|</p>
        <div class="item">
          <i class="fa-solid fa-arrow-right-from-bracket logout"></i>
        </div>
      </div>
    </div>
    <div id="greeting">
      <p>Welcome {{ userProfile.Username }}</p>
    </div>
    <div id="room-join">
      <h1>Join a room</h1>
      <p>Invite code:</p>
      <input
        type="text"
        id="inv-code"
        name="inv-code"
        placeholder="Enter Code Here"
        @input="id = $event.target.value"
      />
      <button id="inv-code-enter" @click="join()">JOIN</button>
    </div>
    <div class="room-host">
      <div id="room-make">
        <h1>Create a room</h1>
        <div class="select-border select-sm">
          <div class="select-square plus" @click="host()">
            <p>+</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClockWidget from "./ClockWidget.vue";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "../firebaseConfig";
import { useRouter } from "vue-router";
import axios from "axios";

const API_ADDRESS = "https://us-central1-study-buddy-51a85.cloudfunctions.net/";

export default {
  name: "LandingPage",
  components: { ClockWidget },
  created() {
    this.checkAuthState();
  },
  data() {
    return {
      id: "",
      userProfile: {},
    };
  },
  methods: {
    formatDate() {
      const monthInWords = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const dayOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const date = new Date();
      return `${dayOfWeek[date.getDay()]} ${
        monthInWords[date.getMonth()]
      } ${date.getDate()}`;
    },
    join() {
      const pushObj = {
        name: "Room",
        query: {
          isHost: false,
          username: "PLACEHOLDER-JOIN-USER",
          roomID: this.id,
        },
      };
      this.$router.push(pushObj);
    },
    host() {
      const pushObj = {
        name: "Room",
        query: {
          isHost: true,
          username: "PLACEHOLDER-HOST-USER",
        },
      };
      this.$router.push(pushObj);
    },
    async fetchUserProfile(uid) {
      try {
        const functions = getFunctions(firebaseApp);
        const getUserProfile = httpsCallable(functions, "getUserProfile");
        const result = await getUserProfile({ uid });
        this.userProfile = result.data;
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Handle error appropriately, idk how to so I'll just log it
      }
    },
    async signOutUser() {
      const auth = getAuth();
      try {
        await signOut(auth);
        console.log("User signed out successfully");
        this.$router.push("/"); // Redirect to login page after sign out
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
    async addRoom() {
      try {
        const response = await axios.post(`${API_ADDRESS}/addRoom`);
        console.log("New room added:", response.data);
        // maybe redirect to new room too.
      } catch (error) {
        console.error("Error adding new room:", error);
      }
    },
    async addParticipantToRoom(roomID, userID) {
      try {
        const response = await axios.post(
          `${API_ADDRESS}/addParticipantToRoom`,
          {
            roomID,
            userID,
          }
        );
        console.log("Participant added:", response.data);
        // handle the response (ex. update the UI or navigate to the new room)
      } catch (error) {
        console.error("Error adding participant to room:", error);
        // handle error appropriately, idk what to do so i log
      }
    },

    // async fetchRoom(roomID) {
    //   try {
    //     const functions = getFunctions(firebaseApp);
    //     const getRoom = httpsCallable(functions, "getRoom");
    //     const result = await getRoom({ roomID });
    //   } catch (error) {
    //     console.error("Error fetching room:", error);
    //   }
    // },

    checkAuthState() {
      const router = useRouter();
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.fetchUserProfile(user.uid);
        } else {
          console.error("No user is currently logged in");
          router.push("/");
        }
      });
    },
  },
};
</script>
<style scoped>
#pseudo-body > * {
  position: absolute;
}

* {
  margin: 0px;
}

/*Generic class-based styling*/
.bg-rounded-light {
  background-color: #ececec;
  border-radius: 34px;
}

.bg-rounded-dark {
  background-color: #757575;
  border-radius: 34px;
}

/*Component Positioning, Sizing*/
.item {
  width: 1em;
  height: 1em;
  cursor: pointer;
  text-align: center;
}

.item:hover {
  background-color: grey;
  border-radius: 5px;
}

#topbar {
  width: 95%;
  height: 2.5rem;
  left: 2.5%;
  top: 30px;
  text-align: center;
}

#greeting {
  left: 2.5%;
  top: 120px;
}

#greeting > p {
  font-size: 4em;
  font-weight: 800;
}

#room-join {
  width: 300px;
  left: 2.5%;
  top: 280px;
  font-size: 1.5em;
}

#room-join > * {
  margin: 8px 0px;
}

#room-join > input[type="text"] {
  width: 90%;
  height: 3em;
  padding: 0.5em 1.5em;
  border-radius: 34px;
  background-color: #ececec;
  border: none;
}

#inv-code-enter {
  width: 140px;
  height: 3em;
  margin-left: 80px;
  background-color: black;
  color: white;
  border-radius: 34px;
  font-weight: 600;
  cursor: pointer;
}

.room-host {
  top: 280px;
  left: calc(2.5% + 400px);
  font-size: 1.5em;
}

.select-border {
  background-color: #757575;
  padding: 15px;
  border-radius: 28px;
  margin: 10px 0px;
}

.select-inner-scroller {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  border-radius: 20px;
}

.select-sm {
  max-width: 120px;
  max-height: 140px;
}

.select-lg {
  max-width: 525px;
}

.select-square {
  background-color: #ececec;
  min-width: 120px;
  min-height: 120px;
  border-radius: 20px;
  cursor: pointer;
}

.plus {
  display: flex;
  text-align: center;
  font-size: 4rem;
  align-items: center;
  justify-content: center;
}

.topbar-wrapper-l {
  position: absolute;
  top: 0.3rem;
  left: 20px;
}

.topbar-wrapper-r {
  position: absolute;
  top: 0.63rem;
  right: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  gap: 1rem;
}

#topbar-wrapper-r > * {
  position: absolute;
  top: 1.25rem;
}
</style>
