import databaseService from "../../../utils/databaseService.js";
import createUser from "../../../services/user/userFactory.js";
import userService from "../../../services/user/userService.js";
import createModule from "../../../services/module/moduleFactory.js";
import moduleService from "../../../services/module/moduleService.js";
import createQuiz from "../../../services/quiz/quizFactory.js";
import quizService from "../../../services/quiz/quizService.js";
import createQuizAttempt from "../../../services/quizAttempt/quizAttemptFactory.js";
import quizAttemptService from "../../../services/quizAttempt/quizAttemptService.js";
import {expect} from "chai";

describe("Quiz Attempt Entity", ()=>{
	let dbWrapper;
	let user;
	let userId;
	let userWrapper;
	let module;
	let moduleId;
	let moduleWrapper;
	let quiz;
	let quizId;
	let quizWrapper;
	let quizAttemptWrapper;
	let quizAttempt;
	let isFinished;
	
	beforeEach(async ()=>{
		dbWrapper = new databaseService();
		// Used the user factory to instantiate a new user.
		user = await createUser("test", "test", "test12345", "test12345", "test123@publix.com");
		if(user.boolean === false){
			throw new Error(user.response);
		}
		user = user.user;
		// Dependency injection. I've made this test file dependent on the userWrapper for interacting with the user object's methods.
		userWrapper = new userService(user);
		
		userId = userWrapper.getId();
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
		// Dependency injection. I've made this test file dependent on the quizWrapper for interacting with the quiz object's methods.
		quizWrapper = new quizService(quiz);
		
		quizId = quizWrapper.getId();
		isFinished = false;
		// Used the quiz attempt factory to instantiate a new quiz attempt.
		quizAttempt = await createQuizAttempt(userId, quizId, isFinished);
		if(quizAttempt.boolean === false){
			throw new Error(quizAttempt.response);
		}
		quizAttempt = quizAttempt.quizAttempt;
		// Dependency injection. I've made this test file dependent on the quizQuestionWrapper for interacting with the quiz attempt object's methods.
		quizAttemptWrapper = new quizAttemptService(quizAttempt);
	});
	
	afterEach(async()=>{
		await dbWrapper.deleteAllUsers();
		// The database deletes all quiz related content that is associated to each deleted module.
		await dbWrapper.deleteAllModules();                                                  
	});
	
	it("should have an id field", ()=>{
		expect(quizAttemptWrapper.getId()).to.be.a('number');
		expect(quizAttemptWrapper.getValidateId()).to.equal(true);
	});
	
	it("should have a userId field", ()=>{
		expect(quizAttemptWrapper.getUserId()).to.be.a('number');
		expect(quizAttemptWrapper.getValidateUserId()).to.equal(true);
	});
	
	it("should have a quizId field", ()=>{
		expect(quizAttemptWrapper.getQuizId()).to.be.a('number');
		expect(quizAttemptWrapper.getValidateQuizId()).to.equal(true);
	});
	
	it("should have an answer isFinished boolean field", ()=>{
		expect(quizAttemptWrapper.getIsFinished()).to.be.a('boolean');
		expect(quizAttemptWrapper.getValidateIsFinished()).to.equal(true);
	});
	
});



	
	