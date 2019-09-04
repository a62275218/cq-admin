import router from './router'

const generateRoutes = ()=>{
  let indexRoute = router.options.routes.find(item=>{
    return item.path === '/dashboard'
  })
  let routes = indexRoute.children;
  routes = routes.map(item=>({
    name:item.name,
    url:item.path,
    icon:item.icon
  }))
  // routes.unshift({
  //   name:indexRoute.name,
  //   url:indexRoute.path,
  //   icon:indexRoute.icon
  // })
  return routes
}

export default {
  items:generateRoutes()
}
