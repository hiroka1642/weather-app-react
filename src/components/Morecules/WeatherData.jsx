import { memo, useCallback } from "react";
import { WeatherTable } from "../Atoms/WeatherTable.jsx";
import { Announce } from "../Atoms/Announce.jsx";
import Example from "../Atoms/LoadingIcon.jsx";

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
    return (
      <div className="w-25 ma2 h-96 p-14 items-center justify-center flex flex-column flex-wrap`">
        <p>エラーが発生したため、天気情報を読み込めませんでした</p>
      </div>
    );
  }

  if (props.data.cod === "404") {
    return (
      <div className="w-25 ma2 h-96 p-14 items-center justify-center flex flex-column flex-wrap`">
        <p>天気情報が見つかりませんでした</p>
      </div>
    );
  }

  //DOM操作
  return (
    <>
      <h1 className="text-2xl p-6 font-bold">
        <Announce data={props.data} />
      </h1>
      <p>今日の天気</p>
      <p>{props.data.city.name}</p>
      <div>
        <figure className="h-40 ">
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={showWeatherNews(props.data).icon}
              alt="天気"
              className="w-40 m-auto"
            />
          }
        </figure>
      </div>
      <WeatherTable
        data={props.data}
        weather={showWeatherNews(props.data).weather}
      />
    </>
  );
});
