import databaseService from "../../../utils/databaseService.js";
import createModule from "../../../services/module/moduleFactory.js"
import {expect} from "chai";

let dbWrapper;
let res;

describe("Module Factory",()=>{
	
	beforeEach(async()=>{
		dbWrapper = new databaseService();
		await dbWrapper.deleteAllModules();
	});
	
	afterEach(async()=>{
		await dbWrapper.deleteAllModules();
	});
	
	it("should successfully create a module", async()=>{
		res = await createModule("Rack Down", "This is a test");
		expect(res.boolean).to.be.true;
	});
	
	it("should handle attempting to create a module that already exsists", async()=>{
		res = await createModule("Rack Down", "This is a test");
		expect(res.boolean).to.be.true;
		
		res = await createModule("Rack Down", "This is a test");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the title isn't entered", async() =>{
		res = await createModule("", "This is a test");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the body is too long", async() =>{
		res = await createModule("Rack Down", "t".repeat(1001));
		expect(res.boolean).to.be.false;
	});
});
	
	