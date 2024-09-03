import databaseService from "../../../utils/databaseService.js";
import createModule from "../../../services/module/moduleFactory.js";
import moduleService from "../../../services/module/moduleService.js";
import {expect} from "chai";

describe("Module Entity", ()=>{
	let module;
	let dbWrapper;
	let moduleWrapper;
	
	beforeEach(async ()=>{
		dbWrapper = new databaseService();
		await dbWrapper.deleteAllModules();
		
		// Used the module factory to instantiate a new module.
		module = await createModule("Rack Down", "This is a test");
		if(module.boolean === false){
			throw new Error(module.response);
		}
		module = module.module;
		// Dependency injection. I've made this test file dependent on the moduleWrapper for interacting with the module object's methods.
		moduleWrapper = new moduleService(module);
	});
	
	afterEach(async()=>{
		dbWrapper.deleteAllModules();
	});
	
	it("should have an id field", ()=>{
		expect(moduleWrapper.getId()).to.be.a('number');
	});
	
	it("should have a title field", ()=>{
		expect(moduleWrapper.getTitle()).to.equal("Rack Down");
	});
	
	it("should have a body field", ()=>{
		expect(moduleWrapper.getBody()).to.equal("This is a test");
	});
	
	it("should have a title between 1 and 50 characters long", ()=>{
		expect(moduleWrapper.getValidateTitle()).to.be.true;
	});
	
	it("should have a body between 0 and 1000 characters long", ()=>{
		expect(moduleWrapper.getValidateBody()).to.be.true;
	});
});



	
	