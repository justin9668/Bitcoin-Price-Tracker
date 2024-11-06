export interface Bitcoin {
    time: {
        updated: string;
    };
    chartName: string;
    bpi: {
        USD: {
            rate: string;
        }
    }
}