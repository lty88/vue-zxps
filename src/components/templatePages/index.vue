<template>
    <div class="temp-container">
        <div class="title">
            <i :class="icon" />
            <span>{{ name }}</span>
        </div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'template-pages',
        props: {
            icon: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import '~@/styles/common.sass'
    .temp-container
        .title
            margin-bottom: 10px;
            font-size: $text-font-size;
        .content
            padding: 30px;
            background-color: #FFFFFF;
            border: 1px solid #ddd;
            border-radius: 5px;
</style>
