import { atom } from "recoil";

export const GlobalState = atom({
  key: "GlobalState",
  default: {
    searchword: "hokkaido",
  },
});

export const LatLngState = atom({
  key: "LatLngState ",
  default: {
    latlng: { lat: null, lng: null },
  },
});
