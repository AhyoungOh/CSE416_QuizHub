const cors = require("cors");

const whitelist = ["https://cse416-quizhub.netlify.app/", "http://localhost:3000"];

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production" ? whitelist : "http://localhost:3000",
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  methods: ["GET", "PUT", "POST", "OPTIONS", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// module.exports = cors(corsOptions);
export default cors(corsOptions);