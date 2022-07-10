import styles from "../styles/reactTable.module.css";
import Image from "next/image";
import { FC, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import RangeSelector from "./RangeSelect";
import { CoinData } from "./view";
import Search from "./SearchTable";
import Fuse from "fuse.js";

type Props = { coinsData: CoinData[] };

export type FilterProps = {
  filterBy: keyof CoinData;
  min: number;
  max: number;
  step: number;
  minDistance: number;
  units: string;
};

const priceFilter: FilterProps = {
  filterBy: "current_price",
  min: 0,
  max: 25000,
  step: 100,
  minDistance: 500,
  units: "USD",
};

const priceChangeFilter: FilterProps = {
  filterBy: "price_change_24h",
  min: -2000,
  max: 2000,
  step: 50,
  minDistance: 100,
  units: "USD",
};

const priceChangePercFilter: FilterProps = {
  filterBy: "price_change_percentage_24h",
  min: -30,
  max: 30,
  step: 1,
  minDistance: 5,
  units: " % ",
};

const readableNum = (num: number, fixed: number) => {
  return Number(num.toFixed(fixed));
};

const CoinsDataTable: FC<Props> = ({ coinsData }) => {
  // const [searchText, setSearchText] = useState<string>("");
  const [coins, setCoins] = useState<CoinData[]>([...coinsData]);
  const [filterProps, setFilterProps] = useState<FilterProps>({
    filterBy: "id",
    min: 0,
    max: 25000,
    step: 100,
    minDistance: 1000,
    units: "   ",
  });

  const handleFiltering = (value: number[]) => {
    const filteredCoins = coinsData.filter((coin) => {
      const coinValue: number = coin[filterProps.filterBy];
      return coinValue >= value[0] && coinValue <= value[1];
    });
    console.log(filteredCoins);
    setCoins([...filteredCoins]);
  };

  const handleFilterChange = (filterBy: string) => {
    switch (filterBy) {
      case "current_price":
        setFilterProps(priceFilter);
        return;
      case "price_change_24h":
        setFilterProps(priceChangeFilter);
        return;
      case "price_change_percentage_24h":
        setFilterProps(priceChangePercFilter);
        return;
      default:
        setFilterProps({
          filterBy: "id",
          min: 0,
          max: 25000,
          step: 100,
          minDistance: 1000,
          units: "   ",
        });
        setCoins([...coinsData]);
        break;
    }
  };

  const handleSearch = (searchText: string) => {
    const newFuse = new Fuse(coinsData, {
      keys: ["name", "symbol"],
      shouldSort: true,
      threshold: 0.6,
    });
    const result = newFuse.search(searchText);
    let newCoins: CoinData[] = [];
    result.forEach((coin) => {
      newCoins.push(coin.item);
    });
    setCoins([...newCoins]);
  };

  const columns: TableColumn<CoinData | any>[] = [
    {
      name: "Logo",
      selector: (coin) => (
        <Image src={coin.image} alt={coin.image} width={40} height={40} />
      ),
    },
    {
      name: "Symbol",
      selector: (coin) => coin.symbol.toUpperCase(),
    },
    {
      name: "Name",
      selector: (coin) => coin.name,
      sortable: true,
    },
    {
      name: `Price (USD)`,
      selector: (coin) => readableNum(coin.current_price, 2),
      sortable: true,
    },

    {
      name: "Market Cap (USD)",
      selector: (coin) => coin.market_cap,
      sortable: true,
    },
    {
      name: "24 hr Change (USD)",
      selector: (coin) => readableNum(coin.price_change_24h, 2),
      sortable: true,
    },
    {
      name: "24 hr % Change",
      selector: (coin) => readableNum(coin.price_change_percentage_24h, 4),
      sortable: true,
    },
    {
      name: "24 hr High (USD)",
      selector: (coin) => readableNum(coin.high_24h, 2),
      sortable: true,
    },
    {
      name: "Volume",
      selector: (coin) => coin.total_volume,
      sortable: true,
    },
  ];
  return (
    <div>
      <div className={styles.table_view_header}>
        <RangeSelector
          handleFiltering={handleFiltering}
          handleFilterChange={handleFilterChange}
          filterProps={filterProps}
        />
        <Search handleSearch={handleSearch} />
      </div>
      <div className={styles.test_table}>
        <DataTable columns={columns} data={coins} pagination highlightOnHover />
      </div>
    </div>
  );
};

export default CoinsDataTable;
