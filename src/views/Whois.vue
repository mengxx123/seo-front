<template>
    <my-page title="域名 WHOIS 查询" :page="page">
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
                    <th>{{ info.key }}</th>
                    <td>{{ info.value }}</td>
                </tr>
            </table>
            <pre class="result">{{ result }}</pre>
        </ui-article>
    </my-page>
</template>


<script>
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
