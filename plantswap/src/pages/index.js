import NavBar from "components/NavBar";

import classes from "../styles/homepage.module.css";
function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <img src="/hero-image.jpg" className={classes.backgroundImg} />
      </main>
    </>
  );
}

export default HomePage;
