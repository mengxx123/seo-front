<template>
    <my-page title="SEO 查询" :page="page">
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
                <table>
                    <tr>
                        <th>标签</th>
                        <th>内容长度</th>
                        <th>内容</th>
                        <th>优化建议</th>
                    </tr>
                    <tr>
                        <td>标题（Title）</td>
                        <td>{{ result.title | length }}</td>
                        <td>{{ result.title }}</td>
                        <td>一般不超过 80 个字符</td>
                    </tr>
                    <tr>
                        <td>关键词（KeyWords）</td>
                        <td>{{ result.keywords | length }}</td>
                        <td>{{ result.keywords }}</td>
                        <td>一般不超过 100 个字符</td>
                    </tr>
                    <tr>
                        <td>描述（Description）</td>
                        <td>{{ result.description | length }}</td>
                        <td>{{ result.description }}</td>
                        <td>一般不超过 200 个字符</td>
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
                // result: {
                //     title: '1',
                //     description: '12',
                //     keywords: '123'
                // },
                infos: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/c13074d00d9411e99f2863e9d9681573',
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
            query() {
                if (!this.domain) {
                    this.$message({
                        type: 'danger',
                        text: '请输入网址'
                    })
                    return
                }
                this.loading = true
                this.result = ''
                this.$http.get(apiDomain2 + '/seo?url=' + this.domain).then(
                    response => {
                        let data = response.data
                        this.result = data
                        this.loading = false
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                        this.result = -1
                    })
            }
        },
        filters: {
            length(value) {
                if (!value) {
                    return ''
                }
                return value.length + ' 个字符'
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
