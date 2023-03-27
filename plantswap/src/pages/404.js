import classes from "../styles/error.module.css";
import Layout from "components/Layout";
function NotFoundPage() {
  return (
    <>
      <Layout>
        <main className={classes.container}>
          <h1>
            404
            <br /> <br />
            Pagina niet gevonden!
          </h1>
          <img src="/404.svg" alt="404-img" />
        </main>
      </Layout>
    </>
  );
}

export default NotFoundPage;
