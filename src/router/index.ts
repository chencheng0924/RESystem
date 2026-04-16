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
    const whiteListRoutes = ['/login', '/demoClientEvaluation'];
    let isLogin = Logincheck.isLogin();
    if (isLogin == false && whiteListRoutes.includes(to.path) === false) {
        next('/login')
    } else {
        next()
    }
})
export default router;