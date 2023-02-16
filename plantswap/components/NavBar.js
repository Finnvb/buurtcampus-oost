import classes from "./NavBar.module.css";
import Link from "next/link";

import NavLink from "components/NavLink";
function NavBar() {
  return (
    <>
      <header>
        <nav className={classes.container}>
          <Link href="/">
            <img
              className={classes.logo}
              src="/plantswap-logo.png"
              alt="plantswap-logo"
            />
          </Link>
          <ul className={classes.ulItems}>
            <NavLink title="Onze stekjes" link="overview" />
            <NavLink title="Doneren" link="donate" />
            <NavLink title="Workshops" link="workshops" />
            <NavLink title="Contact" link="contact" />
          </ul>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
