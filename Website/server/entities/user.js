// Represents the user business object. Will encapsulate its related data, behavior, and rules.

 class User{
	constructor(id, firstName, lastName, username, password, email){
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.password = password;
		this.email = email;
	}
	
	validateFirstName() {
		return this.firstName.length > 0 && this.firstName.length < 16;
	}
	
	validateLastName() {
		return this.lastName.length > 0 && this.lastName.length < 16;
	}
	
	validateUsername() {
		return this.username.length > 6 && this.username.length < 30;
	}
	
	validatePassword() {
		return this.password.length > 7 && this.username.length < 20;
	}
	
	validateEmail() {
		return this.email.indexOf("@") != -1;
	}
}

export default User;
