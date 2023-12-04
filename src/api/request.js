//对axios 进行二次封装
import axios from 'axios'

//引入进度条
import nprogress from 'nprogress'
//start 开始 done 结束
//引入进度条样式
import "nprogress/nprogress.css"

//在当前模块引入 store 
import store from '@/store'

//1.利用axios 对象的方法 create 来创建一个 axios 实例
//2.request 就是 axios，只不过配置一下
const requests = axios.create({
    //基础路径：发请求的时候，路径中会出现 api
    baseURL:'/api',
    //设置请求超时时间为 5s
    timeout:5000,
});
//请求拦截器
requests.interceptors.request.use((config)=>{
    nprogress.start();

    //在请求拦截器里将 游客 的ID 传送给服务器拿到购物车数据
    if(store.state.detail.uuid_token){
        //在请求头添加一个字段，与后台商量好的，不能乱写
        config.headers.userTempId = store.state.detail.uuid_token;
    };

    //判断是否有 token 
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }


    return config;
});
//响应拦截器
requests.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done();
    return res.data;
},(err)=>{

    return Promise.reject(new Error('false'));
});

//暴露
export default requests;
