import STLayoutNarrow from '@/lib/UILayout/SideBarAppBarBroad/SideBarAppBarBroad.vue';
import STLayout from '@/lib/UILayout/SideBarAppBarNarrow/SideBarAppBarNarrow.vue';
import LoginLayout from '@/views/layout/LoginLayout.vue';
import DefaultLayout from '@/views/layout/DefaultLayout.vue';
class RouterService {
    constructor() { }
    private _ignoreFile: string[] = ['home', 'demoClientForm'];

    getParentFolerName(path: string): string {
        let folderName: string[] = path.split("/");
        if (path.length < 2)
            return "";

        let name = folderName[folderName.length - 2];
        return name;
    }
    getLastFileName(path: string): string {
        let names = path.match(/\/([^/]+)\.vue$/);
        if (names.length < 2)
            return "";
        let fileName = names[1];
        //console.log(`path fileName: ${fileName}`);
        return fileName;
    }
    private getPathMamtRoutes() {
        const self = this;
        const routeModules = import.meta.glob('/src/views/pages/*/*.vue')
        const pages = Object.keys(routeModules)
            .filter(pathTemp => {
                const fileName = this.getLastFileName(pathTemp);
                return self._ignoreFile.includes(fileName) === false;
            })
            .map(pathTemp => {

                const name = this.getLastFileName(pathTemp);

                return {
                    path: `/${name}`,
                    name: name,
                    meta: { layout: STLayoutNarrow },
                    component: routeModules[pathTemp],

                }
            });
        return pages;
    }



    getRoutes(): any {
        let otherPaths = this.getPathMamtRoutes();

        const routes = [
            {
                path: '/',
                name: 'Home',
                meta: { layout: STLayoutNarrow },
                component: () => import('@/views/pages/home/home.vue'),
            },
            {
                path: '/demoClientForm',
                name: 'demoClientForm',
                meta: { layout: DefaultLayout },
                component: () => import('@/views/pages/demo/demoClientForm.vue'),
            },
            // {
            //     path: '/testChatArea',
            //     name: 'testChatArea',
            //     meta: { layout: STLayoutNarrow },
            //     component: () => import('@/views/pages/chat/teatChatArea.vue'),
            // },
            {
                path: '/login',
                name: 'Login',
                meta: { layout: LoginLayout },
                component: () => import('@/views/pages/login.vue'),

            },
            {
                // 這邊就是用 ＊ 去選擇所有頁面比對有沒有符合的路徑
                // 如果沒有就會導到這個 router-link 來
                path: '/:pathMatch(.*)*',
                name: 'error404',
                component: () => import('@/views/layout/Error404.vue')
            },
            ...otherPaths,

        ];

        return routes;
    }
}

export default RouterService;