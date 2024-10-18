import {createRouter, createWebHistory} from "vue-router";
import Layout from "../layout/Layout.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: Layout,
            redirect: '/',
            children: [
                {
                    path: '/',
                    name: 'index',
                    component: () => import('../page/index/Index.vue'),
                    meta: {
                        title: '首页',
                        keepAlive: true
                    }
                },
                {
                    path: '/tags',
                    name: 'tags',
                    component: () => import('../page/tags/Index.vue'),
                    meta: {
                        title: '标签页',
                        keepAlive: true
                    }
                },
            ]
        }
    ],
});


export default router;
