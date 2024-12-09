import databaseService from "../../../utils/databaseService.js";
import createQuiz from "../../../services/quiz/quizFactory.js";
import createModule from "../../../services/module/moduleFactory.js";
import {expect} from "chai";

let module;
let res;
let moduleId;
let dbWrapper;

describe("Quiz Factory",()=>{
	
	beforeEach(async()=>{
		dbWrapper = new databaseService();
		// The database deletes all quiz related content that is associated to each deleted module.
		await dbWrapper.deleteAllModules();
	    module = await createModule("Rack Down", "This is a test");
		moduleId = module.module.id;
	});
	
	afterEach(async()=>{
		await dbWrapper.deleteAllModules();
	});
	
	it("should successfully create a Quiz", async()=>{
		res = await createQuiz(moduleId, "Rack Down", "This is a test");
		expect(res.boolean).to.be.true;
	});
	
	it("should handle attempting to create a Quiz that already exsists", async()=>{
		res = await createQuiz(moduleId, "Rack Down", "This is a test");
		res = await createQuiz(moduleId, "Rack Down", "This is a test");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the quiz name isn't entered", async() =>{
		res = await createQuiz(moduleId, "", "This is a test");
		expect(res.boolean).to.be.false;
	});
});
	
	