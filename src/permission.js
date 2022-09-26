import router from '@/router'
import store from '@/store'
// 1. 权限拦截处理逻辑需要放在路由的前置守卫里处理
// 2. 首先判断有无token
// 2.1 token 存在 说明 处于登录状态
// 2.1.1 判断是否处于登录页面，是的话 跳首页 否则 直接留在当前页（直接放行 next()）
// 2.2 token 不存在 说明 不处于登录状态
// 2.2.1 判断一下 是否处于白名单 是的话 直接留在 当前页 否则 跳转到登录页
const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面
router.beforeEach(async(to, from, next) => {
  if (store.getters.token) { //  处于登录状态
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    //   如果有token 继续判断是不是去登录页
    if (to.path === '/login') {
      //  表示去的是登录页
      next('/') // 跳到主页
    } else {
      next() // 直接放行
    }
  } else { //  没有登录
    // 如果找到了 表示在在名单里面
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login') // 跳到登录页
    }
  }
})
