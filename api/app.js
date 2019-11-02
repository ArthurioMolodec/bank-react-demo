require('module-alias/register');
const CONFIG = require('@config/config');

// Mongoose
require('./db/mongoose');

// Routes
const userRouter = require('@routes/users');
const cardRouter = require('@routes/cards');
const messageRouter = require('@routes/messages');
const transactionRouter = require('@routes/transactions');

// Others
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const chalk = require('chalk');

// Middlewares
const auth = require('@middleware/auth');
const errorHandler = require('@middleware/error-handler');
// const maintenance = require('@middleware/maintenance');

// App
const app = express();

// Maintenance mode
// app.use(maintenance());

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

// CORS
app.use(cors());

// Routes
app.use(userRouter);
app.use(cardRouter);
app.use(messageRouter);
app.use(transactionRouter);

// Handle errors only in development
if (process.env.NODE_ENV === 'development') {
   app.use(errorHandler());
} else {
   app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).send('Server Error');
   });
}

// Start the app
app.listen(CONFIG.port, () => {
   console.log(
      '%s App is running at http://localhost:%d in %s mode',
      chalk.green('✓'),
      process.env.PORT,
      process.env.NODE_ENV
   );
   console.log('  Press CTRL-C to stop\n');
});

module.exports = app;