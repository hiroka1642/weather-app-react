import { useMemo } from "react";

export const WeatherTable = (props) => {
  const table = useMemo(() => {
    return [
      { title: "天気", name: props.title },
      { title: "気温", name: props.temperature },
      { title: "降水確率", name: props.pop },
    ];
  }, []);
  console.log(table);
  return (
    <>
      {table.map((items, i) => [
        <tr key={i}>
          <td>{items.title}</td>
          <td>{items.name}</td>
        </tr>,
      ])}
    </>
  );
};
