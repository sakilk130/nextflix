import "../styles/globals.css";
import type { AppProps } from "next/app";
import Loader from "../components/loader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import magic from "../lib/magic-client";

function MyApp({ Component, pageProps }: AppProps) {
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        setLoading(true);
        const isUser = await magic.user.isLoggedIn();
        console.log(isUser);
        if (isUser) {
          route.push("/");
        } else {
          route.push("/login");
        }
      } catch (error) {
        route.push("/login");
      }
    };
    isLoggedIn();
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(false);
    };
    route.events.on("routeChangeComplete", handleRouteChange);
    route.events.on("routeChangeError", handleRouteChange);
    return () => {
      route.events.off("routeChangeComplete", handleRouteChange);
      route.events.off("routeChangeError", handleRouteChange);
    };
  }, [route]);

  return loading ? <Loader /> : <Component {...pageProps} />;
}

export default MyApp;
