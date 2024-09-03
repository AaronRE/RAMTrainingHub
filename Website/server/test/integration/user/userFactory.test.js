import databaseService from "../../../utils/databaseService.js";
import createUser from "../../../services/user/userFactory.js";
import {expect} from "chai";

let dbWrapper;
let res;

describe("User Factory",()=>{
	
	beforeEach(async()=>{
		dbWrapper = new databaseService();
		await dbWrapper.deleteAllUsers();
	});
	
	afterEach(async ()=>{
		
	});
	
	it("should successfully create a user", async()=>{
		res = await createUser("test", "test", "test12345", "test12345", "test123@gmail.com");
		expect(res.boolean).to.be.true;
	});
	
	it("should handle attempting to create a user that already exsists", async()=>{
		res = await createUser("test", "test", "test12345", "test12345", "test123@gmail.com");
		expect(res.boolean).to.be.true;
		
		res = await createUser("test", "test", "test12345", "test12345", "test123@gmail.com");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the first name isn't entered", async() =>{
		res = await createUser("", "test", "test12345", "test12345", "test123@gmail.com");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the first name is too long", async() =>{
		res = await createUser("t".repeat(16), "test", "test12345", "test12345", "test123@gmail.com");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the last name isn't entered", async() =>{
		res = await createUser("test", "", "test12345", "test12345", "test123@gmail.com");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the last name is too long", async() =>{
		res = await createUser("test", "t".repeat(16), "test12345", "test12345", "test123@gmail.com");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the username is too short", async() =>{
		res = await createUser("test", "test", "t".repeat(6), "test12345", "test123@gmail.com");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the username is too long", async() =>{
		res = await createUser("test", "test", "t".repeat(30), "test12345", "test123@gmail.com");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the password is too short", async() =>{
		res = await createUser("test", "test", "test12345", "t".repeat(7), "test123@gmail.com");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the password is too long", async() =>{
		res = await createUser("test", "test", "test12345", "t".repeat(20), "test123@gmail.com");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the email doesn't contain only one @ character", async() =>{
		res = await createUser("test", "test", "test12345", "test12345", "test123gmail.com");
		expect(res.boolean).to.be.false;
	});
	
	
});
	
	