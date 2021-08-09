import { useCallback } from "react";
import { WeatherTable } from "./WeatherTable.jsx";
import { Announce } from "./Announce.jsx";

export const WeatherData = (props) => {
  const showWeatherNews = useCallback((data) => {
    if (data === undefined) {
      return;
    } else {
      // //天気の詳細表示
      // //画像表示
      switch (data.list[0].weather[0].main) {
        case "Clear":
          //パスを確認する！！！
          return { weather: "晴れ", icon: "/weather1.png" };
        case "Clouds":
          return { weather: "曇り", icon: "/weather2.png" };

        case "Rain":
          return { weather: "雨", icon: "/weather3.png" };
        case "Snow":
          return { weather: "雪", icon: "/weather4.png" };

        default:
          break;
      }
    }
  }, []);

  //DOM操作
  return (
    <div className="w-96 text-center text-base space-y-6 text-gray-500 m-auto mt-20">
      <h1 className="text-2xl p-6 font-bold">
        {props.data && <Announce data={props.data} />}
      </h1>
      <p>今日の天気</p>
      <p>{props.data ? props.data.city.name : null}</p>
      <div>
        <figure className="h-40 ">
          {props.data ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={showWeatherNews(props.data).icon}
              alt="天気"
              className="w-40 m-auto"
            />
          ) : null}
        </figure>
      </div>
      <table border="0" className="m-auto text-left">
        <tbody className="h-24">
          {props.data ? (
            <WeatherTable
              title={showWeatherNews(props.data).weather}
              temperature={`${Math.floor(
                props.data.list[0].main.temp - 273.15
              )}℃`}
              pop={`${Math.floor(props.data.list[0].pop * 100)}％`}
            />
          ) : null}
        </tbody>
      </table>
    </div>
  );
};
