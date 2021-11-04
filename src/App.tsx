import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {
  Home,
  Players,
  Login,
  Signup,
  NewPlayer,
  EditPlayer,
  PlayerDetails,
  Users,
  StartResetPassword,
  ResetPassword,
} from './pages';

import { PrivateRoute } from './components';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <PrivateRoute title="Inicio" path="/" exact component={Home} />
          <PrivateRoute title="Editar Jugador" path="/players/edit/:id" component={EditPlayer} />
          <PrivateRoute title="Crear Jugador" path="/players/new" component={NewPlayer} />
          <PrivateRoute title="Detalles de Jugador" path="/players/:id" component={PlayerDetails} />
          <PrivateRoute title="Jugadores" path="/players" component={Players} />
          <PrivateRoute title="Usuarios" path="/users" component={Users} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/start-reset" component={StartResetPassword} />
          <Route path="/reset" component={ResetPassword} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
