require('dotenv').config();
import express from 'express';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';

const keys = require('./config/keys');
const webpackConfig = require('../webpack.config');
const routes = require('./routes');

const { database, port } = keys;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Connect to MongoDB
mongoose.set('useCreateIndex', true);
mongoose
  .connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() =>
    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`)
  )
  .catch(err => console.log(err));

require('./config/passport');
app.use(routes);

// if development
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);

  app.use(
    historyApiFallback({
      verbose: false
    })
  );

  // app.use(
  //   webpackMiddleware(compiler, {
  //     publicPath: webpackConfig.output.publicPath,
  //     contentBase: path.resolve(__dirname, '../client/public'),
  //     stats: {
  //       colors: true,
  //       hash: false,
  //       timings: true,
  //       chunks: false,
  //       chunkModules: false,
  //       modules: false
  //     }
  //   })
  // );

  // @ts-ignore
    app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(compression());
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});
