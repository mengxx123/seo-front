<template>
    <my-page title="域名注册查询" :page="page">
        <div class="common-container container">
            <ui-text-field v-model="domain" label="域名" hintText="yunser.com" />
            <br>
            <div class="btns">
                <ui-raised-button class="btn" label="查询" primary @click="query" />
            </div>
            <div class="ui-loading" v-if="loading">
                <ui-circular-progress :size="24"/>
            </div>
            <ui-article v-if="result">
                <table>
                    <tr v-for="domain in domains">
                        <th v-if="domain.registered">
                            <router-link :to="`/whois?data=` + domain.name">{{ domain.name }}</router-link>
                        </th>
                        <th v-if="!domain.registered">{{ domain.name }}</th>
                        <td>
                            <span v-if="domain.loading">查询中...</span>
                            <ui-badge content="已注册" color="#777" v-if="domain.registered === true" />
                            <ui-badge content="未注册" color="#5cb85c" v-if="domain.registered === false" />
                        </td>
                        <td>
                            <a :href="'http://' + domain.name" target="_blank">访问</a>
                        </td>
                    </tr>
                </table>
            </ui-article>
        </div>
        <ui-float-button class="float-button" icon="more_horiz" @click="open = true"/>
        <ui-drawer class="setting-box" right :open="open" @close="toggle()">
            <ui-appbar title="设置">
                <ui-icon-button icon="close" slot="left" @click="open = false" />
            </ui-appbar>
            <div class="body">
                <ul class="type-list">
                    <li class="item" v-for="t in types">
                        <ui-checkbox name="group" :nativeValue="t" 
                            v-model="selected" :label="t" class="demo-checkbox"/>
                    </li>
                </ul>
            </div>
        </ui-drawer>
    </my-page>
</template>


<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                loading: false,
                domain: '',
                result: '',
                open: false,
                types: [
                    'com', 'cn', 'xin', 'net', 'top', '在线',
                    'xyz', 'wang', 'shop', 'site', 'club', 'cc',
                    'fun', 'online', 'biz', 'red', 'ink', 'ltd',
                    'mobi', 'info', 'org', 'com.cn', 'net.cn', 'org.cn',
                    'gov.cn', 'name', 'vip', 'pro', 'work', 'tv',
                    'kim', 'group', 'tech', 'store', 'ren', 'ink',
                    'pub', 'live', 'wiki', 'design', '中文网', '我爱你',
                    '中国', '网址', '网店', '公司', '网络', '集团'
                ],
                domains: [],
                selected: ['com', 'cn', 'net', 'top', 'org', 'wang', 'vip'],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/f87e41c08c5a11e9ae7d41b334f9f571',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            let data = this.$route.query.data
            if (data) {
                this.domain = data
                this.query()
            }
            // this.query()
            // this.domain = 'yunser.com'
            // this.query()
        },
        methods: {
            toggle () {
               this.open = !this.open
            },
            deal(content) {
                content = content.split('>>>')[0]
                let arr = content.split('\n')
                arr = arr.filter(item => item.length)
                let ret = []
                for (let item of arr) {
                    let index = item.indexOf(':')
                    ret.push({
                        key: item.substring(0, index).replace(/^\s+/, '').replace(/\s+$/, ''),
                        value: item.substring(index + 1, item.length).replace(/^\s+/, '').replace(/\s+$/, '')
                    })
                }
                return ret
            },
            query() {
                if (!this.domain) {
                    this.$message({
                        type: 'danger',
                        text: '请输入域名'
                    })
                    return
                }
                // this.loading = true
                let prefix = this.domain.split('.')[0]
                let type = this.domain.split('.')[1]
                let types = this.selected
                types = types.sort((a, b) => {
                    if (a === type) {
                        return -1
                    } else if (b === type) {
                        return 1
                    }
                    return 0
                })
                this.result = true
                this.domains = []
                // this.domains = []
                for (let i = 0; i < types.length; i++) {
                    console.log('循环', this.domains)
                    this.domains.push({
                        name: prefix + '.' + types[i],
                        loading: true
                    })
                }
                for (let i = 0; i < types.length; i++) {
                    (() => {
                        this.$http.get('/whois.php?domain=' + prefix + '.' + types[i]).then(
                        response => {
                            let data = response.data
                            if (data.includes('Domain Name')) {
                                this.domains[i].registered = true
                            } else {
                                this.domains[i].registered = false
                            }
                            this.domains[i].loading = false
                        },
                        response => {
                            console.log(response)
                            this.loading = false
                        })
                    })(i)
                }
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .type-list {
        overflow: hidden;
        .item {
            float: left;
            width: 160px;
        }
    }
    .btns {
        margin-top: 16px;
        margin-bottom: 16px;
        .btn {
            margin-right: 8px;
        }
    }
    .result {
        margin-top: 24px;
    }
    .float-button {
        position: fixed;
        right: 24px;
        bottom: 24px;
    }
    .setting-box {
        z-index: 10000;
        width: 100%;
        .body {
            padding: 16px;
        }
    }
</style>
