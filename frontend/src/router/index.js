import LandingPage from "../components/LandingPage.vue";
import LoginPage from "../components/LoginPage.vue";
import SignUpPage from "../components/SignUpPage.vue";
import MeetingRoom from "../components/MeetingRoom.vue";
import HomePage from "../components/HomePage.vue";
import { createWebHistory, createRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
  },
  {
    path: "/Login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUpPage,
  },
  {
    path: "/Home",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/Room",
    name: "Room",
    component: MeetingRoom,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (requiresAuth && !user) {
      next("/Login"); // Redirect to login if the route requires auth and there's no user
    } else {
      next(); // Proceed as normal if auth is not required or if the user is authenticated
    }
  });
});

export default router;
