import Vue from 'vue';
import App from './App.vue';
import Vue263player from '../packages';
Vue.use(Vue263player,{
    // cssLink: 'https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css',
    // scriptSrc: 'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js'
});
Vue.config.productionTip = false;
new Vue({
    render: h => h(App),
}).$mount('#app');
12