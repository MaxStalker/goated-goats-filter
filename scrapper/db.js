/* Local Database */
import fs from "fs";
export const LOCAL_DB = "./scrapper/db.json";
export const DATA_HUB = "./src/data"
export const SMALL_DB = `${DATA_HUB}/small-data.json`;
export const OWNERS_DB = `${DATA_HUB}/ownership.json`;

export const readDB = (db) => {
	let rawdata = fs.readFileSync(db);
	return JSON.parse(rawdata);
};

export const writeDB = (db, data) => {
	let raw = JSON.stringify(data, null, 2);
	fs.writeFileSync(db, raw);
};
