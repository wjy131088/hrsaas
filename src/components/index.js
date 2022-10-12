// import PageTools from '@/components/PageTools'
// const components = [PageTools]
// export default {
//   install: function(Vue) {
//     components.forEach(ele => {
//       Vue.component(ele.name, ele)
//     })
//   }
// }
// export default (Vue) => {
//   components.forEach(ele => {
//     Vue.component(ele.name, ele)
//   })
// }
import * as filters from '@/filters' // 引入工具类
const fn = require.context('./', true, /\.vue$/)
// console.log(fn.keys()) // 路径
// console.log(fn('./PageTools/index.vue')) // 根据路径查找模块
const components = fn.keys().map(ele => {
  return fn(ele)
})
export default (Vue) => {
  components.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
  Object.keys(filters).forEach(key => {
    // 注册过滤器
    Vue.filter(key, filters[key])
  })
}
