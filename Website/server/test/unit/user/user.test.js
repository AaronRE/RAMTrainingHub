import createUser from "../../../services/user/userFactory.js";
import userService from "../../../services/user/userService.js";
import {expect} from "chai";

describe("User Entity", ()=>{
	let user;
	let userWrapper;
	
	beforeEach(()=>{
		// Used the user factory to instantiate a new user.
		user = createUser("1", "test123", "test1234", "test123@gmail.com");
		// Dependency injection. I've made this test file dependent on the userWrapper for interacting with the user object's methods.
		userWrapper = new userService(user);
	});
	
	it("should have an id, username, password, and email property", ()=>{
		expect(user).to.have.property("id").that.equals("1");
		expect(user).to.have.property("username").that.equals("test123");
		expect(user).to.have.property("password").that.equals("test1234");
		expect(user).to.have.property("email").that.equals("test123@gmail.com");
	});
	
	it("should have a username in between 6 and 30 characters long", ()=>{
		expect(userWrapper.getValidateUserName()).to.be.true;
	});
	
	it("should have a password in between 7 and 20 characters long", ()=>{
		expect(userWrapper.getValidatePassword()).to.be.true;
	});
});


	
	