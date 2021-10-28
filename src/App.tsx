import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {
  Home,
  Players,
  Login,
  Signup,
  NewPlayer,
  EditPlayer,
  PlayerDetails,
  Users
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
          <PrivateRoute path="/players/:id" component={PlayerDetails} />
          <PrivateRoute path="/players" component={Players} />
          <PrivateRoute path="/users" component={Users} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
