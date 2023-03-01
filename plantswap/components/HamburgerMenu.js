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
        <div
          className={classes.container}
          onClick={() => {
            setOpen(!open);
            console.log(open);
          }}
        >
          <Hamburger size={40} color="#FFFFFF" rounded />
        </div>

        {open && <HamburgerMenuNav />}
      </nav>
    </>
  );
}

export default HamburgerMenu;
