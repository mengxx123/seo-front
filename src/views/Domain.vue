<template>
    <my-page title="域名注册查询" :page="page">
        <ui-text-field v-model="domain" label="域名" hintText="nicetool.net" />
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
                    <th>{{ domain.name }}</th>
                    <td>
                        <span v-if="domain.loading">加载中...</span>
                        <span v-if="domain.registered === true">已注册</span>
                        <span v-if="domain.registered === false">未注册</span>
                    </td>
                </tr>
            </table>
        </ui-article>
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
                domains: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/whois/help'
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
                let types = ['com', 'cn', 'net', 'top', 'org', 'wang', 'vip']
                this.result = true
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
                            if (data.includes('NOT FOUND')) {
                                this.domains[i].registered = false
                            } else {
                                this.domains[i].registered = true
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
</style>
