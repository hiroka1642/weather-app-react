import { useCallback, useEffect, useState } from "react";
import { PrefList } from "../public/src/components/Pref";
import { WeatherTable } from "../public/src/components/WeatherTable";
import React from "react";

export default function Home() {
  //都市名から天気を取得
  const getWeatherFromPlace = useCallback(async (place) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&id=524901&lang=ja&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );
    const weatherlist = await res.json();
    return weatherlist;
  }, []);

  //緯度、経度から天気を取得
  const getWeatherFromLatLng = useCallback(async (lat, lng) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&id=524901&lang=ja&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );
    const weatherlist = await res.json();
    return weatherlist;
  }, []);

  useEffect(() => {
    componentDidMount();
  }, []);

  // //現在地を取得（緯度、経度）し、天気を表示
  const componentDidMount = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          await showWeatherNews(
            getWeatherFromLatLng(pos.coords.latitude, pos.coords.longitude)
          );
        },
        () => {
          window.alert("位置情報の取得に失敗しました");
        }
      );
    } else {
      window.alert("本アプリでは位置情報が使えません");
    }
  }, []);

  //検索ボタンを押した後の処理
  const onClickSearch = () => {
    if (inputvalue === "") {
      showWeatherNews(getWeatherFromPlace(prefecture.value));
    } else {
      showWeatherNews(getWeatherFromPlace(inputvalue));
    }
  };

  //取得した天気情報に合わせてアナウンス表示
  const [news, setNews] = useState("");
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");
  const [temperature, setTemperature] = useState("");
  const [pop, setPop] = useState("");
  const [weathername, setWeatherName] = useState("");
  const [inputvalue, setInputvalue] = useState("");

  const showWeatherNews = async (getWeather) => {
    const weatherlist = await getWeather;
    //降水量に対してアナウンスを表示
    if (
      weatherlist.list[0].pop <= 0.2 &&
      weatherlist.list[1].pop <= 0.2 &&
      weatherlist.list[2].pop <= 0.2
    ) {
      setNews("傘はいりません");
    } else if (
      weatherlist.list[0].pop <= 0.5 &&
      weatherlist.list[1].pop <= 0.5 &&
      weatherlist.list[2].pop <= 0.5
    ) {
      setNews("折り畳み傘を持っていこう");
    } else {
      setNews("傘を忘れずに！");
    }

    //天気の詳細表示
    //画像表示
    switch (weatherlist.list[0].weather[0].main) {
      case "Clear":
        setIcon("src/weather1.png");
        setTitle("晴れ");
        break;
      case "Clouds":
        setIcon("src/weather2.png");
        setTitle("曇り");
        break;
      case "Rain":
        setIcon("src/weather4.png");
        setTitle("雨");
        break;
      case "Snow":
        setIcon("src/weather5.png");
        setTitle("雪");
        break;
      default:
        break;
    }

    //詳細表示
    setWeatherName(`${weatherlist.city.name}`);
    setTemperature(`${Math.floor(weatherlist.list[0].main.temp - 273.15)}℃`);
    setPop(`${Math.floor(weatherlist.list[0].pop * 100)}％`);
  };

  //DOM操作
  return (
    <div className="w-96 text-center text-base space-y-6 text-gray-500 m-auto mt-20">
      <h1 className="text-2xl p-6 font-bold">{news}</h1>
      <p>今日の天気</p>
      <p>{weatherdata.weathername}</p>
      <div>
        <figure className="h-40 ">
          <img src={weatherdata.icon} alt="天気" className="w-40 m-auto" />
        </figure>
      </div>
      <table border="0" className="m-auto text-left">
        <tbody className="h-24">
          <WeatherTable
            title={weatherdata.title}
            temperature={weatherdata.temperature}
            pop={weatherdata.pop}
          />
        </tbody>
      </table>
      <button
        onClick={componentDidMount}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded-full m-3"
      >
        現在地
      </button>
      <div>
        <PrefList />
        <input
          type="text"
          value={inputvalue}
          onChange={(e) => setInputvalue(e.target.value)}
          placeholder="市町村ローマ字入力"
          className="shadow appearance-none border border-blue-400 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:border-none"
        />
        <button
          onClick={onClickSearch}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-5 border border-blue-500 hover:border-transparent rounded"
        >
          検索
        </button>
      </div>
    </div>
  );
}
