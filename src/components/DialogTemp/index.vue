<template>
    <el-dialog
        :title="title"
        :visible.sync="display"
        :center="true"
        :width="width"
        :append-to-body="toTop"
        @close="close"
    >
        <slot />
    </el-dialog>
</template>

<script>
    export default {
        name: 'dialog-temp',
        props: {
            title: {
                type: String,
                default: '默认弹出框名字'
            },
            show: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: '500px'
            },
            toTop: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            display: {
                get () {
                    return this.show
                },
                set (val) {}
            }
        },
        methods: {
            close () {
                // 在stepTemp中监听关闭
                this.$emit('close')
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>
