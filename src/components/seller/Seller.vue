<template>
  <div class="seller" ref="seller">
    <div class="sellerContent">
      <div class="overView">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score" class="star"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span><span>元</span>
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span><span>元</span>
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span><span>分钟</span>
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span
              class="icon-favorite"
              :class="{'active':favorite}"
          ></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h2 class="title">公告与活动</h2>
        <div class="contentWrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li v-for="(item,index) in seller.supports" class="supportsItem" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="picWrapper" ref="picWrapper">
          <ul class="picList" ref="picList">
            <li class="picItem" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="infoItem" v-for="(info,index) in seller.infos" :key="index">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" type="text/less">

  @import "../../common/less/mixin";

  .seller {
    position: absolute;
    top: 174px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .overView {
      padding: 18px;
      position: relative;
      .title {
        margin-bottom: 8px;
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }
      .desc {
        padding-bottom: 18px;
        font-size: 0;
        .border-1px(rgba(7, 17, 27, 0.1));
        .star {
          display: inline-block;

          margin-right: 8px;
          vertical-align: top;
        }
        .text {
          display: inline-block;
          line-height: 18px;
          margin-right: 12px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border: none;
          }
          h2 {
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .content {
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress {
              font-size: 24px;
            }
          }
        }

      }
      .favorite {
        position: absolute;
        width: 50px;
        right: 11px;
        top: 18px;
        text-align: center;
        .icon-favorite {
          display: block;
          margin-bottom: 4px;
          color: #d4d6d9;
          line-height: 24px;
          font-size: 24px;
          &.active {
            color: rgb(240, 20, 20);
          }
        }
        .text {
          line-height: 10px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0 18px;
      .title {
        margin-bottom: 8px;
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }
      .contentWrapper {
        padding: 0 12px 16px;
        .border-1px(rgba(7, 17, 27, 0.1));
        .content {
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20);
        }
      }
      .supports {
        /*padding: 12px 18px;*/
        .supportsItem {
          padding: 16px 12px;
          font-size: 0;
          .border-1px(rgba(7, 17, 27, 0.1));
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            vertical-align: top;
            &.decrease {
              .bg-image('decrease_4')
            }
            &.discount {
              .bg-image('discount_4')
            }
            &.guarantee {
              .bg-image('guarantee_4')
            }
            &.invoice {
              .bg-image('invoice_4')
            }
            &.special {
              .bg-image('special_4')
            }
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          &:last-child {
            border: none;
          }
        }
      }
    }
    .pics {
      padding: 18px;
      .title {
        margin-bottom: 12px;
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }
      .picWrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .picList {
          font-size: 0;
          .picItem {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
    .info {
      padding: 18px 18px 0 18px;
      color: rgb(7, 17, 27);
      .title {
        padding: 12px;
        font-size: 14px;
        line-height: 14px;
        .border-1px(rgba(7, 17, 27, 0.1))
      }
      .infoItem {
        padding: 16px 12px;
        line-height: 16px;
        font-size: 12px;
        .border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          .border-1px(rgba(7, 17, 27, 0))
        }
      }
    }
  }
</style>
<script>
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  import BScroll from 'better-scroll'
  import {saveToLocal,loadFromLocal} from '../../common/js/store'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (()=>{
          return loadFromLocal(this.seller.id,'favorite',false)
        })()
      }
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'special'];
    },
    mounted() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      }
      //左右移动
      if (this.seller.pics) {
        //设置 ul.picList的宽度。使可以左右移动
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + 'px';

        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'//x轴滚动时忽略Y轴的滚动，
            })
          }
        })
      }
    },

    methods: {
      toggleFavorite() {
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id , 'favorite',this.favorite)
      }
    },

    components: {
      star,
      split
    }
  }
</script>
