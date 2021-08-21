import { useCallback, useEffect, useState } from "react";
import { PrefList } from "../components/Pref";
import { SearchBtn } from "../components/btn/SearchBtn";
import { GeolocationBtn } from "../components/btn/GeolocationBtn";
import { Input } from "../components/input/input";
import { GetWeatherFromLatLng } from "../components/Fetch/GetWeatherFromLatLng ";
import { GetWeatherFromPlace } from "../components/Fetch/GetWeatherFromPlace";

export default function Home() {
  const [latlng, setLatLng] = useState({ lat: null, lng: null });
  const [inputvalue, setInputvalue] = useState("");
  const [prefecturevalue, setPrefectureValue] = useState("hokkaido");
  const [clickSeatchBtn, setClickSearchBtn] = useState(false);

  // //現在地を取得（緯度、経度）
  const componentDidMount = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          setLatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
          window.alert("位置情報の取得に失敗しました");
        }
      );
    } else {
      window.alert("本アプリでは位置情報が使えません");
    }
  }, []);

  useEffect(() => {
    componentDidMount();
  }, [componentDidMount]);

  //現在地ボタンを押した後の処理
  const handleGeolocationSearch = () => {
    componentDidMount();
    setClickSearchBtn(false);
  };

  //検索ボタンを押した後の処理
  const handleSearch = useCallback(() => {
    setClickSearchBtn(true);
  }, []);

  //DOM操作
  return (
    <div className=" w-96 text-center text-base  space-y-6 text-gray-500 m-auto mt-10">
      {clickSeatchBtn ? (
        <GetWeatherFromPlace
          place={inputvalue === "" ? prefecturevalue : inputvalue}
        />
      ) : (
        <GetWeatherFromLatLng lat={latlng.lat} lng={latlng.lng} />
      )}
      <GeolocationBtn onClick={handleGeolocationSearch}>現在地</GeolocationBtn>
      <PrefList prefecturevalue setPrefectureValue={setPrefectureValue} />
      <Input inputvalue={inputvalue} setInputvalue={setInputvalue} />
      <SearchBtn onClick={handleSearch}>検索</SearchBtn>
    </div>
  );
}
