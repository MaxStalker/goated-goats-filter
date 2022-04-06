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
  fragment Edge on EventConnection {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        time
        fields
      }
    }
  }
`;

const managerFirstCall = gql`
  ${fragment}
  query GoatsManager($event: String) {
    events(
      first: 50 # Global hard-limit for now
      typeId: $event
      ordering: Ascending
    ) {
      ...Edge
    }
  }
`;

const managerNextCall = gql`
  ${fragment}
  query GoatsManager($event: String, $cursor: ID) {
    events(
      first: 50 # Global hard-limit for now
      ordering: Ascending
      typeId: $event
      after: $cursor
    ) {
      ...Edge
    }
  }
`;

const fetchEvents = async (name) => {
  console.log("fetch events with name ", name);
  const event = makeEventName(name);
  const response = await client.request(managerFirstCall, { event });

  // TODO: Add try/catch to properly handle errors
  let events = response.events.edges.map(transformers[name] || blank);

  if (response.events.pageInfo.hasNextPage) {
    let cursor = response.events.pageInfo.endCursor;
    let stop = false;
    let loops = 0;
    while (!stop) {
      // Fetch next call with updated query
      const response = await client.request(managerNextCall, { event, cursor });
      const { edges, pageInfo } = response.events;
      const { hasNextPage, endCursor } = pageInfo;
      const transformed = edges.map(transformers[name] || blank);
      events = events.concat(transformed);

      // If there are more items to fetch, update cursor and restart loop
      if (hasNextPage) {
        cursor = endCursor;
      } else {
        stop = true;
      }

      loops += 1;
    }
  }

  return events;
};

(async () => {
  const name = "RedeemGoatVoucher";
  const fileName = makeFileName(name);

  const events = await fetchEvents(name);
  console.log("Found ", events.length, " entries");
  writeDB(`./scrapper/data/${fileName}.json`, events);
})();
