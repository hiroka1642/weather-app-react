import { memo } from "react";
import useSWR from "swr";
import { WeatherData } from "../WeatherData";

// eslint-disable-next-line react/display-name
export const GetWeatherFromLatLng = memo((props) => {
  console.log("componentDidmount");

  const { data: latlngdata, error: latlngerror } = useSWR(
    props.lat
      ? `https://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lng}&id=524901&lang=ja&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      : null
  );

  return <WeatherData data={latlngdata} error={latlngerror} />;
});
