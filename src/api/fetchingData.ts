import axios, { AxiosResponse } from "axios";

export const getStockDetails = (): Promise<AxiosResponse<any, any>> => {
  return axios.get("https://prototype.sbulltech.com/api/v2/instruments");
};

export const getQuotesDetails = (
  symbol: string
): Promise<AxiosResponse<any, any>> => {
  return axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`);
};
