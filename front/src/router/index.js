import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/inicio'
    },
    {
        path:'/',
        component: {
            render(c) {
                return c('router-view')
            },
        },
        children:[
            {
                path: '/inicio',
                name: 'inicio',
                component: () => import('../components/inicio.vue')
            },
            {
                path: '/formulario',
                name: 'formulario',
                component: () => import('../components/formulario.vue')
            },
            {
                path: '/paginacion',
                name: 'paginacion',
                component: () => import('../components/paginacion.vue')
            },
            
        ]
    }
]

const router = new VueRouter({ routes, })


export default router;

