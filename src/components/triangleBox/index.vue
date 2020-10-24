<template>
    <ul class="operation-list">
        <slot />
    </ul>
</template>

<script>
    export default {
        name: 'triangle-box'
    }
</script>

<style lang="sass" scoped>
    @import '~@/styles/common.sass'

    .operation-list
        position: relative;
        padding: 3px 0;
        color: #333333;
        background-color: #FFFFFF;
        box-shadow: 0 0 23px #999999;
        border-radius: 2px;
        li
            padding: 5px 8px;
            font-size: $micro-font-size;
            white-space: nowrap;
            &:hover
                background-color: #eeeeee;
                font-size: bold;
        &:before
            position: absolute;
            top: -16px;
            left: 50%;
            transform: translateX(-50%);
            content: ''
            border-width: 8px;
            border-color:  transparent transparent #FFFFFF transparent;
            border-style: solid;
</style>
