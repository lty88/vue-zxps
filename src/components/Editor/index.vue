<template>
    <div class="container-editor" ref="wangEditor">
        <div ref="editorMenu" class="editorMenu"></div>
        <div ref="editor" class="editor"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    import { uploadNewsInnerImg } from '@/ApiCp/News'

    export default {
        name: 'editor',
        mounted () {
            this.editor = new E(this.$refs.editorMenu, this.$refs.editor)
            this.editor.customConfig = this.customConfig
            this.editor.create()
        },
        props: {
            value: {
                type: String
            }
        },
        data () {
            return {
                editor: '',
                customConfig: {
                    uploadImgServer: '/upload',
                    menus: [
                        'head',
                        'fontSize',
                        'fontName',
                        'bold',
                        'italic',
                        'underline',
                        'strikeThrough',
                        'foreColor',
                        'backColor',
                        'link',
                        'list',
                        'justify',
                        'quote',
                        'image',
                        'table',
                        'undo',
                        'redo'
                    ],
                    onchangeTimeout: 300,
                    onchange: (html) => {
                        this.$emit('input', html === '<p><br></p>' ? '' : html)
                    },
                    customUploadImg: (files, insert) => {
                        let formdata = new FormData()
                        formdata.append('file', files[0], files[0].name)
                        this.uploadNewsInnerImgAjax(formdata).then(url => {
                            insert(url)
                        })
                    }
                }
            }
        },
        methods: {
            uploadNewsInnerImgAjax (data) {
                return new Promise((resolve, reject) => {
                    uploadNewsInnerImg(data).then(res => {
                        if (res.code !== 200) {
                            this.$message({ type: 'warning', message: res.message })
                            return false
                        }
                        resolve(res.data)
                    })
                })
            }
        }
    }
</script>

<style lang="sass">
    .container-editor
        line-height: 20px;
        .editorMenu
            border: 0.5px solid #dddddd;
            border-radius: 4px 4px 0 0;
        .editor
            margin-top: -1px;
            min-height: 300px;
            border: 1px solid #dddddd;
            border-radius: 0 0 4px 4px;
            overflow: hidden;
            .w-e-text
                min-height: 300px !important;
                overflow: auto;
</style>
