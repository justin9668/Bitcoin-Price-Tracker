export interface Bitcoin {
    time: {
        updated: string;
    };
    chartName: string;
    bpi: {
        USD: {
            code: string;
            rate: string;

        }
    }
}