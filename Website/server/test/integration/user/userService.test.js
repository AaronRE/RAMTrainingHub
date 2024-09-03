import databaseService from "../../../utils/databaseService.js";
import createUser from "../../../services/user/userFactory.js";
import userService from "../../../services/user/userService.js";
import {expect} from "chai";

describe("User Entity", ()=>{
	let user;
	let dbWrapper;
	let userWrapper;
	
	beforeEach(async ()=>{
		dbWrapper = new databaseService();
		await dbWrapper.deleteAllUsers();
		
		// Used the user factory to instantiate a new user.
		user = await createUser("test", "test", "tester123416", "test1234", "test123@gmail.com");
		if(user.boolean === false){
			throw new Error(user.response);
		}
		user = user.user;
		// Dependency injection. I've made this test file dependent on the userWrapper for interacting with the user object's methods.
		userWrapper = new userService(user);
	});
	
	it("should have a firstName field", ()=>{
		expect(userWrapper.getFirstName()).to.equal("test");
	});
	
	it("should have a lastName field", ()=>{
		expect(userWrapper.getLastName()).to.equal("test");
	});
	
	it("should have a username field", ()=>{
		expect(userWrapper.getUserName()).to.equal("tester123416");
	});
	
	it("should have a password field", ()=>{
		expect(userWrapper.getPassword()).to.equal("test1234");
	});
	
	it("should have an email field", ()=>{
		expect(userWrapper.getEmail()).to.equal("test123@gmail.com");
	});
	
	it("should have a first name in between 0 and 16 characters long", ()=>{
		expect(userWrapper.getValidateFirstName()).to.be.true;
	});
	
	it("should have a last name in between 0 and 16 characters long", ()=>{
		expect(userWrapper.getValidateLastName()).to.be.true;
	});
	
	it("should have a username in between 6 and 30 characters long", ()=>{
		expect(userWrapper.getValidateUserName()).to.be.true;
	});
	
	it("should have a password in between 7 and 20 characters long", ()=>{
		expect(userWrapper.getValidatePassword()).to.be.true;
	});
	
	it("should have a valid email that contains the @ symbol", ()=>{
		expect(userWrapper.getValidateEmail()).to.be.true;
	})
});


	
	