import { DataManager, MDBClient } from "./db.js";

const MONGO_URL = process.env["MONGO_URL"];

if(!MONGO_URL) {
    throw new Error("MONGO_URLがセットされていません");
}
const mongoClient = new MDBClient({url:MONGO_URL});

const dataManager = new DataManager(mongoClient);

await dataManager.query();
