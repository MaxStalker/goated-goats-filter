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
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRInsO50r0qPDsvA7L_VpPlz0Y4j7oTmd8STHLDbAhaTrp1-aWt7WN1Yp0NEUxH-tT_W0fkaaqhy6tq/pub?gid=1795398990&single=true&output=csv";
  // "https://docs.google.com/spreadsheets/d/e/2PACX-1vRInsO50r0qPDsvA7L_VpPlz0Y4j7oTmd8STHLDbAhaTrp1-aWt7WN1Yp0NEUxH-tT_W0fkaaqhy6tq/pub?gid=1795398990&single=true&output=csv";
  const file = await fetch(url);
  const text = await file.text();
  const data = text.split(/\r\n|\n/).filter((item) => item);

  return data.slice(1).reduce((acc, item) => {
    const data = item.split(",");
    const key = data[0];

    acc[key] = [...data.slice(1)];
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

export const getCollectors = async () => {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRInsO50r0qPDsvA7L_VpPlz0Y4j7oTmd8STHLDbAhaTrp1-aWt7WN1Yp0NEUxH-tT_W0fkaaqhy6tq/pub?gid=1029977537&single=true&output=csv";
  const file = await fetch(url);
  const text = await file.text();
  const data = text.split(/\r\n|\n/).filter((item) => item);

  console.log({ data });

  return data.slice(1).reduce(
    (acc, item) => {
      // TODO: implement data processing here
      console.log({item})
      const [name, discordHandle, address] = item.split(",");
      if (address === "") {
        return acc;
      }

      acc.addresses.push(address);
      acc.byId[address] = {
        name,
        discordHandle,
        address,
        url
      };

      return acc;
    },
    {
      byId: {},
      addresses: [],
    }
  );
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

export const extractParams = (url) => {
  return url
    .slice(1)
    .split("&")
    .reduce((acc, item) => {
      const [key, value] = item.split("=");
      let finalValue = value;
      if (value && value.includes("[")) {
        finalValue = value.slice(1, -1).split(",");
      }
      acc[key] = finalValue;
      return acc;
    }, {});
};
