<template>
    <my-page title="robots.txt 生成工具" :page="page">
        <div class="common-container container">
            <form id="form">
                <table border="0" cellpadding="2" width="100%" align="center" style="border: 1px solid #ddd;" class="table">
                    <tbody><tr>
                        <td width="37%" valign="top"><b>默认 - 所有机器人是:</b></td>
                        <td width="17%">
                            <select id="allow" name="allow" size="1">
                                <option selected="" value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select></td>
                        <td valign="top" width="43%">&nbsp;</td>
                    </tr><tr></tr>
                    <tr>
                        <td width="37%" valign="top"><b>检索间隔:</b></td>
                        <td colspan="2">
                            <select id="delay" name="delay" size="1">
                                <option selected="" value="">不限</option>
                                <option value="5">5 秒</option>
                                <option value="10">10 秒</option>
                                <option value="20">20 秒</option>
                                <option value="60">60 秒</option>
                                <option value="120">120 秒</option>
                            </select></td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top"><strong>Sitemap: </strong><em>(留空为无)</em></td>
                        <td colspan="2"><input type="text" name="sitemap" size="45" value="http://www.yoursite.com/sitemap.gz"></td>
                    </tr>
                    <tr>
                    </tr><tr>
                    </tr><tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td colspan="2">&nbsp;</td>
                    </tr>

                    <tr><td width="37%" valign="top"><b>普通搜索机器人:</b></td>

                        <td width="17%">Google</td>
                        <td valign="top" width="43%">
                            <select id="google" name="google" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>

                            </select>
                            <i>googlebot</i></td>



                    </tr><tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td>Baidu</td>
                        <td>
                            <select id="baidu" name="baidu" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>baiduspider</i></td>
                    </tr>

                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td width="17%">MSN Search</td>
                        <td valign="top" width="43%">
                            <select id="msn" name="msn" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>msnbot</i>
                        </td>
                    </tr>


                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td width="17%">Yahoo</td>
                        <td valign="top" width="43%">
                            <select id="yahoo" name="yahoo" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>yahoo-slurp</i>
                        </td>
                    </tr>

                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td width="17%">Ask/Teoma</td>
                        <td valign="top" width="43%">
                            <select id="teoma" name="teoma" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>teoma</i>
                        </td>
                    </tr>


                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td width="17%">Cuil</td>
                        <td valign="top" width="43%">
                            <select id="cuil" name="cuil" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <em>twiceler</em>
                        </td>
                    </tr>



                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td width="17%">GigaBlast</td>
                        <td valign="top" width="43%">
                            <select id="gigablast" name="gigablast" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>gigabot</i>
                        </td>
                    </tr>



                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td width="17%">Scrub The Web</td>
                        <td valign="top" width="43%">
                            <select id="scrub" name="scrub" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>scrubby</i>
                        </td>
                    </tr>



                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td width="17%">DMOZ Checker</td>
                        <td valign="top" width="43%">
                            <select id="dmoz" name="dmoz" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>robozilla</i>
                        </td>
                    </tr>


                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td width="17%">Nutch</td>
                        <td valign="top" width="43%">
                            <select id="nutch" name="nutch" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>nutch</i>
                        </td>
                    </tr>


                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td>Alexa/Wayback</td>
                        <td>
                            <select id="alexa" name="alexa" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>ia_archiver</i></td>
                    </tr>

                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td>Naver</td>
                        <td>
                            <select id="naver" name="naver" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <em>naverbot, yeti</em>
                        </td>
                    </tr>




                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td colspan="2">&nbsp;</td>
                    </tr>
                    <tr>
                        <td width="37%" valign="top"><b>特殊搜索机器人:</b></td>
                        <td width="17%">Google Image</td>
                        <td valign="top" width="43%">
                            <select id="gimage" name="gimage" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>googlebot-image</i>
                        </td>
                    </tr>



                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td width="17%">Google Mobile</td>
                        <td valign="top" width="43%">
                            <select id="gmobile" name="gmobile" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>googlebot-mobile</i>
                        </td>
                    </tr>




                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td width="17%">Yahoo MM</td>
                        <td valign="top" width="43%">
                            <select id="ymm" name="ymm" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>yahoo-mmcrawler</i>
                        </td>
                    </tr>



                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td width="17%">MSN PicSearch</td>
                        <td valign="top" width="43%">
                            <select id="psbot" name="psbot" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>psbot</i>
                        </td>
                    </tr>

                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td width="17%">SingingFish</td>
                        <td width="43%">
                            <select id="sing" name="sing" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>asterias</i>
                        </td>
                    </tr>

                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td>Yahoo Blogs</td>
                        <td>
                            <select id="blogs" name="blogs" size="1">
                                <option selected="" value="">默认</option>
                                <option value=" ">允许</option>
                                <option value=" /">拒绝</option>
                            </select>
                            <i>yahoo-blogs/v3.9</i>
                        </td>
                    </tr>

                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td colspan="2">&nbsp;</td>
                    </tr>

                    <tr><td width="37%" valign="top"><b>限制目录:</b></td>
                        <td colspan="2">
                            <i>路径是相对的，但每个路径之前都要包含："/"</i>
                        </td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td colspan="2"><input type="text" name="T1" size="45" value="/cgi-bin/"></td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td colspan="2"><input type="text" name="T2" size="45"></td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td colspan="2"><input type="text" name="T3" size="45"></td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td colspan="2"><input type="text" name="T4" size="45"></td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td width="37%" valign="top">&nbsp;</td>
                        <td colspan="2"><input type="text" name="T5" size="45"></td>
                    </tr>
                    <tr></tr>
                    </tbody></table>
            </form>
            <div class="btns">
                <ui-raised-button class="btn" label="生成 Robots.txt" primary @click="create" />
                <ui-raised-button class="btn btn-copy" label="复制" v-if="result" />
                <ui-raised-button class="btn" label="下载" @click="download" v-if="result" />
                <!-- <input type="reset" value="清除所有" class="submit btn btn-primary"><br> -->
            </div>
            <textarea v-model="result" wrap="" name="robolist" rows="19" cols="65" class="textareas form-control"></textarea>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    const saveAs = window.saveAs

    export default {
        data () {
            return {
                result: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/15489fc00d9511e99f2863e9d9681573',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.clipboard = new Clipboard('.btn-copy', {
                text: trigger => {
                    return this.result
                }
            })
            this.clipboard.on('success', e => {
                console.info('Action:', e.action)
                console.info('Text:', e.text)
                console.info('Trigger:', e.trigger)
                e.clearSelection()
            })
            this.clipboard.on('error', e => {
                console.error('Action:', e.action)
                console.error('Trigger:', e.trigger)
            })
        },
        destroyed() {
            this.clipboard.destroy()
        },
        methods: {
            create() {
                let b = window.form
                let content = ''
                content = "# robots.txt generated at http://seo.yunser.net/\n";
                if (b.google.value != "") {
                    content += "User-agent: Googlebot\nDisallow:" + b.google.value + "\n"
                }
                if (b.gimage.value != "") {
                    content += "User-agent: googlebot-image\nDisallow:" + b.gimage.value + "\n"
                }
                if (b.gmobile.value != "") {
                    content += "User-agent: googlebot-mobile\nDisallow:" + b.gmobile.value + "\n"
                }
                if (b.msn.value != "") {
                    content += "User-agent: MSNBot\nDisallow:" + b.msn.value + "\n"
                }
                if (b.yahoo.value != "") {
                    content += "User-agent: Slurp\nDisallow:" + b.yahoo.value + "\n"
                }
                if (b.teoma.value != "") {
                    content += "User-agent: Teoma\nDisallow:" + b.teoma.value + "\n"
                }
                if (b.cuil.value != "") {
                    content += "User-agent: twiceler\nDisallow:" + b.cuil.value + "\n"
                }
                if (b.gigablast.value != "") {
                    content += "User-agent: Gigabot\nDisallow:" + b.gigablast.value + "\n"
                }
                if (b.scrub.value != "") {
                    content += "User-agent: Scrubby\nDisallow:" + b.scrub.value + "\n"
                }
                if (b.dmoz.value != "") {
                    content += "User-agent: Robozilla\nDisallow:" + b.dmoz.value + "\n"
                }
                if (b.nutch.value != "") {
                    content += "User-agent: Nutch\nDisallow:" + b.nutch.value + "\n"
                }
                if (b.alexa.value != "") {
                    content += "User-agent: ia_archiver\nDisallow:" + b.alexa.value + "\n"
                }
                if (b.baidu.value != "") {
                    content += "User-agent: baiduspider\nDisallow:" + b.baidu.value + "\n"
                }
                if (b.naver.value != "") {
                    content += "User-agent: naverbot\nDisallow:" + b.naver.value + "\n";
                    content += "User-agent: yeti\nDisallow:" + b.naver.value + "\n"
                }
                if (b.ymm.value != "") {
                    content += "User-agent: yahoo-mmcrawler\nDisallow:" + b.ymm.value + "\n"
                }
                if (b.psbot.value != "") {
                    content += "User-agent: psbot\nDisallow:" + b.psbot.value + "\n"
                }
                if (b.sing.value != "") {
                    content += "User-agent: asterias\nDisallow:" + b.sing.value + "\n"
                }
                if (b.blogs.value != "") {
                    content += "User-agent: yahoo-blogs/v3.9\nDisallow:" + b.blogs.value + "\n"
                }
                if (b.allow.value != "") {
                    content += "User-agent: *\nDisallow:" + b.allow.value + "\n"
                }
                if (b.delay.value != "") {
                    content += "Crawl-delay: " + b.delay.value + "\n"
                }
                if (b.T1.value != "") {
                    content += "Disallow: " + b.T1.value + "\n"
                }
                if (b.T2.value != "") {
                    content += "Disallow: " + b.T2.value + "\n"
                }
                if (b.T3.value != "") {
                    content += "Disallow: " + b.T3.value + "\n"
                }
                if (b.T4.value != "") {
                    content += "Disallow: " + b.T4.value + "\n"
                }
                if (b.T5.value != "") {
                    content += "Disallow: " + b.T5.value + "\n"
                }
                if (b.sitemap.value != "") {
                    content += "Sitemap: " + b.sitemap.value + "\n"
                }
                this.result = content
            },
            download() {
                if (!this.result) {
                    this.create()
                }
                let blob = new Blob([this.result], {type: 'text/plain;charset=utf-8'})
                saveAs(blob, 'robots.txt')
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
</style>
