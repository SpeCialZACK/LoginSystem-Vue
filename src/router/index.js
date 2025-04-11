import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ChangePasswordView from '../views/ChangePasswordView.vue'
import UserManagementView from '../views/UserManagementView.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginView },
    { path: '/home', component: HomeView },
    { path: '/change-password', component: ChangePasswordView },
    { path: '/user-management', component: UserManagementView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
