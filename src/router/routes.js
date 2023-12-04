//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from  '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    {
        path:'/center',
        name:'Center',
        component:Center,
        meta:{
            show:true
        },
        children:[
            {
                path:'myOrder',
                component:MyOrder,
            },
            {
                path:'groupOrder',
                component:GroupOrder,
            },
            //重定向为我的订单
            {
                path:'/center',
                redirect:'/center/myOrder'
            }
        ]
    },
    {
        path:'/paySuccess',
        name:'PaySuccess',
        component:PaySuccess,
        meta:{
            show:true
        }
    },
    {
        path:'/pay',
        name:'Pay',
        component:Pay,
        meta:{
            show:true
        },
        //路由独享守卫
        beforeEnter:(to,from,next)=>{
            if(from.path == '/trade'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path:'/trade',
        name:'Trade',
        component:Trade,
        meta:{
            show:true
        },
        //路由独享守卫
        beforeEnter:(to,from,next)=>{
            if(from.path == '/shopCart'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path:'/detail/:skuid',
        name:'Detail',
        component:Detail,
        meta:{
            show:true
        }
    },
    {
        path:'/shopCart',
        name:'ShopCart',
        component:ShopCart,
        meta:{
            show:true
        }
        },

    {
    path:'/addCartSuccess',
    name:'AddCartSuccess',
    component:AddCartSuccess,
    meta:{
        show:true
    }
    },
    {
    path:'/home',
    name:'Home',
    component:Home,
    meta:{
        show:true
    }
    },
    {
        path:'/search/:keyword?',
        name:'Search',
        component:Search,
        meta:{
            show:true
        }
    },
    {
        path:'/login',
        name:'Login',
        component:Login,
        meta:{
            show:false
        }
    },
    {
        path:'/register',
        name:'Register',
        component:Register,
        meta:{
            show:false
        }
    },
    //重定向为主页
    {
        path:'*',
        redirect:'/home'

    }
]