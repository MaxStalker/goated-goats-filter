import { readDB } from "./db";

const position = (index) => {
  switch (index){
    case 0: return ":first_place:"
    case 1: return ":second_place:"
    case 2: return ":third_place:"
    default: return `#${index+1}`
  }
}

(() => {
  const leaders = readDB("./scrapper/top-10.json");

  // Process by goats
  /*
  console.log(":star: Leaderboard by number of goats")
  leaders.forEach((owner, i) => {
    const ownerAddress = owner.find || owner.address
    console.log(`${position(i)}`, `**find:${ownerAddress}**`, "- Goats:", owner.goats, `-> https://goated-goats-filter.vercel.app/owners/${ownerAddress}/goats`);
  })
  */

  // Process by traits

  console.log(":star: Leaderboard by number of traits")
  leaders.forEach((owner, i) => {
    const ownerAddress = owner.find || owner.address
    console.log(`${position(i)}`, `**find:${ownerAddress}**`, "- Traits:", owner.traits, `-> https://goated-goats-filter.vercel.app/owners/${ownerAddress}/traits`);
  })

/*    console.log("\n")
    console.log(":medal: Leaderboard by number of traits")
    console.log(`#${i+1}`,"**", owner.find || owner.address, "** - Goats:", owner.traits);*/
})();
