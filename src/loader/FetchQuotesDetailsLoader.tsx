import { FC, ReactElement } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetQuotesDetails } from "../hooks/fetchingData";
import { useParams } from "react-router";

export const FetchQuoteDetailsLoader: FC<IQuoteDetailsLoaderProps> = ({
  render,
}) => {
  const { symbolName: symbol } = useParams<{ symbolName: string }>();
  const quoteDetailsQuery = useGetQuotesDetails(symbol ? symbol : "");

  if (quoteDetailsQuery.isLoading || quoteDetailsQuery.isIdle) {
    return <CircularProgress color={"primary"} />;
  }

  if (quoteDetailsQuery.isError) {
    return null;
  }

  let data = symbol ? quoteDetailsQuery.data.data.payload[symbol] : [];
  data.sort(function compare(a: IQuoteDetails, b: IQuoteDetails) {
    var dateA = new Date(a.valid_till);
    var dateB = new Date(b.valid_till);
    return dateA.getTime() - dateB.getTime();
  });

  const handleSort = (sort: string) => {
    if (sort === "asc") {
      data.sort(function compare(a: IQuoteDetails, b: IQuoteDetails) {
        var dateA = new Date(a.time);
        var dateB = new Date(b.time);
        return dateA.getTime() - dateB.getTime();
      });
    } else {
      data.sort(function compare(a: IQuoteDetails, b: IQuoteDetails) {
        var dateA = new Date(a.time);
        var dateB = new Date(b.time);
        return dateB.getTime() - dateA.getTime();
      });
    }
  };
  return render(data, handleSort);
};

interface IQuoteDetailsLoaderProps {
  render: (
    quoteData: IQuoteDetails[],
    handleSort: (sort: string) => void
  ) => ReactElement;
}

export interface IQuoteDetails {
  price: number;
  time: string;
  valid_till: string;
}
