import axios from "axios";
import { FC } from "react";
import useSWR from "swr";
import CoinsDataTable from "../components/CoinsDataTable";
import Loading from "../components/Loading";
import { CoinData } from "../components/view";
import useGetCoinsTableData from "../utils/useGetCoinTableData";

const Table: FC = () => {
  const { coinsData, error, loading } = useGetCoinsTableData(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );
  return (
    <div>
      {loading ? <Loading /> : <CoinsDataTable coinsData={coinsData} />}
    </div>
  );
};

export default Table;
