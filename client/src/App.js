import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/Auth';
import MainPage from './pages/MainPage';
import Header from './components/Header';
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
          id: action.payload.creator.creatorUsername,
          isCreator: true,
          // password: action.payload.password,
        };
      }
      break;
    case 'signout':
      return { id: '', password: '' };
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
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
