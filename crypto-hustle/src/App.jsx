import { useEffect, useState } from "react";

import "./App.css";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
// const URL = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=" + API_KEY;

function App() {
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchAllCoinsData = async () => {
      fetch("https://min-api.cryptocompare.com/data/all/coinlist" )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.Data);
          // setList(data);
        });
    };
    fetchAllCoinsData();
  }, []);

  return (
    <>
      <h1>test</h1>
    </>
  );
}

export default App;
