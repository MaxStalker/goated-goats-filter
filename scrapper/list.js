import {SMALL_DB, readDB, writeDB} from "./db";

(()=>{
	const {traits} = readDB(SMALL_DB);
	const {imageData} = traits;

	const keys = Object.keys(imageData);
	const list = keys.map(key =>{
		const item = imageData[key]
		return `[${item.traitSlot}]-[${item.rarity}]-${item.fileName.slice(0,-4)}`
	})
	console.log(list)

	writeDB("./scrapper/list.json", list)
})()