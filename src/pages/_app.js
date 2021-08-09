import "tailwindcss/tailwind.css";

function MyApp(props) {
  return <props.Component {...props.pageProps} />;
}

export default MyApp;
