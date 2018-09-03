//import httpProxy from 'http-proxy';
import https from 'https';
import http from 'http';
import fs from 'fs';
import url from 'url';

const {DOCKENTICATION_EXTERNAL_PORT, DOCKENTICATION_INTERNAL_PORT, DOCKENTICATION_SSL_KEY, DOCKENTICATION_SSL_CERT} = process.env;

const sslOptions = {
	//key: fs.readFileSync(DOCKENTICATION_SSL_KEY),
	//cert: fs.readFileSync(DOCKENTICATION_SSL_CERT)
};

/*const proxy = httpProxy.createProxyServer({
	//ssl: sslOptions,
	target: `https://google.com`,
	//target: `http://127.0.0.1:${DOCKENTICATION_INTERNAL_PORT}`,
	changeOrigin: true
	//secure: true
	//secure: false
}).listen(DOCKENTICATION_EXTERNAL_PORT);

proxy.on('proxyReq', function (proxyReq, req, res, options) {
	//proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});
proxy.on('error', console.log);
*/

const server = http.createServer().listen(DOCKENTICATION_EXTERNAL_PORT);

server.on('request', function(request, response) {
  console.log('request ' + request.url);
  var options = url.parse('http://github.com');
  options.headers = request.headers;
  options.method = request.method;
  options.agent = false;

  var connector = http.request(options, serverResponse => {
          response.writeHeader(serverResponse.statusCode, serverResponse.headers);
          serverResponse.pipe(response);
          console.log('response', response);
  });
  request.pipe(connector);
});