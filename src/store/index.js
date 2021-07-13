import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /*
     * 1. goods是一个对象，每一个属性是店铺的userId,同一家店铺商品放在一起
     * 2. 每一个属性值为数组，包含对应店铺的多件商品
     * 3. GoodsInfoList是数组，是每件商品对象组成的数组，不包括userId
     */
    goods: {},
    GoodsInfoList:[]
  },
  mutations: {
    vuex_mutations_addGoods(state, payload){
      let arr = [];
      // 如果该店铺userId已经在goods对象中，则直接将该商品保存在对应userId的数组中
      if(payload.userId in state.goods){
        state.goods[payload.userId].push(payload.goods);
      }
      // 如果该店铺userId不在goods对象中，则创建一个新的userId属性并将商品信息保存
      else{
        // push 函数是有返回值的，切记！！！
        // 故下面这种写法返回值永远为 1 ，错误！！！
        // state.goods[payload.userId] = arr.push(payload.goods);
        arr.push(payload.goods);
        state.goods[payload.userId] = arr;
      }
      state.GoodsInfoList.push(payload.goods);
    },
    changeChecked(state, payload){
      for(let value of state.GoodsInfoList){
        if(value.randomNum == payload.randomNum){
          if(payload.num !== undefined){
            value.num = payload.num;
          }else{
            value.checked = payload.checked;
          }
        }
        if(payload.allChecked !== undefined){
          value.checked = payload.allChecked;
        }
      }
    }
  },
  actions: {
  },
  getters: {
  },
  modules: {
  }
})
