<template>
    <my-page title="域名 WHOIS 查询" :page="page">
        <ui-text-field v-model="domain" label="域名" hintText="yunser.com" />
        <br>
        <ui-raised-button label="查询" primary @click="query" />

        <pre class="result">{{ result }}</pre>
    </my-page>
</template>


<script>
    export default {
        data () {
            return {
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
            // this.query()
        },
        methods: {
            query() {
                if (!this.domain) {
                    alert('请输入域名')
                    return
                }
                this.$http.get('/whois.php?domain=' + this.domain).then(
                    response => {
                        let data = response.data
                        this.result = data
                    },
                    response => {
                        console.log(response)
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
