import { atom } from "recoil";

export const GlobalState = atom({
  key: "GlobalState",
  default: {
    searchword: "hokkaido",
  },
});
