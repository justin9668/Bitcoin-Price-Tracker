import { useEffect, useState } from 'react';
import styled from "styled-components";

import PriceTracker from "./components/PriceTracker";
import { Bitcoin } from "./interfaces/Bitcoin";

const ParentDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function App() {
  const [data, setData] = useState<Bitcoin[]>([]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const rawData = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
      const data: Bitcoin = await rawData.json();
      setData([data]);
    }
    fetchData()
      .then(() => console.log("Data fetched successfully"))
      .catch((e: Error) => console.log("There was the error: " + e));

    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, []);

  return (
    <ParentDiv>
      <PriceTracker data={data}/>
    </ParentDiv>
  )
}