import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {
  Home,
  Players,
  Login,
  Signup,
} from './pages';

import { Layout, PrivateRoute } from './components';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact>
            <Layout>
              <Home />
            </Layout>
          </PrivateRoute>
          <PrivateRoute path="/players">
            <Layout>
              <Players />
            </Layout>
          </PrivateRoute>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
