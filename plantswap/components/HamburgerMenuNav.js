import NavLink from "components/NavLink";
import classes from "./HamburgerMenu.module.css";
import { motion } from "framer-motion";
function HamburgerMenuNav() {
  const animateFrom = { opacity: 0, y: -10 };
  const animateTo = { opacity: 1, y: 0 };
  return (
    <>
      <motion.ul
        initial={animateFrom}
        animate={animateTo}
        className={classes.HamburgerMenuNav}
      >
        <NavLink title="Onze stekjes" link="/overview" />
        <NavLink title="Doneren" link="/donate" />
        <NavLink title="Workshops" link="/workshops" />
        <NavLink title="Contact" link="/contact" />
      </motion.ul>
    </>
  );
}

export default HamburgerMenuNav;
