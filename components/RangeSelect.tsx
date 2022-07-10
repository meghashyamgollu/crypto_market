import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import styles from "../styles/reactTable.module.css";
import { FilterProps } from "./CoinsDataTable";

function valuetext(value: number) {
  return `${value}°C`;
}

interface Props {
  filterProps: FilterProps;
  handleFilterChange: (filterBy: string) => void;
  handleFiltering: (value: number[]) => void;
}

// const minDistance = 1000;

export default function RangeSelector({
  filterProps,
  handleFilterChange,
  handleFiltering,
}: Props) {
  const { filterBy, min, max, step, minDistance, units } = filterProps;
  const [value1, setValue1] = useState<number[]>([
    min + 2 * step,
    max - 2 * step,
  ]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <div className={styles.filter_main_div}>
      <div className={styles.filter_select_div}>
        <select
          name="filterby"
          id="filterby"
          value={filterBy}
          onChange={(e) => {
            handleFilterChange(e.target.value);
          }}
        >
          <option value="">Choose Filter</option>
          <option value="current_price">Price</option>
          <option value="price_change_percentage_24h">
            Price change percentage in 24 hrs
          </option>
          <option value="price_change_24h">
            Price Change in last 24 hours
          </option>
        </select>
        <h3>
          <i>{units}</i>
        </h3>
      </div>
      {filterBy === "id" ? null : (
        <div className={styles.range_main}>
          <Box
            sx={{
              width: 800,
              backgroundColor: "white",
              borderRadius: "20px 0px 0px 20px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <Slider
              sx={{
                color: "red",
                fontSize: "15px",
              }}
              getAriaLabel={() => "Minimum distance"}
              value={value1}
              onChange={handleChange}
              valueLabelDisplay="on"
              getAriaValueText={valuetext}
              disableSwap
              max={max}
              min={min}
              step={step}
              marks={true}
            />
          </Box>
          <button
            onClick={(e) => {
              handleFiltering(value1);
              console.log(value1);
            }}
          >
            Filter
          </button>
        </div>
      )}
    </div>
  );
}

// const ThumbComponent = (props: any) => {
//     return(
//         <div>▲</div>
//     )
// }
