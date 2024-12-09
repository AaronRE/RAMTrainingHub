import databaseService from "../../../utils/databaseService.js";
import createQuizQuestion from "../../../services/quizQuestion/quizQuestionFactory.js";
import createQuiz from "../../../services/quiz/quizFactory.js";
import createModule from "../../../services/module/moduleFactory.js";
import {expect} from "chai";

let dbWrapper;
let module;
let res;
let moduleId;
let quiz;
let quizId;
let question;
let correctAnswer;
let quizAnswersJson;
	
describe("Quiz Question Factory",()=>{
	
	beforeEach(async()=>{
		dbWrapper = new databaseService();
	    module = await createModule("Rack Down", "This is a test");
		moduleId = module.module.id;
		quiz = await createQuiz(moduleId, "Rack Down", "This is a test");
		quizId = quiz.quiz.id;
		
		quizAnswersJson = {
			A: "A".repeat(30),
			B: "B".repeat(30),
			C: "C".repeat(30),
			D: "D".repeat(30)
		}
		
		correctAnswer = 'A';
		question = "What is a Severity 1 Rack Down Work Emergency Work Order? Explain in detail."
		
	});
	
	afterEach(async()=>{
		// The database deletes all quiz related content that is associated to each deleted module.
		await dbWrapper.deleteAllModules();
	});
	
	it("should successfully create a quizQuestion", async()=>{
		res = await createQuizQuestion(quizId, question, quizAnswersJson, correctAnswer);
		expect(res.boolean).to.be.true;
	});
	
	it("it should handle when the quiz question's question isn't entered", async() =>{
		res = await createQuizQuestion(quizId, "", quizAnswersJson, correctAnswer);
		expect(res.boolean).to.be.false;
	});
});
	
	