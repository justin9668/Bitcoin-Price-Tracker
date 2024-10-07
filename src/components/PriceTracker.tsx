import { useEffect, useState } from "react";
import styled from "styled-components";

import { Bitcoin } from "../interfaces/Bitcoin";

const Card = styled.div`
    font-family: 'Inter', sans-serif;
    border: 1px solid #E4E4E7;
    border-radius: 10px;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #09090B;
    margin-bottom: 10px;
`;

const Subtitle = styled.p`
    font-size: 14px;
    color: #71717A;
    margin-bottom: 20px;
`;

const Price = styled.p`
    font-size: 48px;
    font-weight: bold;
    color: #09090B;
    margin: 20px 0;
`;

const LastUpdated = styled.p`
    font-size: 14px;
    color: #71717A;
`;

export default function PriceTracker(props: {data: Bitcoin[]}) {
    const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
    const [lastFetchedData, setLastFetchedData] = useState<Bitcoin[] | null>(null);

    useEffect(() => {
        const dataChange = JSON.stringify(lastFetchedData) !== JSON.stringify(props.data);

        if (dataChange) {
            setElapsedSeconds(0);
            setLastFetchedData(props.data);
        }

        const interval = setInterval(() => {
            setElapsedSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [props.data, lastFetchedData]);

    return (
        <Card>
            {
                props.data.map((bitcoin: Bitcoin) =>
                    <div key={bitcoin.time.updated}>
                        <Title>{bitcoin.chartName} Price Tracker</Title>
                        <Subtitle>Live {bitcoin.chartName} price in {bitcoin.bpi.USD.code}</Subtitle>
                        <Price>${bitcoin.bpi.USD.rate}</Price>
                        <LastUpdated>Last updated: {elapsedSeconds} seconds ago</LastUpdated>
                    </div>
                )
            }
        </Card>
    );
}