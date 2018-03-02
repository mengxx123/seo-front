import Vue from 'vue'
import Router from 'vue-router'

const Robots = resolve => require(['@/views/Robots'], resolve)
const RobotsHelp = resolve => require(['@/views/RobotsHelp'], resolve)
const Dns = resolve => require(['@/views/Dns'], resolve)
const DnsHelp = resolve => require(['@/views/DnsHelp'], resolve)
const Whois = resolve => require(['@/views/Whois'], resolve)
const WhoisHelp = resolve => require(['@/views/WhoisHelp'], resolve)
const About = resolve => require(['@/views/About'], resolve)

const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Robots
    },
    {
        path: '/robots/help',
        component: RobotsHelp
    },
    {
        path: '/dns',
        component: Dns
    },
    {
        path: '/dns/help',
        component: DnsHelp
    },
    {
        path: '/whois',
        component: Whois
    },
    {
        path: '/whois/help',
        component: WhoisHelp
    },
    {
        path: '/about',
        component: About
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
