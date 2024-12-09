import databaseService from "../../../utils/databaseService.js";
import createQuizAnswer from "../../../services/quizAnswer/quizAnswerFactory.js";
import createQuizAttempt from "../../../services/quizAttempt/quizAttemptFactory.js";
import createQuizQuestion from "../../../services/quizQuestion/quizQuestionFactory.js";
import createQuiz from "../../../services/quiz/quizFactory.js";
import createModule from "../../../services/module/moduleFactory.js";
import createUser from "../../../services/user/userFactory.js";
import {expect} from "chai";
import quizAnswer from "../../../entities/quizAnswer.js";

let dbWrapper;
let user;
let userId;
let module;
let res;
let moduleId;
let quiz;
let quizId;
let isFinished;
let quizAnswersJson;
let correctAnswer;
let question;
let quizQuestion;
let quizQuestionId;
let quizAttempt;
let quizAttemptId;
let answer;
	
describe("Quiz Answer Factory",()=>{
	
	beforeEach(async()=>{
		dbWrapper = new databaseService();
		user = await createUser("test", "test", "test12345", "test12345", "test123@publix.com");
		userId = user.user.id;
	    module = await createModule("Rack Down", "This is a test");
		moduleId = module.module.id;
		quiz = await createQuiz(moduleId, "Rack Down", "This is a test");
		quizId = quiz.quiz.id;
		isFinished = false;
		quizAnswersJson = {
			A: "A".repeat(30),
			B: "B".repeat(30),
			C: "C".repeat(30),
			D: "D".repeat(30)
		}
		
		correctAnswer = 'A';
		question = "What is a Severity 1 Rack Down Work Emergency Work Order? Explain in detail."
		quizQuestion = await createQuizQuestion(quizId, question, quizAnswersJson, correctAnswer);
		quizQuestionId = quizQuestion.quizQuestion.id;
		answer = 'A';
		quizAttempt = await createQuizAttempt(userId, quizId, isFinished);
		quizAttemptId = quizAttempt.quizAttempt.id;
		
	});
	
	afterEach(async()=>{
		await dbWrapper.deleteAllUsers();
		// The database deletes all quiz related content that is associated to each deleted module.
		await dbWrapper.deleteAllModules();
	});
	
	it("should successfully create a quizAnswer", async()=>{
		res = await createQuizAnswer(quizAttemptId, quizQuestionId, answer);
		expect(res.boolean).to.be.true;
	});
	
	it("should handle when no quizAttemptId is passed in when creating a quizAnswer", async()=>{
		res = await createQuizAnswer("", quizQuestionId, answer);
		expect(res.boolean).to.be.false;
	});
	
	it("should handle when no quizQuestionId is passed in when creating a quizAnswer", async()=>{
		res = await createQuizAnswer(quizAttemptId, "", answer);
		expect(res.boolean).to.be.false;
	});
	
	it("should handle when no answer is passed in when creating a quizAnswer", async()=>{
		res = await createQuizAnswer(quizAttemptId, quizQuestionId, "");
		expect(res.boolean).to.be.false;
	});
	
	it("should handle when an integer is passed as an answer in when creating a quizAnswer", async()=>{
		res = await createQuizAnswer(quizAttemptId, quizQuestionId, 1);
		expect(res.boolean).to.be.false;
	});
	
});
	
	