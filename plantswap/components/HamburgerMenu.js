import classes from "./HamburgerMenu.module.css";
import NavLinks from "./NavLinks";
import HamburgerMenuNav from "./HamburgerMenuNav";
import { useState } from "react";
function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  // const closeHamburgerMenu = () => setOpen(false);
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
          <span />
          <span />
          <span />
        </div>

        {open && <HamburgerMenuNav />}
      </nav>
    </>
  );
}

export default HamburgerMenu;
