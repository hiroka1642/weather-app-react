import { memo, useCallback } from "react";
import { WeatherTable } from "./WeatherTable.jsx";
import { Announce } from "./Announce.jsx";
import Example from "./Loading.jsx";

// eslint-disable-next-line react/display-name
export const WeatherData =memo( (props) => {
  const showWeatherNews = useCallback((data) => {
    if (data === undefined) {
      return;
    } else {
      switch (data.list[0].weather[0].main) {
        case "Clear":
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

  if (!props.error && !props.data) {
    return (
      <div className="w-25 ma2 h-96 items-center justify-center flex flex-column flex-wrap`">
        <Example />
      </div>
    );
  }

  if (props.error) {
    return <div>エラーが発生したため、天気情報を読み込めませんでした</div>;
  }

  if (props.data.length === 0) {
    return <div>データが見つかりませんでした。</div>;
  }

  //DOM操作
  return (
    <>
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
      <WeatherTable data={props.data} showWeatherNews={showWeatherNews} />
    </>
  );
});
