import classes from "./NavBar.module.css";
import Link from "next/link";
import HamburgerMenu from "components/HamburgerMenu";
import NavLink from "components/NavLink";
import NavLinks from "./NavLinks";
import Image from "next/image";
function NavBar() {
  return (
    <>
      <header>
        <nav className={classes.container}>
          <Link href="/">
            <Image
              className={classes.logo}
              src="/plantswap-logo.png"
              alt="plantswap-logo"
              width={160}
              height={90}
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
