import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { WeatherData } from "../components/WeatherData";
import { PrefList } from "../components/Pref";

export default function Home() {
  const [inputvalue, setInputvalue] = useState("");
  const [prefecturevalue, setPrefectureValue] = useState("hokkaido");
  const [latlng, setLatLng] = useState({ lat: "", lng: "" });
  const [word, setWord] = useState("");
  const [count, setCount] = useState(0);

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
    setCount(() => 0);
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

  const { latlngdata } = GetWeatherFromLatLng(latlng.lat, latlng.lng);
  const { towndata } = GetWeatherFromPlace(word);

  useEffect(() => {
    componentDidMount();
  }, [componentDidMount]);

  //検索ボタンを押した後の処理
  const handleSearch = useCallback(() => {
    setCount(() => 1);

    if (inputvalue === "") {
      setWord(() => prefecturevalue);
    } else {
      setWord(() => inputvalue);
    }
  }, [inputvalue, prefecturevalue]);

  const handleSetInputValue = useCallback((e) => {
    setInputvalue(e.target.value);
  }, []);

  //DOM操作
  return (
    <div className="w-96 text-center text-base space-y-6 text-gray-500 m-auto mt-20">
      <WeatherData data={count === 1 ? towndata : latlngdata} />
      <button
        // eslint-disable-next-line react/jsx-handler-names
        onClick={componentDidMount}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded-full m-3"
      >
        現在地
      </button>
      <div>
        <PrefList prefecturevalue setPrefectureValue={setPrefectureValue} />
        <input
          type="text"
          value={inputvalue}
          onChange={handleSetInputValue}
          placeholder="市町村ローマ字入力"
          className="shadow appearance-none border border-blue-400 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:border-none"
        />
        <button
          onClick={handleSearch}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-5 border border-blue-500 hover:border-transparent rounded"
        >
          検索
        </button>
      </div>
    </div>
  );
}
