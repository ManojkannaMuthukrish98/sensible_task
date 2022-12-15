import React from "react";
import { FetchQuoteDetailsLoader } from "../loader/FetchQuotesDetailsLoader";
import QuoteDetails from "./QuoteDetails";

const QuoteComponent = () => {
  return (
    <FetchQuoteDetailsLoader
      render={(data, handleSort) => (
        <QuoteDetails quoteDetails={data} handleSort={handleSort} />
      )}
    />
  );
};

export default QuoteComponent;
