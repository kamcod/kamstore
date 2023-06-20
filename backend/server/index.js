require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');

const userRoutes = require('./Routes/userRoutes');
const jobsRoutes = require('./Routes/jobsRoutes');
const authentication = require('./middlewares/authentication.');
const errorHandler = require('./middlewares/error_handler');

app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
);

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(bodyParser.json());
app.use(multer().none());


app.use(helmet())
app.use(xss())
app.use(cors({ credentials: true, origin: process.env.FRONTEND_DOMAIN }))
app.use(cookieParser());

app.use('/api', userRoutes);
app.use('/api', authentication, jobsRoutes);
app.use(errorHandler);

const port = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB(process.env.MONGO_URI);
  console.log('connected to database!')
  app.listen(port, () => {
    console.log(`server is listening at port ${port}`)
  });
}


startServer();