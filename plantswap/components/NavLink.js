import classes from "./NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
function LinkItem(props) {
  const router = useRouter();

  return (
    <>
      <Link legacyBehavior href={props.link}>
        <a
          className={
            router.pathname == props.link
              ? classes.ulLinkActive
              : classes.ulLink
          }
        >
          {props.title}
        </a>
      </Link>
    </>
  );
}

export default LinkItem;
