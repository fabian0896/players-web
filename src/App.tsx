import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import {
  Home,
  Players,
  Login,
  Signup,
} from './pages';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/players" component={Players} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
