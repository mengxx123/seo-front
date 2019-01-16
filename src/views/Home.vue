<template>
    <my-page title="SEO" :page="page">
        <app-list :data="groups" />
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                groups: [
                    {
                        name: '域名',
                        apps: [
                            {
                                name: '综合查询',
                                desc: '',
                                icon: '/static/img/network.svg',
                                to: '/search'
                            },
                            {
                                name: 'DNS 工具',
                                desc: '',
                                icon: '/static/img/dns.svg',
                                to: '/dns'
                            },
                            {
                                name: '域名注册查询',
                                desc: '',
                                icon: '/static/img/dns.svg',
                                to: '/domain'
                            },
                            {
                                name: 'Whois 查询',
                                desc: '',
                                icon: '/static/img/whois.svg',
                                to: '/whois'
                            },
                            {
                                name: 'ICP 备案查询',
                                desc: '',
                                icon: '/static/img/icp.svg',
                                to: '/icp'
                            }
                        ]
                    },
                    {
                        name: '其他',
                        apps: [
                            {
                                name: 'SEO 查询',
                                desc: '',
                                icon: '/static/img/seo.svg',
                                to: '/seo'
                            },
                            {
                                name: 'Robots.txt 生成',
                                desc: '',
                                icon: '/static/img/robot.svg',
                                to: '/robots'
                            },
                            {
                                name: 'Robots.txt 检测',
                                desc: '',
                                icon: '/static/img/robot.svg',
                                to: '/robots/check'
                            },
                            {
                                name: 'Nginx 日志',
                                desc: 'Nginx 访问日志分析',
                                icon: '/static/img/network.svg',
                                to: '/log'
                            }
                        ]
                    }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'search',
                            href: 'https://search.yunser.com?utm_source=seo',
                            target: '_blank',
                            title: '搜索'
                        },
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?utm_source=seo',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        },
        computed: {
        },
        mounted() {
        },
        methods: {
            init() {
            },
            fileChange(e) {
            },
            sizeStr: function (size) {
            }
        }
    }
</script>
