import Parse from "parse/node";
import { PARSE_ID, JS_KEY } from "./keys";
import { GraphQLClient, request, gql } from "graphql-request";
import dot from "dotenv"

const initParse = () => {
  Parse.initialize(PARSE_ID, JS_KEY);
  Parse.serverURL = "https://parseapi.back4app.com/";
  console.log("Parse has been initialized.");
};

const VOUCHER_EVENT = "A.2068315349bdfce5.GoatedGoatsManager.RedeemGoatVoucher";
// const FLOWSCAN_GRAPHQL_ENDPOINT = "https://flowscan.org/query";
const FLOWSCAN_GRAPHQL_ENDPOINT = "https://query.flowgraph.co";

const fetchEvents = async () => {
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

  const gqlClient = new GraphQLClient(FLOWSCAN_GRAPHQL_ENDPOINT)

  /*  const result = await request(FLOWSCAN_GRAPHQL_ENDPOINT, query, {
    limit: 100,
    offset: 0,
  });*/
  const requestHeaders = {
    authorization: `Bearer ${process.env.TOKEN}`,
  }
  try{
    const result = await gqlClient.request(query, {
      limit: 100,
      offset: 0
    }, requestHeaders)
    console.log({ result })
  } catch (e){
    console.error(e)
  }
/*  if (result) {
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
  }*/
};

(async () => {
  dot.config();
  console.log(process.env.TOKEN)
  await fetchEvents();
  // initParse();
  // console.log("Events handler!");
})();
