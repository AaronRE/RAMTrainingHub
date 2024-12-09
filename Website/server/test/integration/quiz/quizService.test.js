import databaseService from "../../../utils/databaseService.js";
import createModule from "../../../services/module/moduleFactory.js";
import moduleService from "../../../services/module/moduleService.js";
import createQuiz from "../../../services/quiz/quizFactory.js";
import quizService from "../../../services/quiz/quizService.js";
import {expect} from "chai";

describe("Quiz Entity", ()=>{
	let module;
	let dbWrapper;
	let moduleWrapper;
	let moduleId;
	let quiz;
	let quizWrapper;
	
	beforeEach(async ()=>{
		dbWrapper = new databaseService();
		await dbWrapper.deleteAllModules();
		await dbWrapper.deleteAllQuizzes();
		
		// Used the module factory to instantiate a new module.
		module = await createModule("Rack Down", "This is a test");
		if(module.boolean === false){
			throw new Error(module.response);
		}
		module = module.module;
		// Dependency injection. I've made this test file dependent on the moduleWrapper for interacting with the module object's methods.
		moduleWrapper = new moduleService(module);
		
		moduleId = moduleWrapper.getId();
		// Used the quiz factory to instantiate a new quiz.
		quiz = await createQuiz(moduleId, "Rack Down Quiz", "This is a test");
		if(quiz.boolean === false){
			throw new Error(quiz.response);
		}
		quiz = quiz.quiz;
		// Dependency injection. I've made this test file dependent on the moduleWrapper for interacting with the module object's methods.
		quizWrapper = new quizService(quiz);
	});
	
	afterEach(async()=>{
		await dbWrapper.deleteAllModules();
	});
	
	it("should have an id field", ()=>{
		expect(quizWrapper.getId()).to.be.a('number');
	});
	
	it("should have a moduleId field", ()=>{
		expect(quizWrapper.getModuleId()).to.be.a('number');
	});
	
	it("should have a title field", ()=>{
		expect(quizWrapper.getTitle()).to.equal("Rack Down Quiz");
	});
	
	it("should have a body field", ()=>{
		expect(quizWrapper.getBody()).to.equal("This is a test");
	});
	
	it("should have a title between 1 and 50 characters long", ()=>{
		expect(quizWrapper.getValidateTitle()).to.be.true;
	});
	
	it("should have a body between 0 and 1000 characters long", ()=>{
		expect(quizWrapper.getValidateBody()).to.be.true;
	});
});



	
	