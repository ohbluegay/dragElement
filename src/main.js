import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import store from 'store'
import vueECharts from 'vue-echarts/components/ECharts'
import 'element-ui/lib/theme-chalk/index.css'
import 'echarts'

/**
 * 容器组件
 */
import container from 'components/containers/container'
import toolbar from 'components/containers/toolbar'
import sheetcontrol from 'components/containers/sheetcontrol'

/**
 * dom组件
 */
import elbutton from 'components/elements/elbutton'
import datepicker from 'components/elements/datepicker'
import elselect from 'components/elements/elselect'
import chart from 'components/elements/chart'

Vue.component('container', container)
Vue.component('toolbar', toolbar)
Vue.component('sheetcontrol', sheetcontrol)

Vue.component('elbutton', elbutton)
Vue.component('datepicker', datepicker)
Vue.component('elselect', elselect)
Vue.component('chart', chart)

Vue.component('vuechart', vueECharts)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
