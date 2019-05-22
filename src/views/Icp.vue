<template>
    <my-page title="ICP 备案查询" :page="page">
        <div class="common-container container">
            <ui-text-field v-model="domain" label="域名" hintText="xxx.com" />
            <br>
            <div class="btns">
                <ui-raised-button label="查询" primary @click="query" />
            </div>

            <div class="ui-loading" v-if="loading">
                <ui-circular-progress :size="24"/>
            </div>
            <ui-article class="result" v-if="result">
                <table>
                    <!--<tr>-->
                        <!--<th>备案编号</th>-->
                        <!--<td></td>-->
                    <!--</tr>-->
                    <tr>
                        <th class="title center" colspan="2">ICP 备案主体信息</th>
                    </tr>
                    <tr>
                        <th class="title">备案/许可证号</th>
                        <td>{{ result.icp || result.nowIcp }}</td>
                    </tr>
                    <tr>
                        <th class="title">审核通过时间</th>
                        <td>{{ result.checkDate }}</td>
                    </tr>
                    <tr>
                        <th class="title">主办单位名称</th>
                        <td>{{ result.name }}</td>
                    </tr>
                    <tr>
                        <th class="title">主办单位性质</th>
                        <td>{{ result.nature }}</td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th class="title center" colspan="2">ICP 备案网站信息</th>
                    </tr>
                    <tr>
                        <th class="title">网站名称</th>
                        <td>{{ result.sitename }}</td>
                    </tr>
                    <tr>
                        <th class="title">网站首页网址</th>
                        <td>{{ result.indexUrl }}</td>
                    </tr>
                    <tr>
                        <th class="title">备案/许可证号</th>
                        <td>{{ result.nowIcp }}</td>
                    </tr>
                </table>
            </ui-article>
            <div v-if="error">{{ error }}</div>
        </div>
    </my-page>
</template>


<script>
    import {apiDomain2} from '@/config'

    export default {
        data () {
            return {
                loading: false,
                domain: '',
                result: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/5123f2000d9111e9b4c16f0404983c51',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                },
                error: null
            }
        },
        mounted() {
            let data = this.$route.query.data
            if (data) {
                this.domain = data
                this.query()
            }
            //  this.debug()
        },
        methods: {
            debug() {
                this.domain = 'yunser.com'
                this.query()
            },
            query() {
                if (!this.domain) {
                    this.$message({
                        type: 'danger',
                        text: '请输入域名'
                    })
                    return
                }
                this.result = null
                this.error = null
                this.loading = true
                this.$http.get(apiDomain2 + '/icp?domain=' + this.domain).then(
                    response => {
                        let data = response.data
                        console.log(data)
                        if (data.type === 300) {
                            this.error = data.message
                            this.loading = false
                            return
                        }
                        this.result = data
                        this.loading = false
                    },
                    response => {
                        this.error = '服务器出错！'
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
        /*margin-top: 24px;*/
    }
    .title {
        text-align: left;
    }
    .center {
        text-align: center;
    }
</style>
