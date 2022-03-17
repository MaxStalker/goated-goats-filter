export const getGoatPrices = async () => {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRInsO50r0qPDsvA7L_VpPlz0Y4j7oTmd8STHLDbAhaTrp1-aWt7WN1Yp0NEUxH-tT_W0fkaaqhy6tq/pub?gid=679016455&single=true&output=csv";
  const file = await fetch(url);
  const text = await file.text();
  const data = text.split(/\r\n|\n/).filter((item) => item);

  return data.slice(1).reduce((acc, item) => {
    const data = item.split(",");
    const key = data[0];

    acc[key] = {
      basePrice: data[1],
      avaragePrice: data[2],
    };
    return acc;
  }, {});
};
export const getAdjustedGoatPrices = async () => {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRInsO50r0qPDsvA7L_VpPlz0Y4j7oTmd8STHLDbAhaTrp1-aWt7WN1Yp0NEUxH-tT_W0fkaaqhy6tq/pub?gid=1795398990&single=true&output=csv"
    // "https://docs.google.com/spreadsheets/d/e/2PACX-1vRInsO50r0qPDsvA7L_VpPlz0Y4j7oTmd8STHLDbAhaTrp1-aWt7WN1Yp0NEUxH-tT_W0fkaaqhy6tq/pub?gid=1795398990&single=true&output=csv";
  const file = await fetch(url);
  const text = await file.text();
  const data = text.split(/\r\n|\n/).filter((item) => item);

  return data.slice(1).reduce((acc, item) => {
    const data = item.split(",");
    const key = data[0];

    console.log(data)
    acc[key] = [...data.slice(1)]
    return acc;
  }, {});
};

export const getTraitPrices = async () => {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRInsO50r0qPDsvA7L_VpPlz0Y4j7oTmd8STHLDbAhaTrp1-aWt7WN1Yp0NEUxH-tT_W0fkaaqhy6tq/pub?gid=1184235835&single=true&output=csv";
  const file = await fetch(url);
  const text = await file.text();
  const data = text.split(/\r\n|\n/).filter((item) => item);

  return data.slice(1).reduce((acc, item) => {
    const data = item.split(",");
    const key = data[0].toLowerCase();

    acc[key] = {
      basePrice: data[1],
      avaragePrice: data[2],
    };
    return acc;
  }, {});
};

export const capitalize = (item) => item[0].toUpperCase() + item.slice(1);

export const getSkinName = (skinFile) => {
  const name = skinFile.slice(5).slice(0, -4);
  return name.split("_").map(capitalize).join(" ");
};

export const getTraitName = (fileName, slot) => {
  return fileName
    .slice(slot.length + 1, -4)
    .split("-")
    .map(capitalize)
    .join(" ");
};
