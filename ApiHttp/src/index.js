const http = require('http')
const { URL } = require('url')

const bodyParser = require('./helper/bodyParser')
const routes = require('./routes')

const server = http.createServer((request, response) => {
	const parsedUrl = new URL(`http://${request.headers.host}${request.url}`)

	let { pathname }= parsedUrl;
	let id = null;
	console.log(request.method,request.url)
	const splitEndPoint = pathname.split('/').filter(Boolean);

	if (splitEndPoint.length > 1){
		pathname = `/${splitEndPoint[0]}/:id`;
		id =  splitEndPoint[1];
	}
	const route = routes.find(
		(routeObj) => routeObj.endpoint === pathname && routeObj.method === request.method
		);

	if (route){
		request.query = Object.fromEntries(parsedUrl.searchParams)
		request.params = { id }
		response.sendStatus = (statusCode,body) => {
			response.writeHead(statusCode,{'Content-Type' : 'application/json'});// escreve informações no header
			response.end(JSON.stringify(body));
		}

	if (['POST','PUT'].includes(request.method))
		bodyParser(request, () => route.handler(request,response))
	else
		route.handler(request,response);
	} else {
		response.sendStatus(404,`Cannot ${request.method} ${request.url}`)
	}
})

server.listen(3000, () => {
	console.log('🔥 Server started at http://localhost:3000')
})
