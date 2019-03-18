<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item , index) in goods" class="menu-item" :class="{'current':currentIndex === index}"
              @click="selectMenu(index,$event)" :key="index">
        <span class="text border-1px">
              <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span> {{item.name}}
        </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list  food-list-hook" v-for="(item,index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item border-1px"
                  v-for="(food,index) in item.foods"
                  @click="selectFood(food,$event)"
                  :key="index"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old"
                                                                  v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartControl-wrapper">
                    <!--@cart-add 事件由子组件 点击 时发分-->
                    <cartControl @cart-add='drop' :food="food"></cartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :deliveryPrice="seller.deliveryPrice"
                :selectFoods="selectFoods" ref="shopcart">
      </shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>
<style lang="less" type="text/less">
  @import "../../common/less/mixin";

  div.goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    div.menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      li.menu-item {
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        &.current {
          background: #fff;
          .text {
            font-weight: 700;
            .border-none();
          }
        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          font-size: 12px;
          line-height: 14px;
          .border-1px(rgba(7, 17, 27, 0.1));
          /*line-height:12px;*/
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: top;
            &.decrease {
              .bg-image('decrease_3')
            }
            &.discount {
              .bg-image('discount_3')
            }
            &.guarantee {
              .bg-image('guarantee_3')
            }
            &.invoice {
              .bg-image('invoice_3')
            }
            &.special {
              .bg-image('special_3')
            }
          }
        }
      }
    }
    div.foods-wrapper {
      flex: 1;
      h1.title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      li.food-item {
        /*margin:18px;*/
        display: flex;
        padding: 18px;
        .border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          .border-none()
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          h2.name {
            margin: 2px 0 8px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .desc,
          .extra {
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .desc {
            line-height: 12px;
            margin-bottom: 8px;
          }
          .extra {
            .count {
              margin-right: 12px;
            }
          }
          .price {
            font-weight: 700;
            line-height: 24px;
            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .cartControl-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }

      }
    }
  }
</style>
<script>
  import axios from 'axios'
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue'
  import cartControl from '../cartControl/cartControl.vue'
  import food from '../food/food.vue'
  import config from '../../config/config'

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      shopcart,
      cartControl,
      food
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },

    created() {
      axios.get(`${config.url}/goods`).then((res) => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.goods;
          //调用方法使窗口能滚动
          this.$nextTick(() => {
            this.initScroll();
            this.calculateHeight();
          });
        }
      });


      // fetch('/api/goods').then((res) => {
      //   if (res.data.errno === ERR_OK) {
      //     this.goods = res.data.goods;

      //     //调用方法使窗口能滚动
      //     this.$nextTick(() => {
      //       this.initScroll();
      //       this.calculateHeight();
      //     });
      //   }
      // });


      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'special']

    },

    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];

          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        });
        return foods
      }
    },
    methods: {
      selectMenu(index, event) {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      },
      initScroll() {
        let menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })

      },
      calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height); //要先放个一0进数组，要不然在currentIndex()方法里第一次就会拿到整个的高度。
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      drop(target) {
        //体验优化异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      },
      selectFood(food, event){
        if (!event._constructed) {
          return
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },

  }
</script>
