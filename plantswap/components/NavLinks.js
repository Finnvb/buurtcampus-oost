import classes from "./NavBar.module.css";

import NavLink from "components/NavLink";

function NavLinks() {
  return (
    <>
      <ul className={classes.ulItems}>
        <NavLink title="Onze stekjes" link="/overview" />

        <NavLink title="Doneren" link="/donate" />
        <NavLink title="Workshops" link="/workshops" />
        <NavLink title="Contact" link="/contact" />
      </ul>
    </>
  );
}

export default NavLinks;
