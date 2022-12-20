let users = require('../mockes/users');
const { sort } = require('../routes');

module.exports = {
	listUsers(request,response){
		const sortedUsers = users.sort((a,b)=>{
			if (request.query.order == 'desc') {
				return a.id < b.id ? 1 : -1
			}
			return a.id > b.id ? 1 : -1
		})
		response.sendStatus(200,users);
	},
	getUserById(request,response) {
		const {id} = request.params;
		const user  = users.find(user => user.id === Number(id))
		if (user)
			return response.sendStatus(200,user);
		else
			response.sendStatus(404,{error : 'Not Found'});
	},
	createUser(request,response){
		const { body } = request.body
		const lastUserId = users[users.length - 1].id;
		const newUser = {
			id: lastUserId + 1,
			name : body.name
		}
		users.push(newUser)
	},
	UpdateUser(request,response){
		const { id } = request.params;
		const { name } = request.body;

		id = Number(id)

		const userExits = users.find((user) => user.id === id)

		if (!userExits)
			response.sendStatus(404,{error: 'Not found'})
		users = users.map( (user) => {
			if (user.id === id){
				return {
					...user,
					name,
				}
			}
			return user;
		})

		response.send(200,{id , name})
	},
	DeleteUser(request,response){
		const { id } = request.params;
		users = users.filter((user) => user.id !== id)
	}
}
