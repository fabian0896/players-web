import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {
  Home,
  Players,
  Login,
  Signup,
  NewPlayer,
  EditPlayer,
} from './pages';

import { PrivateRoute } from './components';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/players/edit/:id" component={EditPlayer} />
          <PrivateRoute path="/players/new" component={NewPlayer} />
          <PrivateRoute path="/players" component={Players} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
