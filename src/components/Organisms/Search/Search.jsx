import { PrefList } from "../../Atoms/PrefList";
import { Input } from "../../Atoms/input/input";
import { SearchBtn } from "../../Atoms/btn/SearchBtn";
import { memo, useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { GlobalState } from "../../store/globalState";

// eslint-disable-next-line react/display-name
export const Search = memo((props) => {
  const [inputvalue, setInputvalue] = useState("");
  const [prefecturevalue, setPrefectureValue] = useState("hokkaido");
  const setGlobalState = useSetRecoilState(GlobalState);

  //検索ボタンを押した後の処理
  const handleSearch = useCallback(() => {
    props.setOnSearchBtn(true);
    inputvalue === ""
      ? setGlobalState({ searchword: prefecturevalue })
      : setGlobalState({ searchword: inputvalue });
  }, [inputvalue, prefecturevalue]);

  return (
    <div>
      <PrefList
        prefecturevalue={prefecturevalue}
        setPrefectureValue={setPrefectureValue}
      />
      <Input inputvalue={inputvalue} setInputvalue={setInputvalue} />
      <SearchBtn onClick={handleSearch}>検索</SearchBtn>
    </div>
  );
});
