import { reqGoodsInfo ,reqAddOrUpdateShopCart, reqUpdateCheckedById} from "@/api";
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodsInfo:{},
    //获取游客uuid
    uuid_token:getUUID(),
};

const mutations = {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo;
    }
};

const actions = {
    //获取产品信息
    async getGoodsInfo({commit},skuid){
        let result = await reqGoodsInfo(skuid);
        if(result.code == 200){
            commit('GETGOODSINFO',result.data);
        }
    },
    //将产品添加到购物车里
    async addOrUpdateShopCart({commit},{skuid,skuNum}){

        let result = await reqAddOrUpdateShopCart(skuid,skuNum);
        //代表服务器加入购物车成功
        if(result.code == 200){
            return '添加成功';
        }else{
            return Promise.reject(new Error('添加失败'));
        }
    },

};

const getters = {
    categoryView(state){
        //计算出来的属性值至少是一个空对象
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
}