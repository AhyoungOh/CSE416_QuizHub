import express from 'express';
import mongoose from 'mongoose';
var bodyParser = require('body-parser');
// import badgeRouter from './routers/badgeRouter.js';
// import certificateRouter from './routers/certificateRouter.js';
// import consumerRouter from './routers/consumerRouter.js';
// import creatorRouter from './routers/creatorRouter.js';
// import playerRouter from './routers/playerRouter.js';
// import platformRouter from './routers/platformRouter.js';
// import quizRouter from './routers/quizRouter.js';
// import questionRouter from './routers/questionRouter.js';
import cors from 'cors';
import authRouter from './src/routers/auth/index.js';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
// const cookieSession = require('cookie-session');
// authRouter = require('./routers/auth');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  // .connect(
  //   'mongodb+srv://quizhub:cse416quizhubpassword@quizhub-database.h1p15.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  // )
  .connect(process.env.MONGODB_URI)
  .then((res) => console.log('Connected'))
  .catch((err) => console.error(err));

// cookie에 전달되어 오는 정보를 req.session을 통해 사용할 수 있도록 파싱해줌
// app.use(
//   // cors({
//   //   origin: 'https://cse416quizhub.herokuapp.com',
//   //   credentials: true,
//   // })
//   cors()
// );
// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
// app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// front에는 user 정보를 cookie에 담고
// back에는 user 정보를 session에 담아 쓰기 위한 설정
// req.session.userID = userId

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 //and remove cacheing so we get the most recent appointments
  res.setHeader('Cache-Control', 'no-cache');
  next();
 });

app.use(
  cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// app.use('/api/badge', badgeRouter);
// app.use('/api/certificate', certificateRouter);
// app.use('/api/consumer', consumerRouter);
// app.use('/api/creator', creatorRouter);
// app.use('/api/player', playerRouter);
// app.use('/api/platform', platformRouter);
// app.use('/api/quiz', quizRouter);
// app.use('/api/question', questionRouter);

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
