<template>
    <my-page title="Whois 查询" :page="page">
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
                    <tr v-for="info in infos">
                        <th>{{ translate(info.key) }}</th>
                        <td>{{ info.value }}</td>
                    </tr>
                </table>
                <pre class="result">{{ result }}</pre>
            </ui-article>
        </div>
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
                infos: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/eafa01700d9211e99f2863e9d9681573',
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
            // this.domain = 'http://www.nicetool.net'
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
                this.loading = true
                this.result = ''
                this.$http.get('/whois.php?domain=' + this.domain).then(
                    response => {
                        let data = response.data
                        this.result = data
                        this.infos = this.deal(this.result)
                        this.loading = false
                    },
                    response => {
                        console.log(response)
                        this.loading = false
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
