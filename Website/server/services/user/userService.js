// A layer of abstraction to wrap around the user class. Will help keep user entities decoupled from the rest of the application.
// Will interact with the user entity by executing business logic methods and enforcing business rules.
import databaseService from "../../utils/databaseService.js";

class userService{
	constructor(user){
		this.user = user;
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
	
	// Getter method that ensures the email of the user has one @ symbol with characters before and after it.
	getValidateEmail() {
		return this.user.validateEmail();
	}
	
	// Method that deletes a user from the database given their username.
	async deleteUser(userName){
		let dbWrapper = new databaseService();
		return result = await dbWrapper.deleteUser(userName);
	}
	
}

export default userService;