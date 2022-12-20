function bodyParser(request, callback) {
	let body ='';

		 request.on('data',(chunk) => {
			console.log(chunk)
			body = body + chunk;
		});

		request.on('end', () =>{
			body = JSON.parse(body)
			request.body = body
			callback()
		})
}

module.exports = bodyParser;
