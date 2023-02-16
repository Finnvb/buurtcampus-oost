import classes from "./NavBar.module.css";
import Link from "next/link";

function LinkItem(props) {
  return (
    <>
      <Link className={classes.ulLink} href={props.link}>
        {props.title}
      </Link>
    </>
  );
}

export default LinkItem;
