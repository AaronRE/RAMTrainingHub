// Represents the user business object. Will encapsulate its related data, behavior, and rules.

 class User{
	constructor(id, username, password, email){
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
	}
	
	validateUsername() {
		return this.username.length > 6 && this.username.length < 30;
	}
	
	validatePassword() {
		return this.password.length > 7 && this.username.length < 20;
	}
	
	validateEmail() {
		return this.email.includes("@");
	}
}

export default User;
