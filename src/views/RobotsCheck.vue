<template>
    <my-page title="robots.txt 检测" :page="page">
        <div class="common-container container">
            <ui-text-field v-model="domain" label="网址" hintText="http(s)://xxx.xxx" />
            <br>
            <div class="btns">
                <ui-raised-button class="btn" label="查询" primary @click="query" />
            </div>
            <div class="ui-loading" v-if="loading">
                <ui-circular-progress :size="24"/>
            </div>
            <div v-if="result === -1">没有找到 robots.txt</div>
            <ui-article v-if="result && result !== -1">
                <pre class="result">{{ result }}</pre>
                <h2>详细信息</h2>
                <table>
                    <tr>
                        <th>规则</th>
                        <th>解析</th>
                        <th>有效</th>
                    </tr>
                    <tr v-for="info in infos">
                        <th>{{ translate(info.key) }}</th>
                        <td>{{ info.value }}</td>
                        <td>是</td>
                    </tr>
                </table>
            </ui-article>
        </div>
    </my-page>
</template>


<script>
    /* eslint-disable */
    import {apiDomain2} from '@/config'

    export default {
        data () {
            return {
                loading: false,
                domain: '',
                result: ``,
//                 result: `User-Agent: *
// Disallow: /*?*
// Disallow: /data
// Disallow: /mod
// Disallow: /source
// Disallow: /jump
// Disallow: /admin.php
// Disallow: /?www?
// Disallow: /?www.ddjdw.cn?
// Sitemap: http://www.nicetool.net/sitemap.xml`,
                infos: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/6e2c2ae00d9411e99f2863e9d9681573',
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
            // debug
            // this.domain = 'http://nicetool.net'
            // this.query()
            // this.deal()
        },
        methods: {
            deal() {
                let content = this.result
                let arr = content.split('\n')
                arr = arr.filter(item => item.length)
                let ret = []
                for (let item of arr) {
                    let index = item.indexOf(':')
                    let key = item.substring(0, index).replace(/^\s+/, '').replace(/\s+$/, '')
                    let value = item.substring(index + 1, item.length).replace(/^\s+/, '').replace(/\s+$/, '')
                    ret.push({
                        key: key + ': ' + value,
                        value: this.getValue(key, value)
                    })
                }
                this.infos = ret
            },
            getValue(key, value) {
                function isDirectory(value) {
                    return !value.includes('.')
                }
                if (key === 'Sitemap') {
                    return `Sitemap 地址： ${value}`
                } else if (key === 'Disallow') {
                    if (value === '/*?*') {
                        return `禁止所有搜索引擎访问任何带参数的页面`
                    }
                    if (value.includes('?')) {
                        return ``
                    }
                    if (isDirectory(value)) {
                        return `禁止所有搜索引擎访问 ${value} 目录（包括子目录）`
                    }
                }
                if (key === 'User-Agent' && value === '*') {
                    return `开始配置：所有搜索引擎`
                }
                return ''
            },
            query() {
                if (!this.domain) {
                    this.$message({
                        type: 'danger',
                        text: '请输入域名'
                    })
                    return
                }
                this.loading = true
                this.result = ''
                this.$http.get(apiDomain2 + '/robots?url=' + this.domain).then(
                    response => {
                        let data = response.data
                        this.result = data
                        this.deal()
                        this.loading = false
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                        this.result = -1
                    })
            },
            translate(en) {
                switch (en) {
                    case 'Domain Name':
                        return '域名'
                    case 'Name Server':
                        return 'DNS 服务器'
                    case 'Updated Date':
                        return '更新日期'
                    case 'Creation Date':
                        return '注册日期'
                    case 'Registry Expiry Date':
                        return '过期日期'
                    case 'Domain Status':
                        return '域名状态'
                    case 'Registrar URL':
                        return '注册商网址'
                    case 'Registrar WHOIS Server':
                        return '注册商 WHOIS 服务器'
                    case 'Registrar URL':
                        return '注册商网址'
                    case 'Registrar Abuse Contact Email':
                        return '注册商联系邮箱'
                    case 'Registrar Abuse Contact Phone':
                        return '注册商联系电话'
                    case 'Registrar':
                        return '注册商'
                }
                return en
            }
        }
    }
</script>

<style lang="scss" scoped>
    th {
        text-align: left;
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
</style>
