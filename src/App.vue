<template>
  <div>
    <customerHeader :seller="seller1"></customerHeader>
    <nav class="border-1px">
      <router-link class="nav_item" to="/goods" :seller="seller1">商品</router-link>
      <router-link class="nav_item" to="/ratings">评论</router-link>
      <router-link class="nav_item" to="/seller">商家</router-link>
    </nav>
    <keep-alive>
      <router-view :seller="seller1"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import customerHeader from './components/header/CustomerHeader';
  import axios from 'axios'
  import {urlParse} from './common/js/utils'
  import config from './config/config'

  export default {
    data() {
      return {
        seller1: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      }
    },

    created() {
      axios.get(`${config.url}/seller?id=` + this.seller1.id).then((res) => {
//        this.seller1 = res.data.seller;
        this.seller1 = Object.assign({},this.seller1,res.data.seller);
//        console.log(this.seller1.id);
      })


    },

    components: {customerHeader}
  }
</script>


<style lang="less" type="text/less">

  @import "common/less/index";

  nav {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    /*border-bottom: 1px solid rgba(7, 17, 27, 0.1);*/
    .border-1px(rgba(7, 17, 27, 0.1));
    /*margin-bottom: 10px;*/
  }

  nav .nav_item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }

  nav .active {
    color: rgb(240, 20, 20);

  }
</style>
