import Parse from "parse/node";
import { PARSE_ID, JS_KEY } from "./keys";
import { request, gql } from "graphql-request";

const initParse = () => {
  Parse.initialize(PARSE_ID, JS_KEY);
  Parse.serverURL = "https://parseapi.back4app.com/";
  console.log("Parse has been initialized.");
};

const VOUCHER_EVENT = "A.2068315349bdfce5.GoatedGoatsManager.RedeemGoatVoucher";
const FLOWSCAN_GRAPHQL_ENDPOINT = "https://flowscan.org/query";
const query = gql`
  query GetEvents($limit: Int, $offset: Int) {
    contract(id: "A.2068315349bdfce5.GoatedGoatsManager") {
      id
      interactions(limit: $limit, offset: $offset) {
        count
        edges {
          node {
            events(
              type: [
                ${VOUCHER_EVENT}
              ]
            ) {
              edges {
                node {
                  fields
                  eventType {
                    fullId
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const fetchEvents = async () => {
  const result = await request(FLOWSCAN_GRAPHQL_ENDPOINT, query, {
    limit: 10,
    offset: 0,
  });
  if (result) {
    const {
      contract: { interactions },
    } = result;

    for (let i = 0; i < interactions.edges.length; i++) {
      const edge = interactions.edges[i];
      const events = edge.node.events.edges;
      if (events.length > 0) {
        for (let j = 0; j < events.length; j++) {
          const event = events[j].node;
          console.log(event);
          if (event.fields) {
            for (let k = 0; k < event.fields.length; k++) {
              const field = event.fields[k];
              console.log({ field });
            }
          } else {
            console.log("empty event");
            console.log(event.eventType.fullId);
          }
        }
      }
    }
  }
};

(async () => {
  // initParse();
  console.log("Events handler!");
})();
