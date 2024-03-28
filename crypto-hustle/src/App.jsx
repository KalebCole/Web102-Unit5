import { useEffect, useState } from "react";

import "./App.css";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
// const URL = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=" + API_KEY;

function App() {
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchAllCoinsData = async () => {
      fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY
      )
        .then((response) => response.json())
        .then((data) => {
          setList(data);
        });
      };
      fetchAllCoinsData().catch(console.error);
    }, []);
    
  console.log(list.Data);
  return (
    <>
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <ul>
          {list &&
            Object.entries(list.Data).map(([coin]) =>
              list.Data[coin].PlatformType === "blockchain" ? (
                <li key={list.Data[coin].FullName}>
                  {" "}
                  {list.Data[coin].FullName}{" "}
                </li>
              ) : null
            )}
        </ul>
      </div>
    </>
  );
}

export default App;
