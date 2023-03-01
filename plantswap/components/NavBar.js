import classes from "./NavBar.module.css";
import Link from "next/link";
import HamburgerMenu from "components/HamburgerMenu";
import NavLink from "components/NavLink";
import NavLinks from "./NavLinks";
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

          <NavLinks />

          <HamburgerMenu />
        </nav>
      </header>
    </>
  );
}

export default NavBar;
