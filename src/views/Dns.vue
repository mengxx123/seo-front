<template>
    <my-page title="DNS检测/查询记录" :page="page">
        <div class="common-container container">
            <ui-text-field v-model="domain" label="域名" hintText="比如：yunser.com" />
            <br>
            <div style="margin-top:10px">
                <label class="type">查询类型：</label>
                <ui-radio class="radio" v-model="type" label="NS记录" name="group" nativeValue="ns"/>
                <ui-radio class="radio" v-model="type" label="A记录" name="group" nativeValue="a"/>
                <ui-radio class="radio" v-model="type" label="CNAME记录" name="group" nativeValue="cname"/>
                <ui-radio class="radio" v-model="type" label="MX记录" name="group" nativeValue="mx"/>
                <ui-radio class="radio" v-model="type" label="TXT记录" name="group" nativeValue="txt"/>
                <ui-radio class="radio" v-model="type" label="AAAA记录" name="group" nativeValue="aaaa"/>
            </div>
            <div class="btns">
                <ui-raised-button label="查询" primary @click="query" />
            </div>
            <div class="ui-loading" v-if="loading">
                <ui-circular-progress :size="24"/>
            </div>
            <ui-article>
                <table v-if="result">
                    <tr>
                        <th>记录类型</th>
                        <th>主机记录</th>
                        <th>记录值</th>
                        <th v-if="type === 'ms'">MX优先级</th>
                        <th title="生存时间">TTL</th>
                    </tr>
                    <tr v-for="item in result">
                        <td>{{ item.type }} 记录</td>
                        <td>{{ item.host }}</td>
                        <td>{{ item.target || item.ip }}</td>
                        <td v-if="type === 'ms'">{{ item.pri || '-' }}</td>
                        <td>{{ item.ttl }}</td>
                    </tr>
                </table>
                <p v-if="error">{{ error }}</p>
            </ui-article>
        </div>

        <!-- <tr style="background-color:#FFFFFF;text-align:center;padding:5px">
				<td colspan="5">
					<a href="http://hechaocheng.cn/tools/alexa.php?q=<?=$query;?>" target="_blank" style="color:green" title="查询网站<?=$query;?>的世界排名">Alexa世界排名</a> |
					<a href="http://hechaocheng.cn/tools/pr.php?q=<?=$query;?>" target="_blank" style="color:red" title="查询网站<?=$query;?>的PR值">GOOGLE PR</a> |
					<a href="http://hechaocheng.cn/tools/status.php?q=<?=$query;?>" target="_blank" style="color:blue" title="查询网站<?=$query;?>的HTTP状态">HTTP状态查询</a> |
					<a href="http://hechaocheng.cn/tools/meta.php?q=<?=$query;?>" target="_blank" style="color:green" title="查询网站<?=$query;?>的META信息">网页META信息</a> |
					<a href="http://hechaocheng.cn/tools/source_code.php?q=<?=$query;?>" target="_blank" style="color:blue" title="查询网站<?=$query;?>的网页源代码">查看网页源代码</a> |
					<a href="http://hechaocheng.cn/tools/whois.php?q=<?=$query;?>" target="_blank" style="color:red" title="查询网站<?=$query;?>的Whois信息">Whois信息</a> |
					<a href="http://hechaocheng.cn/tools/ip.php?q=<?=$query;?>" target="_blank" style="color:green" title="查询网站<?=$query;?>的服务器IP">服务器IP查询</a>
				</td>
			</tr> -->
    </my-page>
</template>


<script>
    export default {
        data () {
            return {
                loading: false,
                domain: '',
                type: 'a',
                result: null,
                error: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/fa1674800d9311e99f2863e9d9681573',
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
                this.type = this.$route.query.type || 'a'
                this.query()
            }
            // this.debug()
        },
        methods: {
            debug() {
                this.type = 'a'
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
                this.loading = true
                this.result = null
                this.error = null
                this.$http.get(`dns.php?q=${this.domain}&t=${this.type}`).then(
                    response => {
                        let data = response.data
                        console.log(data)
                        this.result = data
                        this.loading = false
                    },
                    response => {
                        console.log('错误')
                        this.error = '没有相关记录!'
                        console.log(response)
                        this.loading = false
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .type {
        position: relative;
        top: -8px;
    }
    .btns {
        margin-top: 16px;
        margin-bottom: 16px;
        .btn {
            margin-right: 8px;
        }
    }
    .radio {
        margin-right: 16px;
    }
</style>
