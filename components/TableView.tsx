import { FC } from "react"
import { CoinData, QueryParams } from "./view"
import Image from "next/image";
import styles from "../styles/Home.module.css"

interface Coins {
    coins: CoinData[],
    queryP: QueryParams
}

const TableView: FC <Coins> = ({coins, queryP}) => {
    return(
        <div className={styles.table_div}>
            <table>
                <thead className={styles.table_head}>
                    <tr>
                        <th>Logo</th>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Price ({queryP.vs_currency.toUpperCase()})</th>
                        <th>Market Cap</th>
                        <th>24 hr Change</th>
                        <th>24 hr High</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin) => {return(
                        <tr key={coin.id}>
                            <td><Image width={50} height={50} src={coin.image} alt={coin.symbol}/></td>
                            <td>{coin.symbol.toUpperCase()}</td>
                            <td>{coin.name}</td>
                            <td>{coin.current_price}</td>
                            <td>{coin.market_cap}</td>
                            <td style={coin.price_change_24h > 0 ? {color: "green"} : {color: "red"}}>{coin.price_change_24h}</td>
                            <td>{coin.high_24h}</td>
                            <td>{coin.total_volume}</td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
    )
}

export default TableView