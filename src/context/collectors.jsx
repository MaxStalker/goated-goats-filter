import { createContext, useEffect, useState } from "react";
import { getCollectors } from "../utils";

const initialContext = {
  byId: {},
  addresses: [],
};
export const CollectorsContext = createContext(initialContext);

export const CollectorsProvider = ({ children }) => {
  const [collectors, setCollectors] = useState(initialContext);

  const fetchCollectors = async () => {
    const collectors = await getCollectors();
    setCollectors(collectors);
  };

  useEffect(() => {
    fetchCollectors();
  }, []);

  return (
    <CollectorsContext.Provider value={collectors}>
      {children}
    </CollectorsContext.Provider>
  );
};
