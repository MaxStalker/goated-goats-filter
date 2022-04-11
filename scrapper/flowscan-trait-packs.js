import { GraphQLClient, request, gql } from "graphql-request";
import dot from "dotenv";
import { writeDB } from "./db";

// Enable environment variables
dot.config();

const endpointFlowScan = "https://query.flowgraph.co";

const client = new GraphQLClient(endpointFlowScan, {
  headers: {
    authorization: `Bearer ${process.env.TOKEN}`,
  },
});

const makeEventName = (name) => `A.2068315349bdfce5.GoatedGoatsManager.${name}`;
const makeFileName = (name) =>
  name
    .match(/([A-Z][a-z]*)/g)
    .map((i) => i.toLowerCase())
    .join("-");

const transformers = {
  RedeemGoatVoucher: (item) => {
    const { time, fields } = item.node;
    const [id, goatId, address] = fields;

    return {
      time,
      id: id.value,
      goatId: goatId.value,
      address: address.value,
    };
  },
};
const blank = (item) => item;

const fragment = gql`
  fragment Interaction on TransactionConnection {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        time
        events {
          edges {
            node {
              type {
                id
                name
              }
              fields
            }
          }
        }
      }
    }
  }
`;

const managerFirstCall = gql`
  ${fragment}
  query TraitPacks {
    contract(id: "A.2068315349bdfce5.GoatedGoatsManager") {
      interactions(first: 50, ordering: Ascending) {
        ...Interaction
      }
    }
  }
`;

const managerNextCall = gql`
  ${fragment}
  query TraitPacks($cursor: ID) {
    contract(id: "A.2068315349bdfce5.GoatedGoatsManager") {
      interactions(first: 50, after: $cursor, ordering: Ascending) {
        ...Interaction
      }
    }
  }
`;

const filter = {
  "A.2068315349bdfce5.GoatedGoatsManager.RedeemTraitPack": true,
  "A.2068315349bdfce5.GoatedGoatsTrait.Mint": true,
  "A.2068315349bdfce5.GoatedGoatsTrait.Deposit": true,
}

const reducer = (acc, item) => {
  const { time, events } = item.node;

  for (let i = 0; i < events.edges.length; i++) {
    const item = events.edges[i];
    const { node } = item;
    const { name, id } = node.type;

    if (filter[id]) {
      const { fields } = node;
      const data = fields.reduce((acc, field) => {
        acc.push(field.value);

        return acc;
      }, []);

      acc.push({
        id,
        name,
        time,
        data,
      });
    } else {
      console.log("We don't need ", id);
    }

    return acc;
  }
}

const fetchEvents = async () => {
  const response = await client.request(managerFirstCall);

  let events = response.contract.interactions.edges.reduce((acc, item) => {
    const { time, events } = item.node;

    for (let i = 0; i < events.edges.length; i++) {
      const item = events.edges[i];
      const { node } = item;
      const { name, id } = node.type;

      if (filter[id]) {
        const { fields } = node;
        const data = fields.reduce((acc, field) => {
          acc.push(field.value);

          return acc;
        }, []);

        acc.push({
          id,
          name,
          time,
          data,
        });
      } else {
        console.log("We don't need ", id);
      }
    }
    return acc;
  }, []);

  return events

  if (response.contract.interactions.pageInfo.hasNextPage) {
    let cursor = response.events.pageInfo.endCursor;
    let stop = false;
    let loops = 0;
    while (!stop) {
      // Fetch next call with updated query
      const response = await client.request(managerNextCall, { event, cursor });
      const { edges, pageInfo } = response.contract.interactions;
      const { hasNextPage, endCursor } = pageInfo;
      // const transformed = edges.map(transformers[name] || blank);

      let newEvents = response.contract.interactions.edges.reduce(reducer, []);

      events = events.concat(newEvents);

      // If there are more items to fetch, update cursor and restart loop
      if (hasNextPage) {
        cursor = endCursor;
      } else {
        stop = true;
      }

      loops += 1;

      // TODO: Remove
      if (loops > 10) {
        stop = true;
      }
    }
  }

  return events;
};

(async () => {
  // const name = "RedeemGoatVoucher";
  // const fileName = makeFileName(name);

  const events = await fetchEvents();
  console.log(events);
  // console.log("Found ", events.length, " entries");
  // writeDB(`./scrapper/data/${fileName}.json`, events);
})();
