import { memo, useMemo } from "react";

// eslint-disable-next-line react/display-name
export const WeatherTable = memo((props) => {
  const weatherdata = {
    name: props.weather,
    temperature: `${Math.floor(props.data.list[0].main.temp - 273.15)}℃`,
    pop: `${Math.floor(props.data.list[0].pop * 100)}％`,
  };

  const table = useMemo(() => {
    return [
      { title: "天気", name: weatherdata.name },
      { title: "気温", name: weatherdata.temperature },
      { title: "降水確率", name: weatherdata.pop },
    ];
  }, [weatherdata.name, weatherdata.temperature, weatherdata.pop]);

  return (
    <table border="0" className="m-auto text-left">
      <tbody className="h-24">
        {props.data
          ? table.map((items, i) => [
              <tr key={i}>
                <td>{items.title}</td>
                <td>{items.name}</td>
              </tr>,
            ])
          : null}
      </tbody>
    </table>
  );
});
