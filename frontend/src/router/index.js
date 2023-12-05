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

  if (!auth.currentUser) {
    // User state not confirmed yet, set up the listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe once the user state is confirmed
      if (requiresAuth && !user) {
        next("/Login");
      } else {
        next();
      }
    });
  } else {
    // User state already available, proceed based on that
    if (requiresAuth && !auth.currentUser) {
      next("/Login");
    } else {
      next();
    }
  }
});

export default router;
