import databaseService from "../../../utils/databaseService.js";
import createModule from "../../../services/module/moduleFactory.js";
import moduleService from "../../../services/module/moduleService.js";
import createQuiz from "../../../services/quiz/quizFactory.js";
import quizService from "../../../services/quiz/quizService.js";
import createQuizQuestion from "../../../services/quizQuestion/quizQuestionFactory.js";
import quizQuestionService from "../../../services/quizQuestion/quizQuestionService.js";
import {expect} from "chai";

describe("Quiz Question Entity", ()=>{
	let dbWrapper;
	let module;
	let moduleId;
	let moduleWrapper;
	let quiz;
	let quizId;
	let quizWrapper;
	let quizQuestionWrapper;
	let quizQuestion;
	let question;
	let quizAnswersJson;
	let correctAnswer;
	
	beforeEach(async ()=>{
		dbWrapper = new databaseService();
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
		
		quizAnswersJson = {
			A: "A".repeat(30),
			B: "B".repeat(30),
			C: "C".repeat(30),
			D: "D".repeat(30)
		}
		correctAnswer = 'A';
		question = "What is a Severity 1 Rack Down Work Emergency Work Order? Explain in detail."

		// Used the quiz question factory to instantiate a new quiz.
		quizQuestion = await createQuizQuestion(quizId, question, quizAnswersJson, correctAnswer);
		if(quizQuestion.boolean === false){
			throw new Error(quizQuestion.response);
		}
		quizQuestion = quizQuestion.quizQuestion;
		// Dependency injection. I've made this test file dependent on the quizQuestionWrapper for interacting with the quiz question object's methods.
		quizQuestionWrapper = new quizQuestionService(quizQuestion);
	});
	
	afterEach(async()=>{
		// The database deletes all quiz related content that is associated to each deleted module.
		await dbWrapper.deleteAllModules();                                                  
	});
	
	it("should have an id field", ()=>{
		expect(quizQuestionWrapper.getId()).to.be.a('number');
	});
	
	it("should have a quizId field", ()=>{
		expect(quizQuestionWrapper.getQuizId()).to.be.a('number');
	});
	
	it("should have a question field", ()=>{
		expect(quizQuestionWrapper.getQuestion()).to.equal(question);
	});
	
	it("should have an answer field", ()=>{
		expect(quizQuestionWrapper.getAnswers()).to.be.a('object');
	});
	
	it("should have a question between 30 and 200 characters long", ()=>{
		expect(quizQuestionWrapper.getValidateQuestion()).to.be.true;
	});
	
	it("should have answers that contain the fields A, B, C, and D", ()=>{
		expect(quizQuestionWrapper.getValidateAnswers()).to.be.true;
	});
	
	it("should have answers that are between 15 to 50 characters long", ()=>{
		expect(quizQuestionWrapper.getValidateAnswersLength()).to.be.true;
	});
});



	
	