<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removeCategoryName">x</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removekeyword">x</i></li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">x</i></li>
            <!-- 售卖属性面包屑 -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{ attrValue.split(':')[1] }}<i @click="removeAttr(index)">x</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li  :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-paixu' : isDesc,'icon-xiangshang':isAsc}"></span></a>
                </li>
                <li  :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-paixu' : isDesc,'icon-xiangshang':isAsc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"><img :src="goods.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ &nbsp;</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ goods.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagenation :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters , mapState} from 'vuex';
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',
    data(){
      return{
        searchParams:{
          category1Id: "",
          category2Id: "",
          category3Id: "",
          //分类名字
          categoryName: "",
          //关键字
          keyword: "",
          //排序
          order: "1:desc",
          //当前是第几页 
          pageNo: 1,
          //一页展示多少数据
          pageSize: 5,
          //平台售卖属性带的参数
          props: [],
          //品牌
          trademark: "",
        }
      }
    },
    components: {
      SearchSelector
    },
    //挂载前
    beforeMount(){
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    //挂载完成
    mounted(){
      this.getData();
    },
    computed:{
      //mapGetters里面的方法：传递的数组，因为getters 计算是没有分模块的
      ...mapGetters(['goodsList']),
      ...mapState({
        total:state => state.search.searchList.total,
      }),
      //order是否含有 1
      isOne(){
        return this.searchParams.order.indexOf('1') != -1;
      },
      //order是否有 2
      isTwo(){
        return this.searchParams.order.indexOf('2') != -1;
      },
      //是否升序/降序
      isAsc(){
        return this.searchParams.order.indexOf('asc') != -1;
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc') != -1;
      }
    },
    methods:{
      //向服务器发请求来获取search 数据（参数不同展示数据不同）
      //把这次请求封装为一个函数，需要的时候调用就行
      getData(){
        this.$store.dispatch('getSearchList',this.searchParams)
      },
      removeCategoryName(){
        this.searchParams.category1Id=undefined;
        this.searchParams.category2Id=undefined;
        this.searchParams.category3Id=undefined;
        this.searchParams.categoryName =undefined;
        this.getData();
        //本意是删除query 参数，params 参数不应该被删除
        if(this.$route.params){
          this.$router.push({name:'Search',params:this.$route.params})
        }
      },
      //删除关键字
      removekeyword(){
        this.searchParams.keyword = undefined;
        this.getData();
        //通知header组件将搜索框置空
        this.$bus.$emit('clear');
        //清除params参数
        if(this.$route.query){
          this.$router.push({name:'Search',query:this.$route.query})
        }
      },
      //删除品牌属性
      removeTrademark(){
        this.searchParams.trademark = '';
        this.getData();
      },
      //自定义事件回调
      trademarkInfo(trademark){
        //整理参数
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
        //再次发送请求
        this.getData();
      },
      //售卖属性
      attrInfo(attr,attrValue){
        let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
        //数组去重
        if(this.searchParams.props.indexOf(props) == -1){
          this.searchParams.props.push(props);
        }
        this.getData();
      },
      //删除售卖属性
      removeAttr(index){
        this.searchParams.props.splice(index,1)
        this.getData();
      },
      //排序操作
      changeOrder(flag){
        //flag只是一个标志
        //获取原来的order值
        let originFlag = this.searchParams.order.split(':')[0];
        let originSort = this.searchParams.order.split(':')[1];
        let newOrder = '';
        if(flag == originFlag){
          newOrder = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc' }`
        }else{
          newOrder = `${flag}:'desc'`
        }
        //修改数据，发送请求
        this.searchParams.order = newOrder;
        this.getData();
      },
      //自定义事件获取当前所在页数
      getPageNo(pageNo){
        //修改数据
        this.searchParams.pageNo = pageNo;
        this.getData();
      }
    },
    watch:{
      $route(newValue,oldValue){
        //整理数据
        Object.assign(this.searchParams,this.$route.query,this.$route.params);
        //再次发送请求
        this.getData();
        //每一次请求之后应该将一些值变为空
        this.searchParams.category1Id=undefined;
        this.searchParams.category2Id=undefined;
        this.searchParams.category3Id=undefined;
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>