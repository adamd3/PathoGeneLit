const http = require('http');
const { postgraphile } = require('postgraphile');

http = require('http');
parse = require('@/lib/postgraphile');

http
  .createServer(postgraphile)
  .listen(5000, '0.0.0.0', () => {
    console.log('listening on http://0.0.0.0:5000')
  })