import classes from "./index.module.css";
import config from "./config.js";
import { useState } from "react";

export default function Home() {
  //検索から天気を取得
  async function getWeatherList(place) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&id=524901&lang=ja&appid=${config.MyId}`
    );
    const weatherlist = await res.json();
    return weatherlist;
  }

  //現在地から天気を取得
  async function getCurrentWeatherList(thislat, thislon) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${thislat}&lon=${thislon}&id=524901&lang=ja&appid=${config.MyId}`
    );
    const weatherlist = await res.json();
    return weatherlist;
  }

  // //現在地を取得し、天気を表示

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

  //取得した天気情報に合わせてアナウンス表示
  const [news, setNews] = useState("");
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");
  const [temperature, setTemperature] = useState("");
  const [pop, setPop] = useState("");
  const [weathername, setWeatherName] = useState("");
  const [inputvalue, setInputvalue] = useState("");


  //検索ボタンを押した後の処理

  function Weatherlistserch() {
    if (inputvalue === "") {
      showWeatherNews(getWeatherList(prefecture.value));
    } else {
      showWeatherNews(getWeatherList(inputvalue));
    }
  }

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
          <tr>
            <td>天気</td>
            <td className={classes.weather}>{title}</td>
          </tr>
          <tr>
            <td>気温</td>
            <td className={classes.temperature}>{temperature}</td>
          </tr>
          <tr>
            <td>降水確率</td>
            <td className={classes.pop}>{pop}</td>
          </tr>
        </tbody>
      </table>

      <button className={classes.currentLocation} onClick={componentDidMount}>
        現在地
      </button>

      <div>
        <select
          name="prefecture"
          className={classes.prefecture}
          id="prefecture"
        >
          <option value="hokkaido">北海道</option>
          <option value="aomori">青森</option>
          <option value="iwate">岩手</option>
          <option value="miyagi">宮城</option>
          <option value="akita">秋田</option>
          <option value="yamagata">山形</option>
          <option value="fukushima-ken">福島</option>
          <option value="ibaraki">茨城</option>
          <option value="tochigi-ken">栃木</option>
          <option value="gunma">群馬</option>
          <option value="saitama">埼玉</option>
          <option value="chiba-ken">千葉</option>
          <option value="tokyo">東京</option>
          <option value="kanagawa">神奈川</option>
          <option value="niigata-ken">新潟</option>
          <option value="toyama-ken">富山</option>
          <option value="ishikawa">石川</option>
          <option value="fukui">福井</option>
          <option value="yamanashi">山梨</option>
          <option value="nagano">長野</option>
          <option value="gifu">岐阜</option>
          <option value="shizuoka-ken">静岡</option>
          <option value="aichi">愛知</option>
          <option value="mie">三重</option>
          <option value="shiga">滋賀</option>
          <option value="kyoto">京都</option>
          <option value="osaka-fu">大阪</option>
          <option value="hyogo">兵庫</option>
          <option value="nara-ken">奈良</option>
          <option value="wakayama-ken">和歌山</option>
          <option value="tottori-ken">鳥取</option>
          <option value="shimane-ken">島根</option>
          <option value="okayama-ken">岡山</option>
          <option value="hirosima-ken">広島</option>
          <option value="yamaguti-ken">山口</option>
          <option value="tokushima-ken">徳島</option>
          <option value="kagawa-ken">香川</option>
          <option value="ehime-ken">愛媛</option>
          <option value="kouti">高知</option>
          <option value="hukuoka-ken">福岡</option>
          <option value="saga-ken">佐賀</option>
          <option value="nagasaki-ken">長崎</option>
          <option value="kumamoto-ken">熊本</option>
          <option value="Oita Prefecture">大分</option>
          <option value="miyazaki-ken">宮崎</option>
          <option value="kagoshima-ken">鹿児島</option>
          <option value="okinawa-ken">沖縄</option>
        </select>

        <input
          type="text"
          className={classes.city}
          value={inputvalue}
          onChange={(e) => setInputvalue(e.target.value)}
          placeholder="市町村ローマ字入力"
        />
        <button className={classes.serch} onClick={() => Weatherlistserch()}>
          検索
        </button>
      </div>

      <script src="js/index.js"></script>
    </div>
  );
}
