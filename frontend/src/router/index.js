import LandingPage from '../components/LandingPage.vue'
import LoginPage from '../components/LoginPage.vue'
import SignUpPage from '../components/SignUpPage.vue'
import MeetingRoom from '../components/MeetingRoom.vue';
import HomePage from '../components/HomePage.vue';
import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Landing',
        component: LandingPage
    },
    {
        path: '/Login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/SignUp',
        name: 'SignUp',
        component: SignUpPage
    },
    {
        path: '/Home',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/Room',
        name: 'Room',
        component: MeetingRoom
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = to.name;
    next();
});

export default router;