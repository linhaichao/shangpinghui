import Vue from 'vue'
import App from './App.vue'

//导入路由
import router from '../src/router/index.js'
//引入仓库
import store from '@/store'
//引入模拟数据
import '@/mock/mockServer'
//引入轮播图样式
import 'swiper/css/swiper.css'
//统一接口api 文件夹里面的全部请求函数
import * as API from '@/api'
//引入 elmentui 组件的按钮和弹窗
import {Button,MessageBox} from 'element-ui'

//注册全局组件
//三级联动组件
import TypeNav from '@/pages/Home/TypeNav'

//分页器
import Pagenation from '@/components/Pagenation'

//第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Pagenation.name,Pagenation);
Vue.component(Button.name,Button);

//elemeneui 注册组件的时候还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;




Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  //注册仓库：组件实例身上多了一个 $store 属性
  store,
}).$mount('#app')
