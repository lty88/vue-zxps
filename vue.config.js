module.exports = {
  lintOnSave: false,
  devServer:{
    host:'0.0.0.0',
    port:8080,
    proxy:{
      '/api':{
        target:'http://192.168.1.166:9092',
        changeOrigin:true,
        pathRewrite:{
          '/api':''
        }
      }
    }
  },
}
