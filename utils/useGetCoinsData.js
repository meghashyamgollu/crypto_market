import axios from "axios";
import useSWR from "swr";

function useGetCoinsData(url, params) {
  // params = { ...params, curDate: new Date().getTime() };
  // uncomment ^ to see the effect of the cache
  const searchParams = new URLSearchParams(params);
  console.log(searchParams);
  searchParams.sort();
  const queryString = searchParams.toString();
  const { data: coinsData, error } = useSWR(`${url}/?${queryString}`, fetcher, {
    refreshInterval: 5000,
  });

  return {
    loading: !error && !coinsData,
    coinsData,
    error,
  };
}

const fetcher = async (url, params) => {
  let resp = await axios.get(url, { params: { ...params } });
  return resp.data;
};

export default useGetCoinsData;
