import classes from "./NavBar.module.css";

import NavLink from "components/NavLink";
import { useSession, signOut } from "next-auth/react";
function NavLinks() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function logoutHandler() {
    signOut();
  }
  return (
    <>
      <ul className={classes.ulItems}>
        <li>
          <NavLink title="Alle stekjes" link="/overview" />
        </li>

        <li>
          <NavLink title="Doneren" link="/donate" />
        </li>
        <li>
          <NavLink title="Workshops" link="/workshops" />
        </li>
        <li>
          <NavLink title="Contact" link="/contact" />
        </li>

        {!session && !loading && (
          <li>
            <NavLink title="Login" link="/auth" />
          </li>
        )}

        {session && (
          <li>
            <NavLink title="Profile" link="/profile" />
          </li>
        )}
        {session && (
          <li>
            <button className={classes.button} onClick={logoutHandler}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </>
  );
}

export default NavLinks;
