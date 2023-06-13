import classes from "./user-profile.module.css";

import { useSession, getSession } from "next-auth/react";

function UserProfile() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return <h1 className={classes.profileHeader}>Your User Profile </h1>;
}

export default UserProfile;
