import NavLink from "components/NavLink";
import classes from "./HamburgerMenu.module.css";

function HamburgerMenuNav() {
  return (
    <>
      <ul className={classes.HamburgerMenuNav}>
        <NavLink title="Onze stekjes" link="/overview" />
        <NavLink title="Doneren" link="/donate" />
        <NavLink title="Workshops" link="/workshops" />
        <NavLink title="Contact" link="/contact" />
      </ul>
    </>
  );
}

export default HamburgerMenuNav;
