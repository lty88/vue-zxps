<template>
    <article class="container-news-box">
        <header class="header">
            <div class="title">{{ news.title }}</div>
            <div class="sub-title">
                <span class="date">{{ news.date }}</span>
                <span class="see">
                    <span class="el-icon-view"></span>
                    <span>{{ news.hot }}</span>
                </span>
            </div>
        </header>
        <section class="content" v-html="news.content" />
        <section v-if="news.fileList && news.fileList.length > 0" class="file-list">
            <div class="file-title">附件:</div>
            <ul>
                <li class="item" v-for="file in news.fileList" :key="file.mfid">
                    <span class="el-icon-caret-right icon"></span>
                    <span class="download" @click="downloadNewsFileAjax(file.mfid)">{{ file.fileName }}</span>
                </li>
            </ul>
        </section>
        <section class="news-link" v-if="next !== '' || prev != ''">
            <div v-if="prev != ''" class="link">
                <span>上一篇：</span>
                <el-link @click="toNews(prev.mid)">{{ prev.title }}</el-link>
            </div>
            <div v-if="next != ''" class="link">
                <span>下一篇：</span>
                <el-link @click="toNews(next.mid)">{{ next.title }}</el-link>
            </div>
        </section>
    </article>
</template>

<script>
    import { getNewsDetail, downloadNewsFile, addHot } from '@/ApiCp/News'

    export default {
        name: 'newdetail',
        created () {
            this.mid = this.$route.params.mid
            this.addHotAjax()
        },
        beforeRouteUpdate (to, from, next) {
            this.mid = to.params.mid
            this.addHotAjax()
            next()
        },
        data () {
            return {
                mid: '',
                prev: '',
                next: '',
                news: {}
            }
        },
        watch: {
            mid () {
                this.getNewsDetailAjax()
            }
        },
        methods: {
            getNewsDetailAjax () {
                getNewsDetail({ mid: this.mid }).then(res => {
                    const { news, prev, next } = res.data
                    this.prev = prev === null ? '' : prev
                    this.news = news === null ? '' : news
                    this.next = next === null ? '' : next
                })
            },
            downloadNewsFileAjax (mfid) {
                let open = window.open
                downloadNewsFile({mfid}).then(res => {
                    if (res.code === 200) {
                        open(res.data.url)
                        return true
                    }
                    this.$message({ type: 'warning', message: res.message })
                })
            },
            addHotAjax (mid) {
                addHot({
                    mid: this.mid
                })
            },
            toNews (mid) {
                this.$router.push({ path: `/news/newsdetail/${mid}` })
            }
        }
    }
</script>

<style lang="sass">
    .container-news-box
        margin: 0 auto;
        width: 75%;
        padding: 30px;
        border: 1px solid #ddd;
        .header
            text-align: center;
            .title
                font-size: 26px;
                font-weight: bold;
            .sub-title
                display: flex;
                justify-content: center;
                margin: 20px 0 15px 0;
                color: #999;
                font-size: 14px;
                .date
                    margin-right: 10px;
        .content
            width: 100%;
            line-height: 1.8;
            font-size: 15px;
            text-indent: 32px;
            img
                display: block !important;
                margin: 0 auto !important;
                width: 500px !important;
        .file-list, .news-link
            padding-top: 15px;
            border-top: 1px solid #ddd;
        .file-list
            padding-bottom: 15px;
            .file-title
                margin-left: 5px;
                font-size: 18px;
                font-weight: bold;
                letter-spacing: 2px;
            .item
                display: flex;
                align-items: center;
                margin-top: 5px;
                cursor: pointer;
                &:hover
                    .download
                        color: #409EFF;
                        text-decoration: underline;
                .icon
                    margin-right: 4px;
                    color: #E6A23C;
                .download
                    text-decoration: underline;
        .news-link
            font-size: 15px;
            .link
                display: flex;
                align-items: center;
</style>
