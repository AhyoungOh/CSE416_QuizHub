// const dotenv = require('dotenv');

// dotenv.config();

// const dbConfig = {
//   // host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
// };

const getDBUri = () => {
  return `mongodb+srv://quizhub:cse416quizhubpassword@quizhub-database.h1p15.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  // const localUri = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
  // return localUri;
  // const developUri = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@cluster0.wl57b.mongodb.net/slang_project?retryWrites=true&w=majority`;
  // return developUri;
};

export default { getDBUri };
