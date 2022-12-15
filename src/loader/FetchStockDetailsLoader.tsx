import type { FC, ReactElement } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetStockDetails } from "../hooks/fetchingData";

export const FetchStockDetailsLoader: FC<IStockDetailsLoaderProps> = ({
  render,
}) => {
  const stockDetailsQuery = useGetStockDetails();

  if (stockDetailsQuery.isLoading || stockDetailsQuery.isIdle) {
    return <CircularProgress color={"primary"} />;
  }

  if (stockDetailsQuery.isError) {
    return null;
  }

  let arr = stockDetailsQuery.data.data.split("\n");
  var jsonObj: IStockDetails[] = [];
  var headers = arr[0].split(",");
  for (var i = 1; i < arr.length; i++) {
    var data = arr[i].split(",");
    var obj: any = {};
    for (var j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = data[j].trim();
    }
    let value = {
      symbol: obj["Symbol"],
      name: obj["Name"],
      sector: obj["Sector"],
      validTill: obj["Validtill"],
    };
    jsonObj.push(value);
  }

  return render(jsonObj);
};

interface IStockDetailsLoaderProps {
  render: (stockData: IStockDetails[]) => ReactElement;
}

export interface IStockDetails {
  symbol: string;
  name: string;
  sector: string;
  validTill: string;
}
