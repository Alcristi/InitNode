const UserController = require("./controller/userController");

module.exports  = [
	{
		endpoint: '/users',
		method: 'GET',
		handler: UserController.listUsers,
	},
	{
		endpoint: '/users/:id',
		method: 'GET',
		handler: UserController.getUserById,
	},
	{
		endpoint: '/users',
		method: 'POST',
		handler: UserController.createUser,
	},
	{
		endpoint: '/users',
		method: 'PUT',
		handler: UserController.UpdateUser,
	},
];
