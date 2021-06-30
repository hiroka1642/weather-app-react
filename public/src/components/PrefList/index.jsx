import classes from "./pref.module.css";
const PrefectureList = [
  { pref: "北海道", prefeng: "hokkaido" },
  { pref: "青森", prefeng: "aomori" },
  { pref: "岩手", prefeng: "iwate" },
  { pref: "宮城", prefeng: "miyagi" },
  { pref: "秋田", prefenf: "akita" },
  { pref: "山形", prefeng: "yamagata" },
  { pref: "福島", prefeng: "fukushima-ken" },
  { pref: "茨城", prefeng: "ibaraki-ken" },
  { pref: "栃木", prefeng: "tochigi-ken" },
  { pref: "群馬", prefeng: "gunma" },
  { pref: "埼玉", prefeng: "saitama" },
  { pref: "千葉", prefeng: "chiba-ken" },
  { pref: "東京", prefeng: "tokyo" },
  { pref: "神奈川", prefeng: "kanagawa" },
  { pref: "新潟", prefeng: "niigata-ken" },
  { pref: "富山", prefeng: "toyama-ken" },
  { pref: "石川", prefeng: "ishikawa" },
  { pref: "福井", prefeng: "fukui" },
  { pref: "山梨", prefeng: "yamanashi" },
  { pref: "長野", prefeng: "nagano" },
  { pref: "岐阜", prefeng: "gifu" },
  { pref: "静岡", prefeng: "shizuoka-ken" },
  { pref: "愛知", prefeng: "aichi" },
  { pref: "三重", prefeng: "mie" },
  { pref: "滋賀", prefeng: "shiga" },
  { pref: "京都", prefeng: "kyoto" },
  { pref: "大阪", prefeng: "osaka-fu" },
  { pref: "兵庫", prefeng: "hyogo" },
  { pref: "奈良", prefeng: "nara-ken" },
  { pref: "和歌山", prefeng: "wakayama-ken" },
  { pref: "鳥取", prefeng: "tottori-ken" },
  { pref: "島根", prefeng: "shimane-ken" },
  { pref: "岡山", prefeng: "okayama-ken" },
  { pref: "広島", prefeng: "hirosima-ken" },
  { pref: "山口", prefeng: "yamaguti-ken" },
  { pref: "徳島", prefeng: "tokushima-ken" },
  { pref: "香川", prefeng: "kagawa-ken" },
  { pref: "愛媛", prefeng: "ehime-ken" },
  { pref: "高知", prefeng: "kouti" },
  { pref: "福岡", prefeng: "hukuoka-ken" },
  { pref: "佐賀", prefeng: "saga-ken" },
  { pref: "長崎", prefeng: "nagasaki-ken" },
  { pref: "熊本", prefeng: "kumamoto-ken" },
  { pref: "大分", prefeng: "Oita Prefecture" },
  { pref: "宮崎", prefeng: "miyazaki-ken" },
  { pref: "鹿児島", prefeng: "kagoshima-ken" },
  { pref: "沖縄", prefeng: "okinawa-ken" },
];

export function PrefList() {
  return (
    <>
      <select name="prefecture" className={classes.prefecture} id="prefecture">
        {PrefectureList.map((list) => {
          return <option value={list.prefeng}>{list.pref}</option>;
        })}
      </select>
    </>
  );
}
