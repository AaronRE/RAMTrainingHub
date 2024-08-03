// An interface to wrap around the user class. Will help keep user entities decoupled from the rest of the application.

class userInterface{
	constructor(user){
		this.user = user;
	}
	
	getValidateUserName(){
		return this.user.validateUsername();
	}
}

export default userInterface;