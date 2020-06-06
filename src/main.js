// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate from 'vee-validate';
//import VueI18n from "vue-i18n";
import router from './router';
import currencyFilter from './filters/currency';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import FormatTime from "./filters/FormatTime";
//import VueMoment from 'vue-moment';
import './bus';
import VueI18n from 'vue-i18n';
//Vue.use(VueMoment)
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
Vue.use(VueI18n);
axios.defaults.withCredentials = true;
Vue.config.productionTip = false
Vue.filter('currency',currencyFilter);
Vue.filter("FormatTime", FormatTime);
const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', //這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})
new Vue({
  i18n,
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
});


// const i18n = new VueI18n({
//   locale: "zhTW"
// });
// Vue.use(VeeValidate, {
//   i18n,
//   dictionary: {
//     zhTW
//   }
// });
router.beforeEach((to, from, next) => {
 console.log('to',to,'from',from,'next',next);
 if(to.meta.requiresAuth){
  const api =`${process.env.APIPATH}/api/user/check`;
  axios.post(api).then((response) => {  //要利用axios去串接api
  console.log(response.data);
  if(response.data.success){  //26-31行是寫說如果有驗證成功，就進入下個頁面，如果沒有，就回到login頁面
   next();
  }else{
    next({
      path:'/login',
    });
  }
  });
 }else{
  next();
 }

})
