<template>
    <div class="container-box">
        <section class="module recommand">
            <header class="title recommand">推荐阅读</header>
            <ul class="recommand-list">
                <li class="recommand-item" v-for="item in recommands" :key="item.mid" @click="toNews(item.mid)">
                    <span class="el-icon-caret-right icon"></span>
                    <span class="text">{{ item.title }}</span>
                </li>
            </ul>
        </section>
        <section class="module news-List">
            <header class="title news-title">
                <span>工作信息</span>
            </header>
            <ul class="news-list">
                <li class="news-item" v-for="item in news" :key="item.mid" @click="toNews(item.mid)">
                    <header class="item-title">{{ item.title }}</header>
                    <section class="summarize">{{ item.description }}</section>
                    <section class="info">
                        <span class="item">
                            <span class="el-icon-date icon"></span>
                            <span class="value">{{ item.date }}</span>
                        </span>
                        <span class="item">
                            <span class="el-icon-view icon"></span>
                            <span class="value">{{ item.hot }}</span>
                        </span>
                    </section>
                </li>
            </ul>
            <section class="page">
                <el-pagination background layout="prev, pager, next" :total="page.count" :current-page="currentPage"></el-pagination>
            </section>
        </section>
    </div>
</template>

<script>
    import { getHomeRecommand, getHomeNews } from '@/ApiCp/News'

    export default {
        name: 'newlist',
        created () {
            this.getHomeRecommandAjax()
            this.$root.$on('changeNav', (mtid) => {
                this.mtid = mtid
                this.getHomeNewsAjax()
            })
        },
        mounted () {
            this.$nextTick(() => {
                if (this.mtid === '') {
                    this.$root.$emit('letNavChange')
                }
            })
        },
        beforeDestroy () {
            this.$root.$off('changeNav')
        },
        data () {
            return {
                page: {
                    page: 1,
                    size: 15,
                    count: 0
                },
                mtid: '',
                recommands: [],
                news: []
            }
        },
        methods: {
            getHomeRecommandAjax () {
                getHomeRecommand().then(res => {
                    if (res.code !== 200) {
                        this.$message({ type: 'warning', message: res.message })
                        return false
                    }
                    this.recommands = res.data.recommands
                })
            },
            getHomeNewsAjax () {
                getHomeNews({
                    page: this.page.page,
                    size: this.page.size,
                    mtid: this.mtid
                }).then(res => {
                    this.page.count = res.data.count
                    this.news = res.data.news
                })
            },
            currentPage (page) {
                this.page.page = page
                this.getHomeNewsAjax()
            },
            toNews (mid) {
                this.$router.push({ path: `/news/newsdetail/${mid}` })
            }
        }
    }
</script>

<style lang="sass" scoped>
    .container-box
        display: flex;
        margin: 0 auto;
        width: 95%;
        .module
            &:first-child
                margin-right: 40px;
                width: 24%;
            &:last-child
                width: calc(76% - 40px);
            .title
                position: relative;
                height: 40px;
                line-height: 40px;
            .title.recommand
                display: inline-block;
                width: 30%;
                text-align: center;
                color: #eee;
                background-color: #e84746;
            .title.news-title
                font-size: 25px;
                border-bottom: 1px solid #ddd;
                span
                    position: absolute;
                    top: -10px;
            .recommand-list
                padding: 10px;
                border: 1px solid #ddd;
                .recommand-item
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 10px;
                    max-height: 64px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: wrap;
                    cursor: pointer;
                    &:hover
                        .text
                            color: #F56C6C;
                            text-decoration: underline;
                    .icon
                        margin-top: 4px;
                        margin-right: 3px;
                        color: #F56C6C;
            .news-list
                .news-item
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                    cursor: pointer;
                    transition: all 0.3s;
                    &:hover
                        background-color: #faecd8;
                    .item-title
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 20px;
                        font-weight: bold;
                        color: #0b2298;
                        &:hover
                            text-decoration: underline;
                    .summarize
                        margin: 12px 0;
                        font-size: 14px;
                        color: #5f646e;
                    .info
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 12px;
                        .item
                            display: flex;
                            align-items: center;
                            .icon
                                margin-right: 4px;
                                font-size: 16px;
                                color: #F56C6C;
                            .value
                                color: #E6A23C;
            .page
                margin: 10px 0;
                width: 100%;
                text-align: center;
</style>
