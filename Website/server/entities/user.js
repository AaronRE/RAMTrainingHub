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
	
	// Method that ensures the first name of the user is between 1 and 15 characters long.
	validateFirstName() {
		return this.firstName.length > 0 && this.firstName.length < 16;
	}
	
	// Method that ensures the last name of the user is between 1 and 15 characters long.
	validateLastName() {
		return this.lastName.length > 0 && this.lastName.length < 16;
	}
	
	// Method that ensures the username of the user is between 7 and 29 characters long.
	validateUsername() {
		return this.username.length > 6 && this.username.length < 30;
	}
	
	// Method that ensures the password of the user is between 8 and 19 characters long.
	validatePassword() {
		return this.password.length > 7 && this.password.length < 20;
	}
	
	// Method that ensures the email of the user has one @ symbol with characters before and after it.
	validateEmail() {
		let regex = /^[^@]+@[^@]+$/;
		return regex.test(this.email);
	}
}

export default User;