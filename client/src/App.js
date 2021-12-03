import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useReducer, createContext } from 'react';
import dotenv from 'dotenv';
import './styles/global-style.scss';
// import pages
import AuthPage from './pages/Auth';
import CreatorFunctionPage from './pages/CreatorFunction';
import ConsumerPage from './pages/ConsumerPage/ConsumerPage';
import CreatorPage from './pages/CreatorPage';
import ConsumerQuizPreview from './pages/ConsumerQuizPreview';
import ConsumerPlatformPreview from './pages/ConsumerPlatformPreview';
import ConsumerQuizPage from './pages/ConsumerQuizPage';
import ConsumerHomePage from './pages/ConsumerHomePage/ConsumerHomePage';
import CreatorQuiz from './pages/CreatorQuiz';
import CreatorQuestion from './pages/CreatorQuestion';
import CreateCertificate from './pages/CreateCertificate';
import CreateBadge from './pages/CreateBadge';
import ResultsPage from './pages/ResultPage';
// import components
import UserAppBar from './components/UserAppBar';
import ConsumerSignUp from './components/Form/ConsumerSignUp';
import LeaderboardPage from './pages/LeaderboardPage';
// mui theme setup
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#69aeff',
      main: '#007fff',
      dark: '#0054cb',
      contrastText: '#fff',
      // contrastText: '#000',
    },
    secondary: {
      light: '#fff3b0',
      main: '#ffc080',
      dark: '#c99052',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
    ].join(','),
    button: {
      fontFamily: ['Open Sans', 'Roboto', 'Arial'].join(','),
      textTransform: 'none',
      fontWeight: '700',
      letterSpacing: '0.03em',
      fontStyle: 'normal',
    },
  },
  // MuiButton: {
  //   selected: {
  //     backgroundColor: '#007fff',
  //     color: '#FFFFFF',
  //   },
  // },
});

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
          isPrivate: action.payload.consumer.consumerIsPrivate,
          consumerQuizHistoryList:
            action.payload.consumer.consumerQuizHistoryList,

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
    case 'edit':
      return {
        ...state,
        email: action.payload.consumer.email,
        description: action.payload.consumer.description,
        isPrivate: action.payload.consumer.isPrivate,
        img: action.payload.consumer.consumerImg,
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
    <ThemeProvider theme={theme}>
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
            <Route path='/creator-page'>
              <CreatorPage />
            </Route>
            <Route path='/consumerquizpreview/:id'>
              <ConsumerQuizPreview />
            </Route>
            <Route path='/consumerplatformpreview/:id'>
              <ConsumerPlatformPreview />
            </Route>
            <Route path='/consumerquizpage/:id'>
              <ConsumerQuizPage />
            </Route>
            <Route path='/createcertificate/:token/:groupid/:quizid/:rewardtype'>
              <CreateCertificate />
            </Route>
            <Route path='/createbadge/:token/:groupid/:quizid'>
              <CreateBadge />
            </Route>
            <Route path='/result/:id'>
              <ResultsPage />
            </Route>
            <Route path='/leaderboard/:quizId'>
              <LeaderboardPage />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
