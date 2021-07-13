import Toast from "./toast"

const obj = {};

obj.install = function(Vue){
    // 1. 创建组件构造器
    let toast_constructor = Vue.extend(Toast);
    // 2. new 的方式， 跟进组件构造器，可以创建出来一个组件对象
    let toast = new toast_constructor();
    // 3. 将组件对象手动挂载到某一个元素上
    toast.$mount(document.createElement('div'));
    // 4. toast.$el 对应元素就是 div
    document.body.appendChild(toast.$el);
    // 5. 将 toast 组件对象添加到 Vue 原型对象上，其属性为 $toast
    Vue.prototype.$toast = toast;
}

export default obj;