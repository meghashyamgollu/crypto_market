import axios from "axios";
import { FC, useEffect, useState } from "react";
import styles from "../styles/reactTable.module.css";

interface SearchText {
  handleSearch: (searchText: string) => void;
}

const Search: FC<SearchText> = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <div className={styles.search_div}>
      <input
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onKeyDown={(e) => {e.key === "Enter" && handleSearch(searchText)}}
      />
      <button onClick={() => handleSearch(searchText)}>Search</button>
    </div>
  );
};

export default Search;
