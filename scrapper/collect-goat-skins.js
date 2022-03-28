import {readDB, writeDB} from "./db";

(async ()=>{
  const data = readDB("./scrapper/db.json")
  // console.log(Object.keys(data.goats.skins))
  // console.log(Object.keys(data.goats.skins).length)
  // console.log(data.goats.skins);
  writeDB("./src/data/skin-list.json", data.goats.skins)
})()