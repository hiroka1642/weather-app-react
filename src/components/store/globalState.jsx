import { atom } from "recoil";

export const GlobalState = atom({
  key: "GlobalState",
  default: {
    searchword: "hokkaido",
  },
});

export const OnSearchState = atom({
  key: "OnSearchState",
  default: {
    onSearchBtn: false,
  },
});
