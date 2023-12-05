import MeetingRoom from '../components/MeetingRoom.vue';
import LandingPage from '../components/HomePage.vue';
import PlaceholderPage from '../components/PlaceholderPage.vue'
import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Default',
        component: PlaceholderPage
    },
    {
        path: '/Home',
        name: 'Home',
        component: LandingPage
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