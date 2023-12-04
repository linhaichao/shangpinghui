//1.导入vue 和 vuerouter 的包
import Vue from 'vue'
import VueRouter from 'vue-router'
 
//2.调用vue.use() 函数，把 VueRouter 安装为 Vue 的插件
//vue.use()函数的作用，就是来安装插件的
Vue.use(VueRouter);
 
import routes from './routes';

//引入 store 仓库
import store from '@/store';

//重写push 和 replace
//第一个参数：告诉我们原来的push、replace方法，往哪里去跳转
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
};
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
};


//3.创建路由的实例对象
const router = new VueRouter({
    // mode:'history',
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y : 0 }
    },

});


    //配置路由前置守卫
    router.beforeEach(async(to,from,next)=>{
        //用户登陆了才会有 token ，未登录不一定有token
        let token = store.state.user.token;

        //获取用户名
        let name = store.state.user.userInfo.name;

        //用户登陆了就不能再去登录页面
        if(token){
            if(to.path == '/login' || to.path == '/register'){
                next('/home')
            }else{
                //登陆了但去的不是登录页面
                //有用户名就放行
                if(name){
                    next();
                }else{
                   try {
                     //没有用户信息，就要发请求获取用户信息
                    //登录后获取用户信息
                    await store.dispatch('getUserInfo');
                    next();
                   } catch (error) {
                    //拿不到用户信息， token 过期  了
                    //先清除之前保存在本地的数据和token
                    //跳转到登录页面
                    await store.dispatch('userLogout');
                    next('/login');
                   }
                }
            }
        }else{
            //未登录
            //不能去 交易 和 支付 和 个人中心 相关的页面
            let toPath = to.path;
            if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
                next('/login?redirect=' + toPath)
            }else{
                //不是去以上地方就放行
                next();
            }
            
        }
    })
 
//4.向外共享路由的实例对象
export default router