import databaseService from "../../../utils/databaseService.js";
import createUser from "../../../services/user/userFactory.js";
import userService from "../../../services/user/userService.js";
import createModule from "../../../services/module/moduleFactory.js";
import moduleService from "../../../services/module/moduleService.js";
import createQuiz from "../../../services/quiz/quizFactory.js";
import quizService from "../../../services/quiz/quizService.js";
import createQuizQuestion from "../../../services/quizQuestion/quizQuestionFactory.js";
import quizQuestionService from "../../../services/quizQuestion/quizQuestionService.js";
import createQuizAttempt from "../../../services/quizAttempt/quizAttemptFactory.js";
import quizAttemptService from "../../../services/quizAttempt/quizAttemptService.js";
import createQuizAnswer from "../../../services/quizAnswer/quizAnswerFactory.js";
import quizAnswerService from "../../../services/quizAnswer/quizAnswerService.js";
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
	
	let quizQuestion;
	let quizQuestionId;
	let quizQuestionWrapper;
	let quizAnswersJson;
	let correctAnswer;
	let question;
	
	let quizAttempt;
	let quizAttemptId;
	let quizAttemptWrapper;
	let isFinished;
	
	let quizAnswer;
	let quizAnswerId;
	let quizAnswerWrapper;
	let answer;
	
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
		
		quizAnswersJson = {
			A: "A".repeat(30),
			B: "B".repeat(30),
			C: "C".repeat(30),
			D: "D".repeat(30)
		}
		
		correctAnswer = 'A';
		question = "What is a Severity 1 Rack Down Work Emergency Work Order? Explain in detail."
		
		// Used the quiz question factory to instantiate a new quiz question.
		quizQuestion = await createQuizQuestion(quizId, question, quizAnswersJson, correctAnswer);
		if(quizQuestion.boolean === false){
			throw new Error(quizQuestion.response);
		}
		quizQuestion = quizQuestion.quizQuestion;
		// Dependency injection. I've made this test file dependent on the quizQuestionWrapper for interacting with the quiz question object's methods.
		quizQuestionWrapper = new quizQuestionService(quizQuestion);
		quizQuestionId = quizQuestionWrapper.getId();

		
		isFinished = false;
		// Used the quiz attempt factory to instantiate a new quiz attempt.
		quizAttempt = await createQuizAttempt(userId, quizId, isFinished);
		if(quizAttempt.boolean === false){
			throw new Error(quizAttempt.response);
		}
		quizAttempt = quizAttempt.quizAttempt;
		// Dependency injection. I've made this test file dependent on the quizAttemptWrapper for interacting with the quiz attempt object's methods.
		quizAttemptWrapper = new quizAttemptService(quizAttempt);
		quizAttemptId = quizAttemptWrapper.getId();

		
		answer = 'A';
		
		quizAnswer = await createQuizAnswer(quizAttemptId, quizQuestionId, answer);
		if(quizAnswer.boolean === false){
			throw new Error(quizAnswer.response);
		}
		quizAnswer = quizAnswer.quizAnswer;
		// Dependency injection. I've made this test file dependent on the quizAnswerWrapper for interacting with the quiz answer object's methods.
		quizAnswerWrapper = new quizAnswerService(quizAnswer);
		quizAnswerId = quizAnswerWrapper.getId();
		
		
	});
	
	afterEach(async()=>{
		await dbWrapper.deleteAllUsers();
		// The database deletes all quiz related content that is associated to each deleted module.
		await dbWrapper.deleteAllModules();                                                  
	});
	
	it("should have an id field", ()=>{
		expect(quizAnswerWrapper.getId()).to.be.a('number');
		expect(quizAnswerWrapper.getValidateId()).to.equal(true);
	});
	
	it("should have a quizAttemptId field", ()=>{
		expect(quizAnswerWrapper.getQuizAttemptId()).to.be.a('number');
		expect(quizAnswerWrapper.getValidateQuizAttemptId()).to.equal(true);
	});
	
	it("should have a quizQuestionId field", ()=>{
		expect(quizAnswerWrapper.getQuizQuestionId()).to.be.a('number');
		expect(quizAnswerWrapper.getValidateQuizQuestionId()).to.equal(true);
	});
	
	it("should have an answer field that contains the character A", ()=>{
		expect(quizAnswerWrapper.getAnswer()).to.equal('A');
		expect(quizAnswerWrapper.getValidateAnswer()).to.equal(true);
	});
	
});



	
	