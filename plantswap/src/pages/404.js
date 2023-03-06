import classes from "../styles/error.module.css";
import NavBar from "components/NavBar";
import Footer from "components/Footer";

function NotFoundPage() {
  return (
    <>
      <NavBar />
      <main className={classes.container}>
        <h1>
          404
          <br /> <br />
          Pagina niet gevonden!
        </h1>
        <img src="/404.svg" alt="404-img" />
      </main>
      <Footer />
    </>
  );
}

export default NotFoundPage;
