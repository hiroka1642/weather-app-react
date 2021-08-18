import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { WeatherData } from "../components/WeatherData";
import { PrefList } from "../components/Pref";
import { SearchBtn } from "../components/btn/SearchBtn";
import { GeolocationBtn } from "../components/btn/GeolocationBtn";
import { Input } from "../components/input/input";

export default function Home() {
  const [inputvalue, setInputvalue] = useState("");
  const [prefecturevalue, setPrefectureValue] = useState("hokkaido");
  const [latlng, setLatLng] = useState({ lat: "", lng: "" });
  const [word, setWord] = useState("");
  const [clickSeatch, setClickSearch] = useState(false);

  const GetWeatherFromLatLng = (lat, lng) => {
    const { data: latlngdata, error: latlngerror } = useSWR(
      lat
        ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&id=524901&lang=ja&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        : null
    );

    return { latlngdata, latlngerror };
  };

  const GetWeatherFromPlace = (place) => {
    const { data: towndata, error: placeerror } = useSWR(
      place
        ? `https://api.openweathermap.org/data/2.5/forecast?q=${place}&id=524901&lang=ja&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        : null
    );
    return { towndata, placeerror };
  };

  // //現在地を取得（緯度、経度）し、天気を表示
  const componentDidMount = useCallback(() => {
    setClickSearch(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          setLatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
          window.alert("位置情報の取得に失敗しました");
        }
      );
    } else {
      window.alert("本アプリでは位置情報が使えません");
    }
  }, []);

  const { latlngdata, latlngerror } = GetWeatherFromLatLng(
    latlng.lat,
    latlng.lng
  );
  const { towndata, placeerror } = GetWeatherFromPlace(word);

  useEffect(() => {
    componentDidMount();
  }, [componentDidMount]);

  //検索ボタンを押した後の処理
  const handleSearch = useCallback(() => {
    setClickSearch(true);

    if (inputvalue === "") {
      setWord(() => prefecturevalue);
    } else {
      setWord(() => inputvalue);
    }
  }, [inputvalue, prefecturevalue]);

  //DOM操作
  return (
    <div className=" w-96 text-center text-base  space-y-6 text-gray-500 m-auto mt-10">
      <WeatherData
        data={clickSeatch ? towndata : latlngdata}
        error={clickSeatch ? placeerror : latlngerror}
      />
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <GeolocationBtn onClick={componentDidMount}>現在地</GeolocationBtn>
      <PrefList prefecturevalue setPrefectureValue={setPrefectureValue} />
      <Input inputvalue={inputvalue} setInputvalue={setInputvalue} />
      <SearchBtn onClick={handleSearch}>検索</SearchBtn>
    </div>
  );
}
