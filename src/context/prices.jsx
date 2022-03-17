import { createContext, useEffect, useState } from "react";
import { getGoatPrices, getTraitPrices } from "../utils";

export const PricesContext = createContext({
  goatsPrices: {},
  traitsPrices: {},
});

export const PriceProvider = ({ children }) => {
  const [goatsPrices, setGoatsPrices] = useState({});
  const [traitsPrices, setTraitsPrices] = useState({});

  const fetchGoatPrices = async () => {
    const goatsPrices = await getGoatPrices();
    setGoatsPrices(goatsPrices);
  };

  const fetchTraitPrices= async ()=>{
    const traitsPrices = await getTraitPrices();
    setTraitsPrices(traitsPrices);
  }

  useEffect(() => {
    fetchGoatPrices();
    fetchTraitPrices();
  }, []);

  return (
    <PricesContext.Provider value={{ goatsPrices, traitsPrices }}>
      {children}
    </PricesContext.Provider>
  );
};
