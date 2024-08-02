// Represents the user business object. Will encapsulate its related data, behavior, and rules.

 export default class User{
	constructor(id, username, password, email){
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
	}
	
	validate() {
		
	}
}
