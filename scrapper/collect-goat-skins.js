import {readDB} from "./db";

(async ()=>{
  const data = readDB("./scrapper/db.json")
  console.log(Object.keys(data.goats.skins))
  console.log(Object.keys(data.goats.skins).length)
})()