import { useEffect, useState } from "react";
import { Link } from "react-router";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const getCoinPrice = async () => {
      try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`, { signal: controller.signal });
        const json = await response.json();
        setPrice(json);
      } catch (error) {
        if (error.name === "AbortError") {
          // It's ok, don't do anything
        } else {
          console.error(`Error fetching price for ${symbol}:`, error);
        }
      }
    };

    getCoinPrice();
    return () => controller.abort();
  }, [symbol]);

  return (
    <li className="main-list">
      <Link style={{ color: "white" }} to={`/coinDetails/${symbol}`} key={symbol}>
        <img className="icons" src={`https://www.cryptocompare.com${image}`} alt={`Icon for ${name}`} />
        {name} <span className="tab"></span>
        {price && price.USD ? ` $${price.USD} USD` : null}
      </Link>
    </li>
  );
};

export default CoinInfo;
