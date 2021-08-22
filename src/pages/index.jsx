import { useCallback, useEffect, useState } from "react";
import { GeolocationBtn } from "../components/btn/GeolocationBtn";
import { GetWeatherFromLatLng } from "../components/Fetch/GetWeatherFromLatLng ";
import { GetWeatherFromPlace } from "../components/Fetch/GetWeatherFromPlace";
import { Search } from "../components/Search/Search";

export default function Home() {
  const [latlng, setLatLng] = useState({ lat: null, lng: null });
  const [onsearchBtn, setOnSearchBtn] = useState(false);

  // //現在地を取得（緯度、経度）
  const componentDidMount = useCallback(() => {
    setOnSearchBtn(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          setLatLng(() => ({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }));
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
      {onsearchBtn ? (
        <GetWeatherFromPlace />
      ) : (
        <GetWeatherFromLatLng lat={latlng.lat} lng={latlng.lng} />
      )}
      <GeolocationBtn onClick={handleGeolocationSearch}>現在地</GeolocationBtn>
      <Search setOnSearchBtn={setOnSearchBtn} />
    </div>
  );
}
