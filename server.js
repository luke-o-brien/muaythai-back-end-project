const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

const fighterRouter = require('./controllers/fighters.js')
const testJwtRouter = require('./controllers/test-jwt.js')
const authRouter = require('./controllers/auth.js')



mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


app.use(cors({ origin: process.env.FRONT_END_URL }));
app.use(express.json());
app.use(logger('dev'));

app.use('/fighters', fighterRouter)
app.use('/auth', authRouter)
app.use('/test-jwt', testJwtRouter)

app.listen(PORT, () => {
  console.log('The express app is ready!');
});
