import NavLink from "components/NavLink";
import classes from "./HamburgerMenu.module.css";
import { delay, motion } from "framer-motion";

import { useSession, signOut } from "next-auth/react";
function HamburgerMenuNav() {
  const animateFrom = { opacity: 0, y: -10 };
  const animateTo = { opacity: 1, y: 0 };

  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  console.log(loading);
  console.log(session);

  function logoutHandler() {
    signOut();
  }
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

        {!session && !loading && (
          <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{ delay: 0.4 }}
          >
            <NavLink title="Login" link="/auth" />
          </motion.li>
        )}

        {session && (
          <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{ delay: 0.4 }}
          >
            <NavLink title="Profile" link="/profile" />
          </motion.li>
        )}
        {session && (
          <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{ delay: 0.4 }}
          >
            <button className={classes.button} onClick={logoutHandler}>
              Logout
            </button>
          </motion.li>
        )}
      </motion.ul>
    </>
  );
}

export default HamburgerMenuNav;
