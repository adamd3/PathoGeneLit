const http = require('http');
const { postgraphile } = require('postgraphile');
const dotenv = require('dotenv');

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

const server = http.createServer(
  postgraphile(DATABASE_URL, 'app_public_v2', {
    graphiql: true,
    enhanceGraphiql: true,
    watchPg: process.env.NODE_ENV !== 'production',
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    enableCors: true,
    showErrorStack: process.env.NODE_ENV === 'production' ? false : true,
    extendedErrors:
      process.env.NODE_ENV === 'production'
        ? []
        : ['hint', 'detail', 'errcode'],
  })
);

server.listen(5000, '127.0.0.1', () => {
  console.log('listening on http://127.0.0.1:5000');
});
