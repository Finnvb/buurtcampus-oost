import classes from "../styles/error.module.css";

function NotFoundPage() {
  return (
    <>
      <main className={classes.container}>
        <h1>
          404
          <br /> <br />
          Pagina niet gevonden!
        </h1>
        <img src="/404.svg" alt="404-img" />
      </main>
    </>
  );
}

export default NotFoundPage;
