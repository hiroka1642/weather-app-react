import { memo } from "react";

// eslint-disable-next-line react/display-name
export const GeolocationBtn = memo((props) => {
  return (
    <button
      onClick={props.onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded-full m-3"
    >
      {props.children}
    </button>
  );
});
