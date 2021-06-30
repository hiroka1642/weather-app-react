import classes from "./index.module.css";
import config from "./config.js";
import { useEffect, useState } from "react";
import { PrefList } from "../public/src/components/PrefList";
import { WeatherTable } from "../public/src/components/WeatherTable/WeatherTable";

export default function Home() {
  //都市名から天気を取得
  async function getWeatherList(place) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&id=524901&lang=ja&appid=${config.MyId}`
    );
    const weatherlist = await res.json();
    return weatherlist;
  }

  //緯度、経度から天気を取得
  async function getCurrentWeatherList(thislat, thislon) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${thislat}&lon=${thislon}&id=524901&lang=ja&appid=${config.MyId}`
    );
    const weatherlist = await res.json();
    return weatherlist;
  }

  useEffect(() => {
    componentDidMount();
  }, []);

  // //現在地を取得（緯度、経度）し、天気を表示
  function componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async function (pos) {
          await showWeatherNews(
            getCurrentWeatherList(pos.coords.latitude, pos.coords.longitude)
          );
        },
        function () {
          window.alert("位置情報の取得に失敗しました");
        }
      );
    } else {
      window.alert("本アプリでは位置情報が使えません");
    }
  }

  //検索ボタンを押した後の処理
  function weatherlistserch() {
    if (inputvalue === "") {
      showWeatherNews(getWeatherList(prefecture.value));
    } else {
      showWeatherNews(getWeatherList(inputvalue));
    }
  }

  //取得した天気情報に合わせてアナウンス表示
  const [news, setNews] = useState("");
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");
  const [temperature, setTemperature] = useState("");
  const [pop, setPop] = useState("");
  const [weathername, setWeatherName] = useState("");
  const [inputvalue, setInputvalue] = useState("");

  async function showWeatherNews(getWeather) {
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
  }

  //DOM操作
  return (
    <div className={classes.container}>
      <h1 className={classes.comment}>{news}</h1>
      <p className={classes.title}>今日の天気</p>
      <p className={classes.prefectureName}>{weathername}</p>
      <div>
        <figure>
          <img src={icon} alt="天気" className={classes.icon} />
        </figure>
      </div>
      <table border="0" className={classes.table}>
        <tbody>
          <WeatherTable text="天気" answer={title} />
          <WeatherTable text="気温" answer={temperature}/>
          <WeatherTable text="降水確率" answer={pop} />
        </tbody>
      </table>
      <button className={classes.currentLocation} onClick={componentDidMount}>
        現在地
      </button>
      <div>
        <PrefList />
        <input
          type="text"
          className={classes.city}
          value={inputvalue}
          onChange={(e) => setInputvalue(e.target.value)}
          placeholder="市町村ローマ字入力"
        />
        <button className={classes.serch} onClick={weatherlistserch}>
          検索
        </button>
      </div>
    </div>
  );
}
