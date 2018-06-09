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
        <pre class="result">{{ result }}</pre>
    </my-page>
</template>


<script>
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
