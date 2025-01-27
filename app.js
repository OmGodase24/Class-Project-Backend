const express = require('express');
const morgan = require('morgan');
const userRouter = require('./Routes/userRoutes');
const adminClassRouter = require('./Routes/adminClassRoutes');
const userClassRouter = require('./Routes/userClassRoutes');
const registerClassRoutes = require('./Routes/registerClassRoutes');
const cors = require('cors')

const app = express();


// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/v1.0/Programmers', userRouter);
app.use('/api/v1.0/Programmers', userClassRouter);
app.use('/api/v1.0/Programmers/admin',adminClassRouter);
app.use('/api/v1.0/register-class', registerClassRoutes);


module.exports = app;
