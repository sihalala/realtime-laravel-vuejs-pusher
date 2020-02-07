import Vue from "vue";
import VueRouter from "vue-router";
import login from "../components/login/login";
import Logout from "../components/login/Logout";
import signup from "../components/login/signup";
import forum from "../components/forum/forum";
import read from "../components/forum/read";
import create from "../components/forum/create";
import createCategory from "../components/category/createCategory";
Vue.use(VueRouter);

const routes = [
    {path: '/login', component: login},
    {path: '/signup', component: signup},
    {path: '/logout', component: Logout},
    {path: '/forum', component: forum, name:'forum'},
    {path: '/question/:slug', component: read, name:'read'},
    {path: '/ask', component: create, name:'create'},
    {path: '/category', component: createCategory},
];

const router = new VueRouter({
    routes,
    hashbang : false,
    mode: 'history'
})

export default router
