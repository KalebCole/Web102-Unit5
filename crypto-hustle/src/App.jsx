import { useEffect, useState } from "react";
import CoinInfo from "./components/CoinInfo";

import "./App.css";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchAllCoinsData = async () => {
      fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY
      )
        .then((response) => response.json())
        .then((data) => {
          setList(data);
          console.log(list.Data);
        });
    };
    fetchAllCoinsData().catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  return (
    <>
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <ul>
          {searchInput.length > 0
            ? // what happens if we have search input? what list do we use to display coins?
              // perform search items
              // get the filtered results from the state and map through them
              filteredResults && filteredResults.map((coin) => (
                <CoinInfo
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                />
              ))
            : // what happens if we don't have search input? what list do we use to display coins?
              list &&
              Object.entries(list.Data).map(([coin]) =>
                list.Data[coin].PlatformType === "blockchain" ? (
                  <CoinInfo
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                  />
                ) : null
              )}
        </ul>
      </div>
    </>
  );
}

export default App;
