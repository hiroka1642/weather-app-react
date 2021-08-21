import useSWR from "swr";

export const GetWeatherFromLatLng = (lat, lng) => {
  const { data: latlngdata, error: latlngerror } = useSWR(
    lat
      ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&id=524901&lang=ja&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      : null
  );

  return { latlngdata, latlngerror };
};
