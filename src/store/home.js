import { reqCategoryList, reqGetBannerList,reqGetFloorList} from "@/api";

//state: 仓库存放数据的地方
const state = {
    //设置初始值
    categoryList: [],
    bannerList:[],
    floorList:[],
};
//mutations: 修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    //主页轮播图
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    //底部轮播图
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
//action :处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code == 200){
            commit('CATEGORYLIST',result.data);
        }
    },
    //主页轮播图
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code == 200){
            commit('GETBANNERLIST',result.data);
        }
    },
    //底部轮播图
    async getFloorList({commit}){
        let result = await reqGetFloorList();
        if(result.code == 200){
            commit('GETFLOORLIST',result.data);
        }
    }
};
//getter:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters,
}