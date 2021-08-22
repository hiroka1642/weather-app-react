import { useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { GeolocationBtn } from "../components/Atoms/btn/GeolocationBtn";
import { GetWeatherFromLatLng } from "../components/Organisms/Fetch/GetWeatherFromLatLng ";
import { GetWeatherFromPlace } from "../components/Organisms/Fetch/GetWeatherFromPlace";
import { Search } from "../components/Organisms/Search/Search";
import { LatLngState } from "../components/store/globalState";

export default function Home() {
  const setLatlngState = useSetRecoilState(LatLngState);
  const [onsearchBtn, setOnSearchBtn] = useState(false);

  // //現在地を取得（緯度、経度）
  const componentDidMount = useCallback(() => {
    setOnSearchBtn(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          setLatlngState({
            latlng: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
          });
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
  }, []);

  //現在地ボタンを押した後の処理
  const handleGeolocationSearch = useCallback(() => {
    componentDidMount();
  }, []);
  console.log("index");

  //DOM操作
  return (
    <div className=" w-96 text-center text-base  space-y-6 text-gray-500 m-auto mt-10">
      {onsearchBtn ? <GetWeatherFromPlace /> : <GetWeatherFromLatLng />}
      <GeolocationBtn onClick={handleGeolocationSearch}>現在地</GeolocationBtn>
      <Search setOnSearchBtn={setOnSearchBtn} />
    </div>
  );
}
