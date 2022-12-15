import { FetchStockDetailsLoader } from "../loader/FetchStockDetailsLoader";
import StockDetails from "./StockDetails";

const StockComponent = () => {
  return (
    <FetchStockDetailsLoader
      render={(data) => <StockDetails stockData={data} />}
    />
  );
};

export default StockComponent;
