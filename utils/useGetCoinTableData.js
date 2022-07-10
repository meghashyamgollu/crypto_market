import axios from "axios";
import useSWR from "swr";

function useGetCoinsTableData(url) {
  const { data: coinsData, error } = useSWR(`${url}`, fetcher, {
    refreshInterval: 5000,
  });

  return {
    loading: !error && !coinsData,
    coinsData,
    error,
  };
}

const fetcher = async (url) => {
  let resp = await axios.get(url);
  return resp.data;
};

export default useGetCoinsTableData;