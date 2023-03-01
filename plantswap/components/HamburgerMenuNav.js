import NavLink from "components/NavLink";
import classes from "./HamburgerMenu.module.css";
import { delay, motion } from "framer-motion";
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
        <motion.li
          initial={animateFrom}
          animate={animateTo}
          transition={{ delay: 0.1 }}
        >
          <NavLink title="Onze stekjes" link="/overview" />
        </motion.li>
        <motion.li
          initial={animateFrom}
          animate={animateTo}
          transition={{ delay: 0.2 }}
        >
          <NavLink title="Doneren" link="/donate" />
        </motion.li>
        <motion.li
          initial={animateFrom}
          animate={animateTo}
          transition={{ delay: 0.3 }}
        >
          <NavLink title="Workshops" link="/workshops" />
        </motion.li>
        <motion.li
          initial={animateFrom}
          animate={animateTo}
          transition={{ delay: 0.4 }}
        >
          <NavLink title="Contact" link="/contact" />
        </motion.li>
      </motion.ul>
    </>
  );
}

export default HamburgerMenuNav;
