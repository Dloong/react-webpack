import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
} from "react-router-dom"
import {routerLazyLoad} from "../utils"
import ScrollToTop from "./ScrollToTop";

const Home = routerLazyLoad(()=> import('../pages/homePage'))

const routes: RouteProps[] = [
  {
    path: "/",
    component: Home,
    exact: true,
  }
]

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function RouterView() {
  return (
      <Router>
          <ScrollToTop>
              <Switch>
                  {routes.map((item) => (
                      <Route
                          key={`${ item.path}`}
                          exact={item.exact ?? false}
                          path={item.path}
                          component={item.component}
            />
          ))}
              </Switch>
          </ScrollToTop>
      </Router>
  )
}

export default RouterView
