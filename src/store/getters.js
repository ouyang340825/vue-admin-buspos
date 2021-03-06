const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  cachedViews: state => state.tagsView.cachedViews,
  visitedViews: state => state.tagsView.visitedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  permission_routes: state => state.permission.routes
}
export default getters
