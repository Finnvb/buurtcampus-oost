import NavBar from "components/NavBar";

import classes from "../styles/homepage.module.css";
function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <div className={classes.bgImage}>
          <h1>Welkom bij Plantswap</h1>
        </div>
      </main>
    </>
  );
}

export default HomePage;
