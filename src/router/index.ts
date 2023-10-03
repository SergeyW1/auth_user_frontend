import {createRouter, createWebHistory} from "vue-router";
import {useCookies} from "vue3-cookies";
import jwtDecode from "jwt-decode";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('../components/AuthUser.vue')
        },
        {
            path: '/registration',
            name: 'Registration',
            component: () => import('../components/Registration.vue')
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('../components/Dashboard.vue'),
        },
    ]
})

router.beforeEach(async (to) => {
    const {cookies} = useCookies()
    if (to.path !== '/login' && to.path !== '/registration' && !cookies.isKey('tokenUser')) {
        return '/login' || '/registration'
    }

    if (to.path !== '/dashboard' && cookies.isKey('tokenUser')) {
        return '/dashboard'
    }
    if (cookies.isKey('tokenUser')) {
        const decodedToken = jwtDecode(cookies.get('tokenUser'))
        const currentTime = Date.now() / 1000

        if (decodedToken.exp < currentTime) {
            console.log('Время истекло')
        }
    }
})


export default router