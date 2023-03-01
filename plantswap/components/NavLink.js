import classes from "./NavBar.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

function LinkItem(props) {
  const animateFrom = { opacity: 0, y: -60 };
  const animateTo = { opacity: 1, y: 0 };
  return (
    <>
      <motion.li initial={animateFrom} animate={animateTo}>
        <Link className={classes.ulLink} href={props.link}>
          {props.title}
        </Link>
      </motion.li>
    </>
  );
}

export default LinkItem;
