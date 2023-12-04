//当前这个模块是对 API 进行统一管理
import requests from "./request";
import mockAjaxs from "./mockAjax"

//三级联动标签
export const reqCategoryList = ()=> requests({url:'/product/getBaseCategoryList',method:'get'});
//主页轮播图
export const reqGetBannerList = ()=> mockAjaxs({url:'/banner',method:'get'});
//底部轮播图
export const reqGetFloorList = ()=> mockAjaxs({url:'/floor',method:'get'})
//搜索模块请求数据
export const reqGetSearchInfo = (params)=> requests({url:'/list',method:'post',data:params})
//获取商品详情
export const reqGoodsInfo = (skuid) => requests({url:`/item/${skuid}`,method:'get'})
//添加商品到购物车
export const reqAddOrUpdateShopCart = (skuid,skuNum) => requests({url:`/cart/addToCart/${skuid}/${skuNum}`,method:'post'})
//获取购物车列表数据的接口
export const reqCartList = () => requests({url:'/cart/cartList',method:'get'})
//删除购物车数据的接口
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
//修改商品选中状态接口
export const reqUpdateCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
//注册获取验证码
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
//注册接口
export const reqUserRegister = (data) => requests({url:'/user/passport/register',data,method:'post'})
//登录接口
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'})
//获取用户信息
//需要带着 token 向服务器要数据
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})
//退出登录
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'})
//获取用户地址信息
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
//获取订单交易叶信息
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'})
//提交订单
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
//获取支付信息
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
//获取支付订单的状态
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
//获取个人中心的数据
export const reqMyOrderList = (page,limit)=> requests({url:`/order/auth/${page}/${limit}`,method:'get'})