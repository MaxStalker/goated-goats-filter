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
  console.log(formatted.slice(0, 5));
}

main();
