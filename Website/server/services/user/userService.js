// A layer of abstraction to wrap around the user class. Will help keep user entities decoupled from the rest of the application.
// Will interact with the user entity by executing business logic methods and enforcing business rules.
import databaseService from "../../utils/databaseService.js";
import createUser from "./userFactory.js";

class userService{
	constructor(user){
		this.user = user;
	}
	
	// Retreives the user's id.
	getId(){
		return this.user.id;
	}
	
	// Retreives the user's first name.
	getFirstName(){
		return this.user.firstName;
	}
	
	// Retreives the user's last name.
	getLastName(){
		return this.user.lastName;
	}
	
	// Retreives the user's username.
	getUserName(){
		return this.user.username;
	}
	
	// Retreives the user's password.
	getPassword(){
		return this.user.password;
	}
	
	// Retreives the user's email.
	getEmail(){
		return this.user.email;
	}
	
	// Getter method that ensures the first name of the user is between 1 and 15 characters long.
	getValidateFirstName(){
		return this.user.validateFirstName();
	}
	
	// Getter method that ensures the last name of the user is between 1 and 15 characters long.
	getValidateLastName(){
		return this.user.validateLastName();
	}
	
	// Getter method that ensures the username of the user is between 7 and 29 characters long.
	getValidateUserName(){
		return this.user.validateUsername();
	}
	
	// Getter method that ensures the password of the user is between 8 and 19 characters long.
	getValidatePassword() {
		return this.user.validatePassword();
	}
	
	// Getter method that ensures the email of the user ends with @publix.com.
	getValidateEmail() {
		return this.user.validateEmail();
	}
	
	// Async method that returns a user that is also added to the database.
	async createUser(firstName, lastName, username, password, email){
		return result = await createUser(firstName, lastName, username, password, email);
	}
	
	// Async method that deletes a user from the database given their username.
	async deleteUser(userName){
		let dbWrapper = new databaseService();
		return result = await dbWrapper.deleteUser(userName);
	}
	
	// Async method that reteives the user data associated to the given username from the database.
	async getUserData(userName){
		let dbWrapper = new databaseService();
	    let result = await dbWrapper.getUserData(userName);
	    return result;
	}
	
	// Async method that verifies if the given username and password exist in the database.
	async userLogin(userName, user_password){
		let dbWrapper = new databaseService();
		let result = await dbWrapper.userLogin(userName, user_password);
		return result;
	}
}

export default userService;