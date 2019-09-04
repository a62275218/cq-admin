// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

// todo
// cssVars()

Vue.use(BootstrapVue)
Vue.use(ElementUI)
router.beforeEach(function(to,from,next){
  if(to.meta && to.meta.auth){
    console.log('需登陆')
    let login = window.sessionStorage.getItem('login');
    if(!login){
        router.push("/login");
    }else{
      next()
    }
  }else{
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
