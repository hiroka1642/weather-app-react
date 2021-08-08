export const Announce = (props) => {
  if (
    props.data.list[0].pop <= 0.2 &&
    props.data.list[1].pop <= 0.2 &&
    props.data.list[2].pop <= 0.2
  ) {
    return "傘はいりません";
  } else if (
    props.data.list[0].pop <= 0.5 &&
    props.data.list[1].pop <= 0.5 &&
    props.data.list[2].pop <= 0.5
  ) {
    return "折り畳み傘を持っていこう";
  } else {
    return "傘を忘れずに！";
  }
};
