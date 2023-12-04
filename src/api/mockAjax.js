//对axios 进行二次封装
import axios from 'axios'

//引入进度条
import nprogress from 'nprogress'
//start 开始 done 结束
//引入进度条样式
import "nprogress/nprogress.css"

//1.利用axios 对象的方法 create 来创建一个 axios 实例
//2.request 就是 axios，只不过配置一下
const requests = axios.create({
    //基础路径：发请求的时候，路径中会出现 api
    baseURL:'/mock',
    //设置请求超时时间为 5s
    timeout:5000,
});
//请求拦截器
requests.interceptors.request.use((config)=>{
    nprogress.start();
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
