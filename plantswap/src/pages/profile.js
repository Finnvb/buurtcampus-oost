import Layout from "components/layout";
import UserProfile from "/components/profile/user-profile";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import classes from "../styles/profilepage.module.css";

function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    themeCheck();
  }, [darkMode]);

  useEffect(() => {
    themeCheck();
  }, []);

  const themeCheck = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.body.classList.add("dark");
      setDarkMode(true);
    } else {
      document.body.classList.remove("dark");
      setDarkMode(false);
    }
  };

  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };
  return (
    <Layout>
      <UserProfile />

      <div className={classes.container}>
        <div className={classes.themeContainer}>
          <h2>Theme</h2>

          <input
            className={classes.darkModeInput}
            type="checkbox"
            id="dark-mode"
            onClick={toggleTheme}
          ></input>

          <label
            className={darkMode ? classes.darkModeEnabled : classes.darkMode}
            for="dark-mode"
          ></label>
          <p>{darkMode ? "Dark" : "Light"}</p>
        </div>
        <div>
          <h2>User info</h2>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default ProfilePage;
