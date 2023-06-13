import Layout from "components/layout";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import classes from "../styles/profilepage.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import UserProfile from "components/profile/user-profile";
function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);

  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState([]);
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

  const toggleTheme = (e) => {
    e.preventDefault();
    const theme = localStorage.getItem("theme");
    if (theme) {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    themeCheck();
  }, []);
  return (
    <Layout>
      {/* <h1 className={classes.profileHeader}>Your User Profile </h1> */}
      <UserProfile />
      <section className={classes.container}>
        <div className={classes.themeContainer}>
          <h2>Theme</h2>

          <button
            onClick={toggleTheme}
            className={darkMode ? classes.darkModeEnabled : classes.darkMode}
            for="dark-mode"
          ></button>
          <p>{darkMode ? "Dark" : "Light"}</p>
        </div>
        <div>
          <h2>User info</h2>
          <h3>Email</h3>
          <p>{session.user.email} </p>
        </div>
        <div>
          <h2>Favorites</h2>
          {favorites.length > 0 ? (
            <ul className={classes.plantContainer}>
              {favorites.map((favorite, index) => (
                <li key={index} className={classes.plantItem}>
                  <Link
                    className={classes.link}
                    href={`overview/${favorite.id}`}
                  >
                    <div className={classes.plantItem}>
                      <Image
                        className={classes.plantImg}
                        src={favorite.foto}
                        alt={favorite.naam}
                        width="300"
                        height="330"
                      />
                      <p className={classes.plantName}>{favorite.naam}</p>
                      <p className={classes.category}>{favorite.categorie}</p>
                    </div>
                  </Link>
                  <div className={classes.remove}>
                    <button
                      className={classes.favoritesBtn}
                      onClick={() => removeFavorite(index)}
                    >
                      <Image
                        src="/remove.svg"
                        alt="Remove"
                        width={35}
                        height={35}
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No favorites found</p>
          )}
        </div>
      </section>
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
