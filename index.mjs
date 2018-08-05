import httpProxy from 'http-proxy';
//import https from 'https';
import https from 'http';
import fs from 'fs';

const {DOCKENTICATION_EXTERNAL_PORT, DOCKENTICATION_INTERNAL_PORT, DOCKENTICATION_SSL_KEY, DOCKENTICATION_SSL_CERT} = process.env;

const sslOptions = {
	key: fs.readFileSync(DOCKENTICATION_SSL_KEY),
	cert: fs.readFileSync(DOCKENTICATION_SSL_CERT)
};

const proxy = httpProxy.createProxyServer({
	ssl: sslOptions,
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


//const server = https.createServer(sslOptions, (req, res) => {
	//proxy.web(req, res, { target: `http://127.0.0.1:${DOCKENTICATION_INTERNAL_PORT}` });
	//proxy.web(req, res, { target: `http://google.com` });
//});

//server.listen(DOCKENTICATION_EXTERNAL_PORT);