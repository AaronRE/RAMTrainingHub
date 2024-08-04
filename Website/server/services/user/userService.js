// A layer abstraction to wrap around the user class. Will help keep user entities decoupled from the rest of the application.
// Will interact with the user entity by executing business logic methods and enforcing business rules.

class userService{
	constructor(user){
		this.user = user;
	}
	
	getValidateUserName(){
		return this.user.validateUsername();
	}
	
	getValidatePassword() {
		return this.user.validatePassword();
	}
	
	getValidateEmail() {
		return this.user.validateEmail();
	}
}

export default userService;