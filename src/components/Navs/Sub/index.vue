<template>
    <el-submenu :index="myIndex">
        <template slot="title">
            <i v-if="nav.props.icon != ''" :class="nav.props.icon"></i>
            <span>{{ nav.props.name }}</span>
        </template>
        <el-menu-item-group>
            <template v-for="(item, index) in nav.children">
                <sub v-if="item.children !== undefined && item.children.length !== 0" :key="index" :nav="item" :myIndex="`${myIndex}/${item.path}`"></sub>
                <el-menu-item v-else :key="index" :index="`${myIndex}/${item.path}`">{{ item.props.name }}</el-menu-item>
            </template>
        </el-menu-item-group>
    </el-submenu>
</template>

<script>
    export default {
        name: 'sub',
        props: {
            myIndex: {
                type: Number
            },
            nav: {
                type: Object
            }
        }
    }
</script>

<style scoped>

</style>
