import { readDB } from "./db";
(() => {
  const data = readDB("./scrapper/max-goats.json");
  const sortByRarity = (a, b) => {
    if (a.score > b.score) {
      return -1;
    }

    if (a.score < b.score) {
      return 1;
    }

    if (a.slots > b.slots) {
      return -1;
    }

    if (a.slots < b.slots) {
      return 1;
    }

    if (a.name > b.name) {
      return -1;
    }

    if (a.name < b.name) {
      return 1;
    }

    return 0;
  };
  const sorted = data.sort(sortByRarity);
  console.log(sorted);

  console.log(`:robot: Result from \`${sorted.length}\` base goat vouchers:`)
  const reduced = sorted.reduce(
    (acc, goat) => {
      if (acc.current) {
        if (
          acc.current.goat.slots === goat.slots &&
          acc.current.goat.name === goat.name
        ) {
          acc.current.amount += 1;
        } else {
          console.log(
            `[${acc.current.goat.slots}] ${acc.current.goat.name} ${
              acc.current.amount > 1 ? `**x${acc.current.amount}**` : ""
            }`
          );

          acc.current = {
            goat,
            amount: 1,
          };
        }
      } else {
        acc.current = {
          goat,
          amount: 1,
        };
      }

      return acc;
    },
    { current: null }
  );

  // console.log(reduced);

  /*  sorted.forEach(goat =>{
    const {slots, name, rarity} = goat
    console.log(`[${slots}] ${name[0].toUpperCase()+name.slice(1)}`)
  })*/
})();
