const fs = require("fs");
const data = require("./data.json");

async function main() {
  console.log(data.length);
  const formatted = data.map((item) => {
    const { name, owner } = item.blockEventData;
    return {
      name,
      address: owner,
    };
  });

  let seen = {};
  let skipped = 0;
  let start = 0;
  let end = 100;

  for (let i = start; i < Math.max(formatted.length, end); i++) {
    const user = formatted[i];

/*    // Skip processed addresses
    if (seen[user.address]) {
      skipped += 1;
      continue;
    }*/

    seen[user.address] = true;
    console.log({ user });
  }
  console.log({ skipped, total: formatted.length });
}

main();
