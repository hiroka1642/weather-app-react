import useSWR from "swr";

export const GetWeatherFromPlace = (place) => {
  const { data: towndata, error: placeerror } = useSWR(
    place
      ? `https://api.openweathermap.org/data/2.5/forecast?q=${place}&id=524901&lang=ja&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      : null
  );
  return { towndata, placeerror };
};
