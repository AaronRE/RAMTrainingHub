// Will map user related HTTP requests to the appropriate services which contain the appropriate business logic to handle them.
import userService from '../services/user/userService.js';
import createUser from '../services/user/userFactory.js';

class userController{
	// Method that relays user creation requests to the approriate service.
	async createUser(req, res){
		// Obtain the user details from the request body
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const userName = req.body.username;
		const password = req.body.password;
		const email = req.body.email;
		
		let user = await createUser(firstName, lastName, userName, password, email);
		
		// Reponses based on the attempt to create the proposed user.
		if(user.boolean){
			// User creation successful.
			return res.status(201).json({
				boolean: true,
				response: user.response,
				user: user.user
			});
		}
		
		// User creation failed due to an unforseen error.
		else if(user.response === "An unexpected error occurred."){
			return res.status(500).json({
				boolean: false,
				response: user.response
			});
		}
		else{
			// User creation failed, the proposed user was invalid.
			return res.status(400).json({
				boolean: false,
				response: user.response
			});
		}
	}
	
	// Method that relays user deletion requests to the approriate service.
	async deleteUser(req, res){
		const userName = req.body.userName;
		let userWrapper = new userService();
		/* 
			Attempting to delete the proposed user from the database via the userService deleteUser method
			which interacts with the database through the appropriately databaseService method.
		*/
		let result = await userWrapper.deleteUser(userName);
		if(result.boolean){
			// User creation successful.
			return res.status(201).json({
				boolean: true,
				response: result.response
			});
		}
		else{
			// User creation failed.
			return res.status(400).json({
				boolean: false,
				response: result.response
			});
		}
		
	}
	
	// Method that relays user data retrieval requests to the approriate service.
	async getUserData(req, res){
		const username = req.body.username;
		let userWrapper = new userService();
		/* 
			Attempting to retrieve the user data from the database via the userService getUserData method
			which interacts with the database through the appropriate databaseService method.
		*/
		let result = await userWrapper.getUserData(username);
		if(result.boolean){
			// User data retrieval successful.
			return res.status(201).json({
				boolean: true,
				response: result.response
			});
		}
		else{
			// User data retrieval failed.
			return res.status(400).json({
				boolean: false,
				response: result.response
			});
		}
		
	}
}

export default userController;