import { FC, useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import TableView from "./TableView";
import Loading from "./Loading";

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

const View: FC<CoinsData> = ({ coinsData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [coins, setCoins] = useState<CoinData[]>([...coinsData]);
  const [order, setOrder] = useState<string>("_desc");
  const [orderby, setOrderby] = useState<string>("market_cap");
  const [queryP, setQueryP] = useState<QueryParams>({
    vs_currency: "usd",
    order: `${orderby}${order}`,
    per_page: 10,
    page: 1,
    sparkline: false,
  });

  useEffect(() => {
    if (!coins.length) {
      getCoinData(queryP);
    }
  }, [queryP]);

  const getCoinData = (queryP: QueryParams) => {
    axios
    .get(`https://api.coingecko.com/api/v3/coins/markets`, {
      params: {
        ...queryP,
      },
    })
    .then((res) => {
      console.log(queryP);
      setLoading(false);
      setCoins(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("EUSE->");
  }

  // console.log(coins);
  const handleParams = (ind: keyof QueryParams, value: any): void => {
    setLoading(true);
    setCoins([]);
    setQueryP({ ...queryP, [ind]: value });
  };
  return (
    <div>
      <div className={styles.filters_div}>
        <select
          value={queryP.vs_currency}
          name="vs_currency"
          id="vs_currency"
          onChange={(e) => handleParams("vs_currency", e.target.value)}
        >
          <option value="inr">INR</option>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="jpy">JPY</option>
        </select>
        <select
          name="sort_order"
          id="sort_order"
          value={order}
          onChange={(e) => {
            setOrder(e.target.value);
            handleParams("order", `${orderby}${e.target.value}`);
          }}
        >
          <option value="_asc">Ascending</option>
          <option value="_desc">Descending</option>
        </select>
        <select
          name="sort_by"
          id="sort_by"
          value={orderby}
          onChange={(e) => {
            setOrderby(e.target.value);
            handleParams("order", `${e.target.value}${order}`);
          }}
        >
          <option value="id">Alpabetical</option>
          <option value="volume">Volume</option>
          <option value="market_cap">Market Cap</option>
          <option value="price_change_24h">24 hr Change</option>
        </select>
      </div>
      <div>
        {loading ? <Loading/> : <TableView coins={coins} queryP={queryP} />}
      </div>
      <div className={styles.pagination_div}>
        <div className={styles.pages_div}>
          <button
            disabled={queryP.page <= 1}
            onClick={() => {
              handleParams("page", queryP.page - 1);
            }}
          >
            Prev
          </button>
          {queryP.page}
          <button onClick={() => handleParams("page", queryP.page + 1)}>
            Next
          </button>
        </div>
        <div className={styles.perpage_div}></div>
        <select
          value={queryP.per_page}
          name="per_page"
          id="per_page"
          onChange={(e) => handleParams("per_page", Number(e.target.value))}
        >
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
        </select>
      </div>
    </div>
  );
};

export default View;
