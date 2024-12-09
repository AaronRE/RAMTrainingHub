import databaseService from "../../../utils/databaseService.js";
import createImage from "../../../services/image/imageFactory.js";
import createDocument from "../../../services/document/documentFactory.js";
import {expect} from "chai";

let doc;
let res;
let docId;
let dbWrapper;
let link = "https://drive.google.com/file/d/1tTz2YABm2cjrEV_5wjtuHClescuHAk8M/view?usp=drive_link";

describe("Image Factory",()=>{
	
	beforeEach(async()=>{
		dbWrapper = new databaseService();
		await dbWrapper.deleteAllImages();
	    doc = await createDocument(null, "UltraSite Manual", "This is a test", "test", "test123@publix.com", "Manual");
		docId = doc.document.id;
	});
	
	afterEach(async ()=>{
		await dbWrapper.deleteDocument("UltraSite Manual");
		await dbWrapper.deleteAllImages();
	});
	
	it("should successfully create an Image", async()=>{
		res = await createImage(docId, "test", link);
		expect(res.boolean).to.be.true;
	});
	
	it("should handle attempting to create an image that already exsists", async()=>{
		res = await createImage(docId, "test", link);
		expect(res.boolean).to.be.true;
		res = await createImage(docId, "test", link);
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the image name isn't entered", async() =>{
		res = await createImage(docId, "", link);
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the image link isn't a google image link", async() =>{
		res = await createImage(docId, "test", "ht://google.com");
		expect(res.boolean).to.be.false;
	});
});
	
	