import { memo } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import { LatLngState } from "../../store/globalState";
import { WeatherData } from "../../Morecules/WeatherData";

// eslint-disable-next-line react/display-name
export const GetWeatherFromLatLng = memo(() => {
  const latlngState = useRecoilValue(LatLngState);
  const { data: latlngdata, error: latlngerror } = useSWR(
    latlngState.latlng.lat
      ? `https://api.openweathermap.org/data/2.5/forecast?lat=${latlngState.latlng.lat}&lon=${latlngState.latlng.lng}&id=524901&lang=ja&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      : null
  );

  return <WeatherData data={latlngdata} error={latlngerror} />;
});
