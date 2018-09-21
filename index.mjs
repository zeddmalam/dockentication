import http from 'http';
import url from 'url';
import superagent from 'superagent';


const {
	DOCKENTICATION_PORT, 
	DOCKENTICATION_NEXT_HOST, 
	DOCKENTICATION_NEXT_PORT, 
	API_OAUTH_AUTHORIZE
} = process.env;

const server = http.createServer().listen(DOCKENTICATION_PORT);

function authorize(request) {
	return superagent
	.get(API_OAUTH_AUTHORIZE)
	.set('Authorization', request.headers.authorization)
};

server.on('request', function(request, response) {
	console.log('dockentication start');
	authorize(request)
	.then(authResult => {
		console.info('dockentication authResult', authResult.satusCode);
		const options = url.parse(`${DOCKENTICATION_NEXT_HOST}:${DOCKENTICATION_NEXT_PORT}${request.url}`);
		options.headers = request.headers;
		options.method = request.method;
		options.agent = false;
	  
		try {
			const connector = http.request(options, serverResponse => {
				response.writeHeader(serverResponse.statusCode, serverResponse.headers);
				serverResponse.pipe(response);
				console.info('response', response);
			});
			request.pipe(connector);
		} catch (err) {
			response.statusCode = 500;
			response.write(JSON.stringify(err));
			response.end();
		}
	}, err => {
		console.error('dockentication error', err);
		response.statusCode = err.status;
		response.write(JSON.stringify(err));
		response.end();
	});
});