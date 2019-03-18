import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../components/goods/GoodsList.vue'
import Seller from '../components/seller/Seller.vue'
import Ratings from '../components/ratings/Ratings.vue'

Vue.use(Router);

export default new Router({
  // mode: 'history',//可选：history url地址不带#号。
  routes: [
    {
      path: '/',
      name: 'test',
      redirect: '/goods',
    },
    {
      path: '/goods',
      name: 'goods',
      component: GoodsList,
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller,
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings,
    },
  ],
  linkActiveClass:'active'
})
