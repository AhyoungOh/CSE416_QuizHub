import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/Auth';
import CreatorFunctionPage from './pages/CreatorFunction';
import Header from './components/Header';
import UserAppBar from './components/UserAppBar';
import './styles/global-style.scss';
// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
// import 'bootstrap/dist/css/bootstrap.css';
import { useReducer, createContext } from 'react';
import dotenv from 'dotenv';
import ConsumerSignUp from './components/Form/ConsumerSignUp';
import ConsumerPage from './pages/ConsumerPage/ConsumerPage';
import CreatorPage from './pages/CreatorPage';
import ConsumerQuizPreview from './pages/ConsumerQuizPreview';
import ConsumerQuizPage from './pages/ConsumerQuizPage';
import ConsumerHomePage from './pages/ConsumerHomePage/ConsumerHomePage';
import CreatorAccountSettings from './pages/CreatorAccountSettings';
import CreatorQuiz from './pages/CreatorQuiz';
import CreatorQuestion from './pages/CreatorQuestion';
import CreateCertificate from './pages/CreateCertificate';
import ResultsPage from './pages/ResultPage';

dotenv.config();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      if (action.payload.consumer) {
        return {
          username: action.payload.consumer.consumerUsername,
          id: action.payload.consumer._id,
          isCreator: false,
          img: action.payload.consumer.consumerImage,
          email: action.payload.consumer.consumerEmail,
          description: action.payload.consumer.consumerDescription,
          isPrivate: action.payload.consumer.isPrivate,
          // password: action.payload.password,
        };
      }
      if (action.payload.creator) {
        return {
          username: action.payload.creator.creatorUsername,
          id: action.payload.creator._id,
          isCreator: true,
          img: action.payload.creator.creatorImage,
          email: action.payload.creator.creatorEmail,
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
        {/* <Header /> */}
        <UserAppBar />
        <Route exact path='/' component={ConsumerSignUp} />
        <Switch>
          <Route path='/auth'>
            <AuthPage />
          </Route>
          <Route path='/creatorHome'>
            <CreatorFunctionPage />
          </Route>
          <Route path='/quiz'>
            <CreatorQuiz />
          </Route>
          <Route path='/question'>
            <CreatorQuestion />
          </Route>
          <Route path='/consumerHome'>
            <ConsumerHomePage />
          </Route>
          <Route path='/consumer-page'>
            <ConsumerPage />
          </Route>
          {/* <Route path='/creatoraccountsettings'>
            <CreatorAccountSettings />
          </Route> */}
          <Route path='/creator-page'>
            <CreatorPage />
          </Route>
          <Route path='/consumerquizpreview/:id'>
            <ConsumerQuizPreview />
          </Route>
          <Route path='/consumerquizpage/:id'>
            <ConsumerQuizPage />
          </Route>
          <Route path='/createcertificate/:token/:groupid/:platformId'>
            <CreateCertificate />
          </Route>
          <Route path='/result/:id'>
            < ResultsPage/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
