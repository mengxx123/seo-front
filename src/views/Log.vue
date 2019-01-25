<template>
    <my-page title="Nginx 访问日志分析" :page="page">
        <ui-raised-button class="file-select-btn" label="上传日志文件" primary>
            <input type="file" class="ui-file-button" @change="fileChange($event)">
        </ui-raised-button>
        <!-- <div class="btns">
            <ui-raised-button label="解析" primary @click="query" />
        </div> -->
        <ui-article>
            <h2>请求耗时</h2>
            <table>
                <tr>
                    <th>响应时间</th>
                    <th>访问次数</th>
                    <th>比例</th>
                </tr>
                <tr v-for="item in time">
                    <td>{{ item.name | responseTime }}</td>
                    <td>{{ item.times }}</td>
                    <td>{{ item.percent }}%</td>
                </tr>
            </table>

            <h2>状态码</h2>
            <table>
                <tr>
                    <th>状态码</th>
                    <th>访问次数</th>
                    <th>比例</th>
                </tr>
                <tr v-for="item in statusCode">
                    <td>{{ item.statusCode }}</td>
                    <td>{{ item.times }}</td>
                    <td>{{ item.percent }}%</td>
                </tr>
            </table>

            <h2>蜘蛛</h2>
            <table>
                <tr>
                    <th>类型</th>
                    <th>访问次数</th>
                    <!-- <th>比例</th> -->
                </tr>
                <tr v-for="item in spider">
                    <td>{{ item.name | spiderName }}</td>
                    <td>{{ item.times }}</td>
                    <!-- <td>{{ item.percent }}%</td> -->
                </tr>
            </table>

            <h2>请求方法</h2>
            <table>
                <tr>
                    <th>请求方法</th>
                    <th>访问次数</th>
                    <th>比例</th>
                </tr>
                <tr v-for="item in topMethod">
                    <td>{{ item.method }}</td>
                    <td>{{ item.times }}</td>
                    <td>{{ item.percent }}%</td>
                </tr>
            </table>

            <h2>IP top 10</h2>
            <table>
                <tr>
                    <th>IP</th>
                    <th>访问次数</th>
                    <th>比例</th>
                </tr>
                <tr v-for="item in topIp">
                    <td>{{ item.ip }}</td>
                    <td>{{ item.times }}</td>
                    <td>{{ item.percent }}%</td>
                </tr>
            </table>
        </ui-article>

        <div class="ui-loading" v-if="loading">
            <ui-circular-progress :size="24"/>
        </div>
        <div v-if="error">{{ error }}</div>
    </my-page>
</template>


<script>
    function trim(text) {
        return text.replace(/^\s+/, '').replace(/\s+$/, '')
    }

    export default {
        data () {
            return {
                loading: false,
                domain: '',
                result: '',
                topIp: [
                    {
                        ip: '120.78.177.9',
                        times: 9
                    }
                ],
                topMethod: [],
                spider: [],
                time: [],
                statusCode: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/f236e1d016dc11e9a07ccda9c9b24cf0',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                },
                error: null
            }
        },
        mounted() {
//             let text = `220.181.108.97 - - [11/Jan/2019:03:39:36 +0800] "GET /static/js/app.35988a0ba5fe8e00e272.js HTTP/1.1" 200 8038 "https://coding.yunser.com/core_values?embed=true" "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1" "-"
// 123.125.71.94 - - [11/Jan/2019:03:39:36 +0800] "GET /static/js/vendor.7b0338b2b13525aa59c0.js HTTP/1.1" 200 20257 "https://coding.yunser.com/core_values?embed=true" "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1" "-"
// 123.125.71.94 - - [11/Jan/2019:03:39:36 +0800] "GET /static/js/2.b19a571e29c292b3e13d.js HTTP/1.1" 200 6788 "https://coding.yunser.com/core_values?embed=true" "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1" "-"
// 182.200.7.8 - - [11/Jan/2019:03:41:04 +0800] "HEAD / HTTP/1.1" 301 0 "-" "Chrome/57" "-"
// 203.208.60.80 - - [11/Jan/2019:03:42:10 +0800] "GET /c/mail.html HTTP/1.1" 200 12466 "-" "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" "-"
// 216.244.66.250 - - [11/Jan/2019:03:46:21 +0800] "GET / HTTP/1.1" 200 1000 "-" "Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)" "-"`
//             this.dealText(text)
        },
        methods: {
            dealText(text) {
                let lines = text.split('\n')
                console.log('lines.length', lines.length)
                let result = []
                for (let line of lines) {
                    if (!line) {
                        continue
                    }
                    let match = line.match(/([\d\D]+)"([\d\D]+)"([\d\D]+)"([\d\D]+)" "([\d\D]+)" "([\d\D]+)"/)
                    // console.log('match', match)
                    let arr = match[1].split(/\s+/)
                    let time = match[1].match(/\[([\d\D]+?)\]/)[1]
                    let arr2 = match[2].split(/\s+/)
                    // console.log(arr2)
                    let arr3 = trim(match[3]).split(/\s+/)
                    if (arr2[0] !== 'HEAD' && arr2[0] !== 'GET' && arr2[0] !== 'POST' && arr2[0] !== 'OPTIONS') {
                        console.log('异常', line, match)
                        continue
                    }
                    result.push({
                        ip: arr[0],
                        time,
                        method: arr2[0],
                        url: arr2[1],
                        statusCode: arr3[0],
                        responseTime: parseInt(arr3[1]),
                        ua: match[5]
                    })
                }
                console.log('result.length', result.length)
                console.log('result', result)

                this.topIp = this.getTop(result, 'ip')
                this.topMethod = this.getTop(result, 'method')
                this.statusCode = this.getTop(result, 'statusCode')
                this.spider = this.getSpider(result)
                this.time = this.getTime(result)
                // console.log(this.topMethod)
            },
            getTime(result, field) {
                let map = {
                    t0_500: 0,
                    t500_1000: 0,
                    t1000_3000: 0,
                    t3000_5000: 0,
                    t5000: 0
                }
                for (let item of result) {
                    if (item.responseTime < 500) {
                        map.t0_500++
                    } else if (item.responseTime < 1000) {
                        map.t500_1000++
                    } else if (item.responseTime < 3000) {
                        map.t1000_3000++
                    } else if (item.responseTime < 5000) {
                        map.t3000_5000++
                    } else if (item.responseTime > 5000) {
                        map.t5000++
                    }
                }
                let newResult = []
                for (let key in map) {
                    newResult.push({
                        name: key,
                        times: map[key],
                        percent: (map[key] / result.length * 100).toFixed(2)
                    })
                }
                newResult = newResult.sort((a, b) => {
                    return b.times - a.times
                })
                return newResult.slice(0, 10)
            },
            getSpider(result, field) {
                let map = {
                    google: 0,
                    baidu: 0,
                    sogou: 0,
                    robot360: 0,
                    yisou: 0
                }
                for (let item of result) {
                    if (item.ua && item.ua.indexOf('Googlebot') !== -1) {
                        map.google++
                    } else if (item.ua && item.ua.indexOf('Baiduspider') !== -1) {
                        map.baidu++
                    } else if (item.ua && item.ua.indexOf('YisouSpider') !== -1) {
                        map.yisou++
                    } else if (item.ua && item.ua.indexOf('360Spider') !== -1) {
                        map.robot360++
                    } else if (item.ua && item.ua.indexOf('Sogou web spider') !== -1) {
                        map.sogou++
                    }
                }
                let newResult = []
                for (let key in map) {
                    newResult.push({
                        name: key,
                        times: map[key]
                        // percent: (map[key] / result.length * 100).toFixed(2)
                    })
                }
                newResult = newResult.sort((a, b) => {
                    return b.times - a.times
                })
                return newResult.slice(0, 10)
            },
            getTop(result, field) {
                let map = {}
                for (let item of result) {
                    if (map[item[field]]) {
                        map[item[field]]++
                    } else {
                        map[item[field]] = 1
                    }
                }
                let newResult = []
                for (let key in map) {
                    newResult.push({
                        [field]: key,
                        times: map[key],
                        percent: (map[key] / result.length * 100).toFixed(2)
                    })
                }
                newResult = newResult.sort((a, b) => {
                    return b.times - a.times
                })
                return newResult.slice(0, 10)
            },
            fileChange(event) {
                let files = event.target.files
                if (!files.length) {
                    alert('请选择图片')
                    return
                }

                let file = files[0]
                // if (!/image\/\w+/.test(file.type)) {
                //     alert('请上传正确格式的图片文件')
                //     return
                // }
                let reader = new FileReader()
                reader.onload = e => {
                    this.dealText(e.target.result)
                    // this.size = '图片大小：' + Math.ceil(file.size / 1024) + 'KB'
                    // this.src = e.target.result
                }
                reader.readAsText(file)
            }
        },
        filters: {
            spiderName(value) {
                let map = {
                    google: '谷歌',
                    baidu: '百度',
                    sogou: '搜狗',
                    robot360: '360',
                    yisou: '宜搜'
                }
                return map[value]
            },
            responseTime(value) {
                let map = {
                    t0_500: '< 500ms',
                    t500_1000: '500-1000ms',
                    t1000_3000: '1000-3000ms',
                    t3000_5000: '3000-5000ms',
                    t5000: '> 5000ms'
                }
                return map[value]
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
