<template>
    <div class="container-box">
        <header class="header">搜索“{{ searchKey }}”的结果</header>
        <section v-if="news.length !== 0" class="content">
            <div class="news-box">
                <ul class="news-list">
                    <li class="news-item" v-for="item in news" :key="item.mid" @click="toNews(item.mid)">
                        <span class="el-icon-caret-right arrow"></span>
                        <span class="box">
                            <div class="news-title">{{ item.title }}</div>
                            <div class="news-description">{{ item.description }}</div>
                            <div class="news-info">
                                <span class="info-item">
                                    <span class="el-icon-date icon"></span>
                                    <span class="value">{{ item.date }}</span>
                                </span>
                                <span class="info-item">
                                    <span class="el-icon-view icon"></span>
                                    <span class="value">{{ item.hot }}</span>
                                </span>
                            </div>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="page">
                <el-pagination background layout="prev, pager, next" :total="page.count" :current-page="currentPage">
                </el-pagination>
            </div>
        </section>
        <section v-else class="error">抱歉， 没有找到关于”{{ searchKey }}“相关的内容。</section>
    </div>
</template>

<script>
    import { searchNews } from '@/ApiCp/News'

    export default {
        name: 'newssearch',
        created () {
            this.$root.$on('searchNews', (searchKey) => {
                this.searchKey = searchKey
            })
        },
        beforeDestroy () {
            this.$root.$off('searchNews')
        },
        data () {
            return {
                page: {
                    page: 1,
                    size: 10,
                    count: 0
                },
                news: [],
                searchKey: ''
            }
        },
        watch: {
            searchKey () {
                this.searchAjax()
            }
        },
        methods: {
            searchAjax () {
                searchNews({
                    page: this.page.page,
                    size: this.page.size,
                    searchKey: this.searchKey
                }).then(res => {
                    if (res.code !== 200) {
                        this.$message({ type: 'warning', message: res.message })
                        return false
                    }
                    this.news = res.data.news
                    this.page.count = res.data.count
                })
            },
            currentPage (page) {
                this.page.page = page
                this.searchAjax()
            },
            toNews (mid) {
                this.$router.push({ path: `/news/newsdetail/${mid}` })
            }
        }
    }
</script>

<style lang="sass" scoped>
    .container-box
        margin: 0 auto;
        width: 75%;
        padding: 30px;
        border: 1px solid #ddd;
        .header
            padding-bottom: 10px;
            margin-bottom: 10px;
            font-size: 22px;
            border-bottom: 1px solid #ddd;
        .error
            font-size: 14px;
            font-weight: bold;
        .content
            .news-box
                .news-item
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                    cursor: pointer;
                    transition: all 0.3s;
                    .arrow
                        margin-left: -4px;
                        margin-right: 6px;
                        color: #F56C6C;
                    &:hover
                        background-color: #faecd8;
                    .box
                        width: calc(100% - 10px);
                        .news-title
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 20px;
                            font-weight: bold;
                            color: #0b2298;
                            &:hover
                                text-decoration: underline;
                        .news-description
                            margin: 12px 0;
                            font-size: 14px;
                            color: #5f646e;
                        .news-info
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 12px;
                            .info-item
                                display: flex;
                                align-items: center;
                                .icon
                                    margin-right: 4px;
                                    font-size: 16px;
                                    color: #F56C6C;
                                .value
                                    color: #E6A23C;
            .page
                padding-top: 20px;
                text-align: center;
</style>
