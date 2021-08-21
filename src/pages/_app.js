import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";

function MyApp(props) {
  return (
    <RecoilRoot>
      <props.Component {...props.pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
