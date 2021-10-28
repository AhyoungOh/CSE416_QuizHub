import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/Auth';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import './styles/global-style.scss';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

import { useReducer, createContext } from 'react';
import dotenv from 'dotenv';
dotenv.config();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return {
        id: action.payload.consumerUsername,
        // password: action.payload.password,
      };
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
        <Route exact path='/' component={MainPage} />
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
