import { createRouter, createWebHistory } from "vue-router";
import RouterService from '@/router/routerService'
import { clearAllIntervals } from "@/utils/intervalManager";
import { Logincheck } from "@/service/Logincheck";
let svc = new RouterService();
const subDomain = import.meta.env.VITE_BASE_URL;
const router = createRouter({
    history: createWebHistory(subDomain),
    routes: [...svc.getRoutes()],
});

router.beforeEach(async (to, from, next) => {

    let isLogin = Logincheck.isLogin();
    if (isLogin == false && to.path !== '/login') {
        next('/login')
    } else {
        next()
    }
})
export default router;