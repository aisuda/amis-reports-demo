import qs from 'qs';
export declare function fetcher({ url, method, data, config, headers }: any): any;
export declare function updateCsrfToken(token: string): void;
export declare function fetcherCsrfToken(): void;
export declare function fetcherCsrfTokenAsync(): Promise<void>;
export declare function getCsrfToken(): string;
export declare function getPageQuery(): qs.ParsedQs;
