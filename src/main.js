import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import store from 'store'
import 'element-ui/lib/theme-chalk/index.css'

/**
 * 容器组件
 */
import container from 'components/containers/container'
import toolbar from 'components/containers/toolbar'

/**
 * dom组件
 */
import elbutton from 'components/elements/elbutton'
import datepicker from 'components/elements/datepicker'
import elselect from 'components/elements/elselect'

Vue.component('container', container)
Vue.component('toolbar', toolbar)

Vue.component('elbutton', elbutton)
Vue.component('datepicker', datepicker)
Vue.component('elselect', elselect)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
