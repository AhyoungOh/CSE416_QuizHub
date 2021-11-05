import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/Auth';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import CreatorAccountSettings from './components/CreatorAccountSettings';
import './styles/global-style.scss';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

import { useReducer, createContext } from 'react';
import dotenv from 'dotenv';
import ConsumerSignUp from './components/ConsumerSignUp';
dotenv.config();

const userReducer = (state, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case 'signin':
      if (action.payload.consumer) {
        return {
          id: action.payload.consumer.consumerUsername,
          isCreator: false,
          // password: action.payload.password,
        };
      }
      if (action.payload.creator) {
        return {
          username: action.payload.creator.creatorUsername,
          isCreator: true,
          id:action.payload.creator._id,
          // password: action.payload.password,
        };
      }
      break;
    case 'signout':
      return { id: '', password: '' };
    case 'creatoraccountsettings':
        return {
          id: action.payload.creator.creatorUsername,
          isCreator: true,
          email: action.payload.creator.creatorEmail,
          introduction: action.payload.creator.selfIntroduction,
          image: action.payload.creator.creatorImage,
          // password: action.payload.password,
      };
    default:
      throw new Error();
  }
};
export const UserContext = createContext(null);

function App() {
  const [user, dispatch] = useReducer(userReducer, {
    id: '',
    password: '',
  });

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <Router>
        <Header />
        <Route exact path='/' component={ConsumerSignUp} />
        <Switch>
          <Route path='/auth'>
            <AuthPage />
          </Route>
          <Route path='/creatoraccountsettings'>
            <CreatorAccountSettings />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
