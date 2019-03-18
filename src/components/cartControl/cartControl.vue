<template>
  <div class="cartControl">
    <transition name="move">
      <div class="cart-decrease"
           v-show="food.count>0"
           @click.stop.prevent="decreaseFood"
      >
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <transition name="test">
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    </transition>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addFood"></div>

  </div>
</template>
<style lang="less" type="text/less">
  .cartControl {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      transition: all 0.5s linear;
      .inner {
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
        transition: all 0.5s linear;
      }
    }
    .cart-add {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);

    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      text-align: center;
      width: 12px;
      height: 24px;
      line-height: 24px;
      font-size: 10px;
      margin-top: 6px;
      color: rgb(147, 153, 159);
      transition: all 0.5s linear;
    }
  }

  //cartdecrease
  .move-enter-active, .move-leave-active {
    /*transition: all 1s linear;*/
    /*transform:rotate(0);*/
  }

  .move-enter, .move-leave-to {
    transform: translate3D(24px, 0, 0);
    opacity: 0;
  }

  .move-enter .inner, .move-leave-to .inner {
    transform: rotate(180deg);
  }

  //count
  .test-enter-active, .test-leave-active {
    /*transition: all 1s linear;*/
  }

  .test-enter, .test-leave-to {
    transform: translate3D(12px, 0, 0);
    opacity: 0;
  }


</style>
<script>
  //  import Vue from  'vue'
  //  let eventHub = new Vue();

  export default{
    props: {
      food: {
        type: Object
      }
    },
    created(){
    },
    methods: {
      addFood(event){
//        console.log(this);
        if (!this.food.count) {
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('cart-add', event.target)
      },
      decreaseFood(){
        if (this.food.count) {
          this.food.count--
        }
      }
    },
    components: {},
  }
</script>
