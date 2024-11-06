import { useEffect, useState } from "react";
import styled from "styled-components";

import { Bitcoin } from "../interfaces/Bitcoin";

const Card = styled.div`
    font-family: 'Inter', sans-serif;
    border: 1px solid #E4E4E7;
    border-radius: 10px;
    padding: 20px;
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

const BitcoinIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const Title = styled.h1`
    font-size: 20px;
    color: #09090B;
    font-weight: 500;
`;

const Subtitle = styled.span`
    font-size: 16px;
    color: #71717A;
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
                        <TitleWrapper>
                            <BitcoinIcon src="/bitcoin-logo.png" alt="Bitcoin logo" />
                            <Title>{bitcoin.chartName}</Title>
                            <Subtitle>BTC</Subtitle>
                        </TitleWrapper>
                        <Price>${bitcoin.bpi.USD.rate}</Price>
                        <LastUpdated>Last updated: {elapsedSeconds} seconds ago</LastUpdated>
                    </div>
                )
            }
        </Card>
    );
}