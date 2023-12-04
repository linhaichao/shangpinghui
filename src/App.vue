<template>
  <div>
    <HeaderIndex></HeaderIndex>
    <router-view></router-view>
    <!-- 再登录与注册时隐藏Footer -->
    <FooterIndex v-show="$route.meta.show"></FooterIndex>
  </div>
</template>

<script>
import HeaderIndex from '@/components/HeaderBar'
import FooterIndex from '@/components/FooterBar'
export default {
  name:'App',
  components:{HeaderIndex,FooterIndex},
  mounted(){
    //派发一个 action ，获取三级联动标签的数据
    this.$store.dispatch('categoryList');
  },
}
</script>

<style>

</style>