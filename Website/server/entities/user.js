// Represents the user business object. Will encapsulate its related data, behavior, and rules.

 class User{
	constructor(id, username, password, email){
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
	}
	
	validateUsername() {
		return this.username.length >= 3;
	}
}

export default User;
