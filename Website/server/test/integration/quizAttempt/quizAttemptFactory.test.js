import databaseService from "../../../utils/databaseService.js";
import quizAttempt from "../../../entities/quizAttempt.js";
import createQuizAttempt from "../../../services/quizAttempt/quizAttemptFactory.js";
import createQuiz from "../../../services/quiz/quizFactory.js";
import createModule from "../../../services/module/moduleFactory.js";
import createUser from "../../../services/user/userFactory.js";
import {expect} from "chai";

let dbWrapper;
let user;
let userId;
let module;
let res;
let moduleId;
let quiz;
let quizId;
let isFinished;
	
describe("Quiz Attempt Factory",()=>{
	
	beforeEach(async()=>{
		dbWrapper = new databaseService();
		user = await createUser("test", "test", "test12345", "test12345", "test123@publix.com");
		userId = user.user.id;
	    module = await createModule("Rack Down", "This is a test");
		moduleId = module.module.id;
		quiz = await createQuiz(moduleId, "Rack Down", "This is a test");
		quizId = quiz.quiz.id;
		isFinished = false;
	});
	
	afterEach(async()=>{
		await dbWrapper.deleteAllUsers();
		// The database deletes all quiz related content that is associated to each deleted module.
		await dbWrapper.deleteAllModules();
	});
	
	it("should successfully create a quizAttempt", async()=>{
		res = await createQuizAttempt(userId, quizId, isFinished);
		expect(res.boolean).to.be.true;
	});
	
	it("should handle when no userId is passed in when creating a quizAttempt", async()=>{
		res = await createQuizAttempt("", quizId, isFinished);
		expect(res.boolean).to.be.false;
	});
	
	it("should handle when no quizId is passed in when creating a quizAttempt", async()=>{
		res = await createQuizAttempt(userId, "", isFinished);
		expect(res.boolean).to.be.false;
	});
	
	it("should handle when no isFinished value is passed in when creating a quizAttempt", async()=>{
		res = await createQuizAttempt(userId, quizId, "");
		expect(res.boolean).to.be.false;
	});
	
});
	
	