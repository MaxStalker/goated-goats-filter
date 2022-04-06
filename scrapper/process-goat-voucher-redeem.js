import {readDB} from "./db";

(async ()=>{
  const data = readDB("./scrapper/data/redeem-goat-voucher.json");
  const owners = data.reduce((acc, event)=>{
    acc[event.address] = true
    return acc
  },{})
  console.log(Object.keys(owners).length)
})()