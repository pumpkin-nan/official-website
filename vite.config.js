import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import postcsspxtoviewport from 'postcss-px-to-viewport'
import postcsspxtorem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    open:true, //自动浏览
    port:8088
  },
  // css:{
  //   postcss:{
  //     plugins:[
  //       postcsspxtorem({
  //         rootValue:76,
  //         unitPrecision:3,
  //         propList:['*'],
  //         selectorBlackList:['ignore'],
  //         replace:true,
  //         mediaQuery:false,
  //         minPixelValue:0,
  //         exclude:/node_modules/i
  //       })
  //     ]
  //   }
  // },
  resolve:{
    '@':path.resolve(__dirname,'src')
  },
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
