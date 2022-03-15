import { Container, Tabs, Tab, Input } from "./Components";
import { useEffect, useState } from "react";
import { setEnvironment, registerPlugin, query } from "flow-cadut";
import { getDisplay, GoatedGoats, GoatedTraits } from "flow-cadut/views";
import { FIND } from "flow-cadut/plugins/FIND";
import { Goat, Trait } from "./Gallery";
import GalleryDisplay from "./GalleryDisplay";
import * as fcl from "@onflow/fcl";

const setup = async () => {
  console.log("setup!");
  await setEnvironment("mainnet");
  await registerPlugin(FIND);

  await fcl.unauthenticate();

  fcl
    .config()
    .put("discovery.wallet", "https://flow-wallet.blocto.app/authn"); // Configure FCL's Wallet Discovery mechanism
};

export const FetchAddress = ({ fetch }) => {
  const [address, setAddress] = useState("max.find");
  return (
    <div>
      <Input onChange={(e) => setAddress(e.target.value)} value={address} />
      <button
        onClick={() => {
          fetch(address);
        }}
      >
        Fetch
      </button>
    </div>
  );
};

export default function App() {
  const types = ["Goats", "Traits"];
  const [activeType, setType] = useState(types[0]);
  const [goats, setGoats] = useState([]);
  const [traits, setTraits] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  const fetchDisplay = async (address) => {
    console.log("fetch for ", address);
    setLoading(true);
    const [result, err] = await query({
      code: `
        pub fun main(): Int{
          return 42
        }
      `,
    });
    console.log({ result, err });
    try {
      console.log("fetching...");
      const { GoatedGoats: goats = [], GoatedTraits: traits = [] } =
        await getDisplay([GoatedGoats, GoatedTraits], address);
      console.log({ goats, traits });
      setGoats(goats || []);
      setTraits(traits || []);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <Container>
      {!user ? (
        <button
          onClick={async () => {
            const activeUser = await fcl.logIn();
            console.log({ activeUser });
            if (activeUser.addr) {
              setUser(activeUser);
              fetchDisplay(activeUser.addr);
            }
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p>{user.addr}</p>
          <button
            onClick={() => {
              fcl.unauthenticate();
              setUser(null);
            }}
          >
            Logout
          </button>
        </>
      )}
      {!user && <FetchAddress fetch={fetchDisplay} />}
      {loading && <p>Please wait, fetching data...</p>}
      {(goats.length !== 0 || traits.length !== 0) && (
        <>
          <Tabs>
            <Tab
              active={activeType === types[0]}
              onClick={() => {
                setType(types[0]);
              }}
            >
              {types[0]}
            </Tab>
            <Tab
              active={activeType === types[1]}
              onClick={() => {
                setType(types[1]);
              }}
            >
              {types[1]}
            </Tab>
          </Tabs>
          {activeType === types[0] ? (
            <GalleryDisplay
              key="goats"
              items={goats}
              getRarity={(item) => {
                return item.metadata.skinRarity;
              }}
              query={(item, term) => {
                const result =
                  item.metadata.skinRarity.includes(term) ||
                  item.metadata.skinFileName.includes(term);
                return result;
              }}
              renderItem={({ item, onClick, selected }) => {
                return (
                  <Goat
                    key={item.id}
                    goat={item}
                    onClick={onClick}
                    selected={selected}
                  />
                );
              }}
            />
          ) : (
            <GalleryDisplay
              key="traits"
              items={traits}
              getRarity={(item) => {
                return item.metadata.rarity;
              }}
              query={(item, term) => {
                const result =
                  item.metadata.rarity.includes(term) ||
                  item.metadata.traitSlot.includes(term) ||
                  item.metadata.fileName.includes(term);
                return result;
              }}
              renderItem={({ item, onClick, selected }) => {
                return (
                  <Trait
                    key={item.id}
                    trait={item}
                    onClick={onClick}
                    selected={selected}
                  />
                );
              }}
            />
          )}
        </>
      )}
    </Container>
  );
}
