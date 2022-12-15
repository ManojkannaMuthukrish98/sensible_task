import { useQuery, UseQueryResult } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { getQuotesDetails, getStockDetails } from "../api/fetchingData";
import { IQuoteDetails } from "../loader/FetchQuotesDetailsLoader";
import { queryClient } from "../queryClient";

export interface IErrorResponse {
  error?: string | string[];
  errors?: Record<string, string | string[]>;
}

export const useGetStockDetails = (): UseQueryResult<
  AxiosResponse<any, any>,
  AxiosError<IErrorResponse>
> => {
  return useQuery(["stock_details"], () => getStockDetails(), {
    onError(err) {
      console.log("error", err);
    },
  });
};

interface IQuoteResponse {
  payload: Record<string, IQuoteDetails[]>;
  sucess: boolean;
}

export const useGetQuotesDetails = (
  symbol: string
): UseQueryResult<
  AxiosResponse<IQuoteResponse>,
  AxiosError<IErrorResponse>
> => {
  return useQuery(["quotes_details", symbol], () => getQuotesDetails(symbol), {
    onError(err) {
      console.log("error", err);
    },
    keepPreviousData: true,
  });
};

export function queryInvalidation(key: string[]): void {
  key.forEach((k) => queryClient.invalidateQueries([k]));
}
