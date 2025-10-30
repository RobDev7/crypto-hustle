import { useState, useEffect } from "react";
import CoinInfo from "./Components/CoinInfo";
import SideNav from "./Components/SideNav";
import "./App.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (!list?.Data) return;

    if (searchValue.trim() !== "") {
      const filteredData = list.Data.filter((item) => Object.values(item.CoinInfo).join("").toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list.Data);
    }
  };

  useEffect(() => {
    const fetchAllCoinData = async () => {
      try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/top/totaltoptiervol?limit=30&assetClass=ALL&tsym=USD&api_key=${API_KEY}`);
        const json = await response.json();
        if (json.Data) {
          setList(json);
          setFilteredResults(json.Data);
        }
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };
    fetchAllCoinData();
  }, []);

  const displayList = searchInput.length > 0 ? filteredResults : list?.Data || [];

  return (
    <>
      <SideNav />
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <input type="text" placeholder="Search..." onChange={(e) => searchItems(e.target.value)} />
        {!list?.Data ? (
          <p>Loading data...</p>
        ) : displayList.length === 0 ? (
          <p>No coins found.</p>
        ) : (
          <ul>
            {displayList
              .map((item) => item.CoinInfo)
              .filter((coin) => coin.Algorithm !== "N/A" && coin.ProofType !== "N/A")
              .map((coin) => (
                <CoinInfo key={coin.Name} image={coin.ImageUrl} name={coin.FullName} symbol={coin.Name} />
              ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
