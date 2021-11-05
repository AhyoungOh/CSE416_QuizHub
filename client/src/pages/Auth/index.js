import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ConsumerSignUp from '../ConsumerSignUp';
import CreatorSignUp from '../CreatorSignUp';
import SignIn from '../SignIn';

function Auth() {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${url}/signin`}>
        <SignIn />
      </Route>
      <Route path='/signout'>Log out</Route>
      <Route path={`${url}/consumer_signup`}>
        <ConsumerSignUp />
      </Route>
      <Route path={`${url}/creator_signup`}>
        <CreatorSignUp />
      </Route>
    </Switch>
  );
}

export default Auth;
