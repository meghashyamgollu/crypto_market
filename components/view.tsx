import { FC, useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import TableView from "./TableView";
import Loading from "./Loading";
import useGetCoinsData from "../utils/useGetCoinsData";
import Price from "./LineChart";
import Search from "./SearchTable";

const url: string = "https://api.coingecko.com/api/v3/coins/markets";

const queryParams: QueryParams = {
  vs_currency: "usd",
  order: "market_cap_desc",
  per_page: 10,
  page: 1,
  sparkline: false,
};

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  roi: any;
  last_updated: Date;
  sparkline_in_7d: any;
}

export type QueryParams = {
  vs_currency: string;
  order: string;
  per_page: number;
  page: number;
  sparkline: boolean;
};

export interface CoinsData {
  coinsData: CoinData[];
}

const View: FC = () => {
  const [sort, setSort] = useState<string>("market_cap_desc");
  const [queryP, setQueryP] = useState<QueryParams>({
    vs_currency: "usd",
    order: sort,
    per_page: 10,
    page: 1,
    sparkline: true,
  });
  const { coinsData, error, loading } = useGetCoinsData(url, queryP);

  const handleParams = (ind: keyof QueryParams, value: any): void => {
    setQueryP({ ...queryP, [ind]: value });
  };

  return (
    <div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <TableView
            handleParams={handleParams}
            coins={coinsData}
            queryP={queryP}
          />
        )}
      </div>
      <div className={styles.pagination_div}>
        <div>
          <select
            className={styles.perpage_select}
            name="vs_currency"
            id="vs_currency"
            onChange={(e) => handleParams("vs_currency", e.target.value)}
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
            <option value="jpy">JPY</option>
          </select>
        </div>
        <div className={styles.pages_div}>
          <button
            className={styles.paginate_buttons}
            disabled={queryP.page <= 1}
            onClick={() => {
              handleParams("page", queryP.page - 1);
            }}
          >
            Prev
          </button>
          <b>{queryP.page}</b>
          <button
            className={styles.paginate_buttons}
            onClick={() => handleParams("page", queryP.page + 1)}
          >
            Next
          </button>
        </div>
        <div className={styles.perpage_div}>
          <select
            className={styles.perpage_select}
            value={queryP.per_page}
            name="per_page"
            id="per_page"
            onChange={(e) => handleParams("per_page", Number(e.target.value))}
          >
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default View;
