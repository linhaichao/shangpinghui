import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout} from "@/api";
import {setToken, getToken, removeToken} from '@/utils/token'
const state = {
    code:'',
    token:getToken(),
    userInfo:{},
};

const mutations = {
    //获取验证码
    GETCODE(state,code){
        state.code = code;
    },
    //登录获取 token
    USERLOGIN(state,token){
        state.token = token;
    },
    //获取用户信息
    USERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    //清除数据
    LOGOUT(state){
        state.token = '';
        state.userInfo = {};
        removeToken();
    }
};

const actions = {
    //获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone);
        if(result.code == 200){
            commit('GETCODE',result.data);
            return 'OK'
        }else{
            return Promise.reject(new error('fail'))
        }
    },
    //注册接口
    async getUserRegister({commit},user){
        let result = await reqUserRegister(user);
        if(result.code == 200){
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //登录接口
    async getUserLogin({commit},data){
        let result = await reqUserLogin(data);
        //服务器下发 token ，用户的唯一标识符
        //将来经常通过带 token 找服务器要用户信息来进行展示
        if(result.code == 200){
            commit('USERLOGIN',result.data.token);
            //存储token
            setToken(result.data.token);
            return 'OK';
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        if(result.code == 200){
            commit('USERINFO',result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code == 200){
            commit('LOGOUT');
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
};
 
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}