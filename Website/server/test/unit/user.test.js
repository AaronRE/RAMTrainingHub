import User from "../../entities/user.js";
import {expect} from "chai";

describe("User Entity", ()=>{
	let user;
	
	beforeEach(()=>{
		user = new User("1", "test123", "test123", "test123@gmail.com");
	});
	
	it("should have an id, username, password, and email property", ()=>{
		expect(user).to.have.property("id").that.equals("1");
		expect(user).to.have.property("username").that.equals("test123");
		expect(user).to.have.property("password").that.equals("test123");
		expect(user).to.have.property("email").that.equals("test123@gmail.com");
	});
});