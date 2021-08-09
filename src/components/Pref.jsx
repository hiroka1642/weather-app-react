import { useCallback } from "react";

const PrefectureList = [
  { ja: "北海道", eng: "hokkaido" },
  { ja: "青森", eng: "aomori" },
  { ja: "岩手", eng: "iwate" },
  { ja: "宮城", eng: "miyagi" },
  { ja: "秋田", eng: "akita" },
  { ja: "山形", eng: "yamagata" },
  { ja: "福島", eng: "fukushima-ken" },
  { ja: "茨城", eng: "ibaraki-ken" },
  { ja: "栃木", eng: "tochigi-ken" },
  { ja: "群馬", eng: "gunma" },
  { ja: "埼玉", eng: "saitama" },
  { ja: "千葉", eng: "chiba-ken" },
  { ja: "東京", eng: "tokyo" },
  { ja: "神奈川", eng: "kanagawa" },
  { ja: "新潟", eng: "niigata-ken" },
  { ja: "富山", eng: "toyama-ken" },
  { ja: "石川", eng: "ishikawa" },
  { ja: "福井", eng: "fukui" },
  { ja: "山梨", eng: "yamanashi" },
  { ja: "長野", eng: "nagano" },
  { ja: "岐阜", eng: "gifu" },
  { ja: "静岡", eng: "shizuoka-ken" },
  { ja: "愛知", eng: "aichi" },
  { ja: "三重", eng: "mie" },
  { ja: "滋賀", eng: "shiga" },
  { ja: "京都", eng: "kyoto" },
  { ja: "大阪", eng: "osaka-fu" },
  { ja: "兵庫", eng: "hyogo" },
  { ja: "奈良", eng: "nara-ken" },
  { ja: "和歌山", eng: "wakayama-ken" },
  { ja: "鳥取", eng: "tottori-ken" },
  { ja: "島根", eng: "shimane-ken" },
  { ja: "岡山", eng: "okayama-ken" },
  { ja: "広島", eng: "hirosima-ken" },
  { ja: "山口", eng: "yamaguti-ken" },
  { ja: "徳島", eng: "tokushima-ken" },
  { ja: "香川", eng: "kagawa-ken" },
  { ja: "愛媛", eng: "ehime-ken" },
  { ja: "高知", eng: "kouti" },
  { ja: "福岡", eng: "hukuoka-ken" },
  { ja: "佐賀", eng: "saga-ken" },
  { ja: "長崎", eng: "nagasaki-ken" },
  { ja: "熊本", eng: "kumamoto-ken" },
  { ja: "大分", eng: "Oita Prefecture" },
  { ja: "宮崎", eng: "miyazaki-ken" },
  { ja: "鹿児島", eng: "kagoshima-ken" },
  { ja: "沖縄", eng: "okinawa-ken" },
];

export const PrefList = (props) => {
  const handlePrefectureValue = useCallback(
    (e) => {
      props.setPrefectureValue(e.target.value);
    },
    [props]
  );

  return (
    <>
      <select
        name="prefecture"
        id="prefecture"
        onBlur={handlePrefectureValue}
        onChange={handlePrefectureValue}
        className="g-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-1 border border-blue-400 rounded shadow"
      >
        {PrefectureList.map((list, i) => {
          return (
            <option key={i} value={list.eng}>
              {list.ja}
            </option>
          );
        })}
      </select>
    </>
  );
};
