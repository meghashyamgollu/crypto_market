import { FC, useState } from "react";
import { CoinData, QueryParams } from "./view";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import LineChart from "./LineChart";

interface Coins {
  coins: CoinData[];
  queryP: QueryParams;
  handleParams: (ind: keyof QueryParams, value: any) => void;
}

const TableView: FC<Coins> = ({ coins, queryP, handleParams }) => {
  let dollarUSLocale = Intl.NumberFormat("en-US");
  return (
    <div className={styles.table_div}>
      <table className={styles.table_main}>
        <thead className={styles.table_head}>
          <tr>
            <th>Logo</th>
            <th>Symbol</th>
            <th
              onClick={() => {
                queryP.order.slice(-3) === "asc"
                  ? handleParams("order", "id_desc")
                  : handleParams("order", "id_asc");
              }}
            >
              Name{" "}
              <span>
                {queryP.order === "id_desc"
                  ? " ▼"
                  : queryP.order === "id_asc"
                  ? " ▲"
                  : ""}
              </span>
            </th>
            <th>Price ({queryP.vs_currency.toUpperCase()})</th>
            <th
              onClick={() => {
                queryP.order.slice(-3) === "asc"
                  ? handleParams("order", "market_cap_desc")
                  : handleParams("order", "market_cap_asc");
              }}
            >
              Market Cap ({queryP.vs_currency.toUpperCase()})
              <span>
                {queryP.order === "market_cap_desc"
                  ? " ▼"
                  : queryP.order === "market_cap_asc"
                  ? " ▲"
                  : ""}
              </span>
            </th>
            <th>24 hr Change ({queryP.vs_currency.toUpperCase()})</th>
            <th>24 hr High ({queryP.vs_currency.toUpperCase()})</th>
            <th
              onClick={() => {
                queryP.order.slice(-3) === "asc"
                  ? handleParams("order", "volume_desc")
                  : handleParams("order", "volume_asc");
              }}
            >
              Volume (Units)
              <span>
                {queryP.order === "volume_desc"
                  ? " ▼"
                  : queryP.order === "volume_asc"
                  ? " ▲"
                  : ""}
              </span>
            </th>
            {/* <th>Price trend ({queryP.vs_currency.toUpperCase()})</th> */}
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          {coins &&
            coins.map((coin) => {
              return (
                <tr key={coin.id}>
                  <td>
                    <Image
                      width={40}
                      height={40}
                      src={coin.image}
                      alt={coin.symbol}
                    />
                  </td>
                  <td>{coin.symbol.toUpperCase()}</td>
                  <td>{coin.name}</td>
                  <td
                    style={
                      coin.price_change_24h > 0
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    {coin.price_change_24h > 0 ? "▲  " : "▼  "}
                    {dollarUSLocale.format(
                      Number(coin.current_price?.toFixed(4))
                    ) || null}
                  </td>
                  <td>{dollarUSLocale.format(coin.market_cap)}</td>
                  <td
                    style={
                      coin.price_change_24h > 0
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    {coin.price_change_24h
                      ? dollarUSLocale.format(
                          Number(coin.price_change_24h.toFixed(4))
                        )
                      : null}({coin.price_change_percentage_24h?.toFixed(2)}%)
                  </td>
                  <td>
                    {coin.high_24h
                      ? dollarUSLocale.format(Number(coin.high_24h.toFixed(2)))
                      : null}
                  </td>
                  <td>{dollarUSLocale.format(coin.total_volume)}</td>
                  {/* <td><LineChart priceArray={coin.sparkline_in_7d.price}/></td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
