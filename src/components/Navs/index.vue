<template>
    <el-menu :router="true" background-color="#324157" text-color="#fff">
        <template v-for="(nav, index) in navs">
            <v-sub v-if="nav.children !== undefined && nav.children.length !== 0" :key="index" :nav="nav" :myIndex="nav.path"></v-sub>
            <el-menu-item v-else :key="index" :index="nav.path">
                <i :class="nav.props.icon"></i>
                <span slot="title">{{ nav.props.name }}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script>
    import VSub from './Sub'
    import { mapGetters } from 'vuex'

    export default {
        name: 'navs',
        computed: {
            ...mapGetters([
                'navs'
            ])
        },
        components: {
            VSub
        }
    }
</script>

<style lang="sass" scoped>

</style>
