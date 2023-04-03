import classes from "./HamburgerMenu.module.css";
import NavLinks from "./NavLinks";
import HamburgerMenuNav from "./HamburgerMenuNav";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className={classes.mobileNav}>
        <button
          type="button"
          className={classes.container}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Hamburger size={40} color="#FFFFFF" rounded />
        </button>

        {open && <HamburgerMenuNav />}
      </nav>
    </>
  );
}

export default HamburgerMenu;
