import { reqCartList, reqDeleteCartById , reqUpdateCheckedById} from "@/api";

const state = {
    cartList:[],
};

const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList;
    }
};

const actions = {
    //获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code == 200){
            commit('GETCARTLIST',result.data);
        }
    },
    //删除购物车某产品
    async deleteCartListBySkuid({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code == 200){
            return 'OK';
        }else{
            return Promise.reject(new Error('false'))
        }
    },
    //修改购物车商品是否选中
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked);
        if(result.code == 200){
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    //删除全部选中的商品
    deleteAllCartList({dispatch,getters}){
        //context 相当于一个小仓库
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuid',item.skuId) : '';
            //将每一次返回的promise 添加到数组当中
            PromiseAll.push(promise)
        });
        //如果有一个失败，返回失败
        return Promise.all(PromiseAll);
    },
    //全选框的勾选状态更新
    updateAllChecked({dispatch,state},isChecked){
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
            //把返回的promise 存到数组
            promiseAll.push(promise);
        })
        return Promise.all(promiseAll);
    }
};

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
}