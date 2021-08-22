import { memo, useCallback } from "react";

// eslint-disable-next-line react/display-name
export const Input = memo((props) => {
  const handleSetInputValue = useCallback(
    (e) => {
      props.setInputvalue(() => e.target.value);
    },
    []
  );

  return (
    <input
      type="text"
      value={props.inputvalue}
      onChange={handleSetInputValue}
      placeholder="市町村ローマ字入力"
      className="shadow appearance-none border border-blue-400 rounded w-44 py-2 px-3 text-gray-700 mb-3 leading-tight focus:border-none"
    />
  );
});
