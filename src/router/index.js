import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Seo = resolve => require(['@/views/Seo'], resolve)
const Robots = resolve => require(['@/views/Robots'], resolve)
const Dns = resolve => require(['@/views/Dns'], resolve)
const Whois = resolve => require(['@/views/Whois'], resolve)
const Icp = resolve => require(['@/views/Icp'], resolve)
const Domain = resolve => require(['@/views/Domain'], resolve)
const RobotsCheck = resolve => require(['@/views/RobotsCheck'], resolve)
const Log = resolve => require(['@/views/Log'], resolve)
const Search = resolve => require(['@/views/Search'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/search',
        component: Search
    },
    {
        path: '/seo',
        component: Seo
    },
    {
        path: '/robots',
        component: Robots
    },
    {
        path: '/robots/check',
        component: RobotsCheck
    },
    {
        path: '/dns',
        component: Dns
    },
    {
        path: '/whois',
        component: Whois
    },
    {
        path: '/icp',
        component: Icp
    },
    {
        path: '/domain',
        component: Domain
    },
    {
        path: '/log',
        component: Log
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
