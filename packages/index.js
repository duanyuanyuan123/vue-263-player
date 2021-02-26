// packages / index.js
// 导入单个组件
import Vue263player from './263VueAliplayer';
// 定义 install 方法
Vue263player.install = (Vue, options) =>{
    if(options && options.cssLink) Vue263player.props.cssLink.default = options.cssLink;
    if(options && options.scriptSrc) Vue263player.props.scriptSrc.default = options.scriptSrc;
    Vue.component(Vue263player.name, Vue263player);
};
Vue263player.Player = Vue263player;
export default Vue263player;
