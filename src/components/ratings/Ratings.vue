<template>
  <div class="ratings" ref="ratings">
    <div class="ratingContent">
      <div class="overview">
        <div class="overviewLeft">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overviewRight">
          <div class="scoreWrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="scoreWrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryWrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingSelect
          :onlyContent="onlyContent"
          :selectType="selectType"
          :ratings="ratings"
          @ratingSelectEmit="ratingSelectEmit"
          @toggleContent="toggleContent"
      ></ratingSelect>
      <div class="ratingWrapper">
        <ul>
          <li v-for="(rating,index) in ratings"
              :key="index"
              class="ratingItem"
              v-show="needShow(rating.rateType,rating.text)"
          >
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="starWrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}
                分钟送达</span>
              </div>
              <p class="text" >{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" type="text/less">

  @import "../../common/less/mixin";

  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      display: flex;
      padding: 18px 0;
      .overviewLeft {
        flex: 0 0 137px;
        padding: 6px 0;
        width: 137px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;

        @media only screen and (max-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        }

        .score {
          margin-bottom: 6px;
          line-height: 28px;
          font-size: 24px;
          color: rgb(255, 153, 0);
        }
        .title {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .rank {
          padding-bottom: 6px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overviewRight {
        flex: 1;
        padding: 6px 0 6px 24px;
        @media only screen and (max-width: 320px) {
          padding-left: 6px;
        }
        .scoreWrapper {
          margin-bottom: 8px;
          font-size: 0;
          .title {
            display: inline-block;
            vertical-align: top;
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .star {
            display: inline-block;
            vertical-align: top;
            margin: 0 12px;
          }
          .score {
            display: inline-block;
            vertical-align: top;
            line-height: 18px;
            font-size: 12px;
            color: rgb(255, 153, 0);
          }
        }
        .deliveryWrapper {
          font-size: 0;
          .title {
            vertical-align: top;
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .delivery {
            line-height: 18px;
            font-size: 12px;
            color: rgb(147, 153, 159);
            margin-left: 12px;
          }
        }

      }

    }
    .ratingWrapper {
      padding: 0 18px;
      .ratingItem {
        display: flex;
        padding: 18px 0;
        .border-1px(rgba(7, 17, 27, 0.1));
        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;
          img {
            border-radius: 50%;
          }
        }
        .content {
          flex: 1;
          position: relative;
          .name {
            margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }
          .starWrapper {
            margin-bottom: 6px;
            font-size: 0;
            .star {
              display: inline-block;
              vertical-align: top;
              margin-right: 6px;
            }
            .delivery {
              vertical-align: top;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            margin-bottom: 8px;
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .recommend {
            line-height: 16px;
            font-size: 0;
            .icon-thumb_up, .item {
              display: inline-block;
              margin-right: 8px;
              margin-bottom: 4px;
            }
            .icon-thumb_up {
              font-size: 12px;
              color: rgb(0, 160, 220);
            }
            .item {
              font-size: 9px;
              color: rgb(147, 153, 159);
              padding: 0 6px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              background: #fff;
            }
          }
          .time {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
          }
        }

      }
    }
  }
</style>


<script>
  import axios from 'axios'
  import {formatDate} from '../../common/js/date'
  import star from '../star/star'
  import split from '../split/split'
  import ratingSelect from '../ratingSelect/ratingSelect'
  import BScorll from 'better-scroll'

  import config from '../../config/config'

  const ALL = 2;
  const ERR_OK = 0;

  export default {

    props: {
      seller: {
        type: Object
      }
    }
    ,
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
      }
    },
    created() {

      axios.get(`${config.url}/ratings`).then((res) => {
        if (res.data.errno === ERR_OK) {
          this.ratings = res.data.ratings;
          this.$nextTick(() => {
            console.log('rating='+this.$refs.ratings);
            this.scroll = new BScorll(this.$refs.ratings, {
              click: true
            })
          })
        }
      });
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    methods:{
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      ratingSelectEmit(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      }
    },
    components: {
      star,
      split,
      ratingSelect
    }
  }
</script>
