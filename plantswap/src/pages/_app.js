import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import DarkModeToggle from "lib/darkMode";
export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <DarkModeToggle />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
