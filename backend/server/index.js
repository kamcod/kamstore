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
app.use(cors({ credentials: true, origin: process.env.frontend_domain }))
app.use(cookieParser());

app.use('/api', userRoutes);

const port = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB(process.env.MONGO_URI);
  console.log('connected to database!')
  app.listen(port, () => {
    console.log(`server is listening at port ${port}`)
  });
}


startServer();