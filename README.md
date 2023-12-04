## 路由传参
<!-- 
    在配置路由的时候，在占位的后面加上一个问号，表示 params 参数可传递也可不传递
    params参数传的是空串的时候可以用 undefind 来解决 例如：keyWord:''||undefind
    路由组件能传递props参数，有三种写法：
        1.布尔值写法：只用于params 参数 
            在路由配置对象中添加 props:true,
        2.对象写法：额外的给路由组件传递props
            在路由配置对象中添加 props:{xxx},
        3.函数写法：可以将 params 参数、qurey 参数通过props 传递给路由组件
        props:($route)=>{
            return {keyWord:$route.params.keyWord,k:$route.query.k}
        }
 -->