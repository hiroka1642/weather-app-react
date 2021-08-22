import { memo } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import { GlobalState } from "../store/globalState";
import { WeatherData } from "../WeatherData";

// eslint-disable-next-line react/display-name
export const GetWeatherFromPlace = memo(() => {
  const globalState = useRecoilValue(GlobalState);
  const { data: towndata, error: placeerror } = useSWR(
    globalState.searchword
      ? `https://api.openweathermap.org/data/2.5/forecast?q=${globalState.searchword}&id=524901&lang=ja&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      : null
  );
  return <WeatherData data={towndata} error={placeerror} />;
});
