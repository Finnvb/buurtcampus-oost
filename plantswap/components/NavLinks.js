import classes from "./NavBar.module.css";

import NavLink from "components/NavLink";

function NavLinks() {
  return (
    <>
      <ul className={classes.ulItems}>
        <li>
          <NavLink title="Onze stekjes" link="/overview" />
        </li>

        <li>
          {" "}
          <NavLink title="Doneren" link="/donate" />
        </li>
        <li>
          {" "}
          <NavLink title="Workshops" link="/workshops" />
        </li>
        <li>
          {" "}
          <NavLink title="Contact" link="/contact" />
        </li>
      </ul>
    </>
  );
}

export default NavLinks;
