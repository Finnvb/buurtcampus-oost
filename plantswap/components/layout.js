import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";
function Layout({ children, title = "Plantswap" }) {
  return (
    <>
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Plantswap is a website for trading plants."
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <NavBar />

        {children}

        <Footer />
      </div>
    </>
  );
}

export default Layout;
