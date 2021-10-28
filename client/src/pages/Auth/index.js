import { Route, Switch, useRouteMatch } from 'react-router-dom';
import SignUp from '../SignUp';
import SignIn from '../SignIn';

function Auth() {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${url}/signin`}>
        <SignIn />
      </Route>
      <Route path='/signout'>Log out</Route>
      <Route path={`${url}/signup`}>
        <SignUp />
      </Route>
      <Route path={`${url}/creator_login`}>
        <SignIn />
      </Route>
      <Route path={`${url}/creator_signup`}>
        <SignUp />
      </Route>
    </Switch>
  );
}

export default Auth;
