<template>
    <div class="pagination">
        <!-- 开始部分 -->
        <button :disabled="pageNo == 1" @click="$emit('getPageNo',pageNo -1)" >上一页</button>
        <button v-if=" startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" >1</button>
        <button v-if="startNumAndEndNum.start > 2">···</button>
        
        <!-- 中间部分 -->
        <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-show="startNumAndEndNum.start <= page " @click="$emit('getPageNo',page)" :class="{active:pageNo == page}">{{ page }}</button>
        
        <!-- 结尾部分 -->
        <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
        <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" >{{ totalPage }}</button>
        <button :disabled="pageNo == totalPage" @click="$emit('getPageNo',pageNo + 1)">下一页</button>
        
        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
  </template>
  
  <script>
    export default {
      name: "Pagenation",
      props:['pageNo','pageSize','total','continues'],
      computed:{
        //计算总页数
        totalPage(){
            return Math.ceil(this.total / this.pageSize);
        },
        //开始与结束的页数
        startNumAndEndNum(){
            const {pageNo,totalPage,continues} = this;
             let start = 0;
             let end = 0;
            //判断开始与结束 
            if(continues > totalPage){
                start = 1;
                end = totalPage;
            }else{
                //开始数字
                start = pageNo - parseInt(continues / 2);
                //结束数字
                end = pageNo + parseInt(continues / 2);
                //排除不正常的情况
                if(start < 1){
                    start = 1;
                    end = continues;
                };
                if(end > totalPage){
                    end = totalPage;
                    start = totalPage - continues + 1;
                }
            };
            return {start,end}  
        },
      }
    }
  </script>
  
  <style lang="less" scoped>
    .pagination {
        text-align: center;
      button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;
  
        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }
  
        &.active {
          cursor: not-allowed;
          background-color: #409eff;
          color: #fff;
        }
      }
    }
  </style>
  