import { memo } from "react";
import useSWR from "swr";
import { WeatherData } from "../WeatherData";

// eslint-disable-next-line react/display-name
export const GetWeatherFromPlace = memo((props) => {
  console.log(props);

  const { data: towndata, error: placeerror } = useSWR(
    props.place
      ? `https://api.openweathermap.org/data/2.5/forecast?q=${props.place}&id=524901&lang=ja&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      : null
  );
  return <WeatherData data={towndata} error={placeerror} />;
});
