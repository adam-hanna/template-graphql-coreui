import React, { useContext } from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import { UserContext } from "./contexts/user";
import './scss/style.scss';

// @ts-ignore
function PrivateRoute({ component, authorized, ...rest }) {
  let c =
    authorized() === true ? (
      <Route component={component} {...rest} />
    ) : (
      <Redirect {...rest} to="/login" />
    );

  return c;
}

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
  const user = useContext(UserContext);

  return (
    <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props: any) => <Login {...props}/>} />
            <Route exact path="/register" name="Register Page" render={(props: any) => <Register {...props}/>} />
            <Route exact path="/404" name="Page 404" render={(props: any) => <Page404 {...props}/>} />
            <Route exact path="/500" name="Page 500" render={(props: any) => <Page500 {...props}/>} />
            <PrivateRoute
              authorized={() => {
                return user && user.id;
              }}
              path="/"
              name="Home"
              component={TheLayout}
            />
          </Switch>
        </React.Suspense>
    </HashRouter>
  );
}

export default App;
