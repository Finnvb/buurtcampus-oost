import { GraphQLClient, gql } from "graphql-request";
import classes from "../../styles/overviewpage.module.css";
import Layout from "components/layout";
import SuccesState from "components/SuccesState";
import { useState } from "react";
import Image from "next/image";
import { sendRuilForm } from "lib/api";
import { motion } from "framer-motion";
import { getSession } from "next-auth/react";
import { useSession, signIn } from "next-auth/react";
const initValues = {
  naam: "",
  email: "",
  inruilPlant: "",
  datetime: "",
};

const initState = { values: initValues };

function PlantDetailPage({ stekje }) {
  const animateFrom = { opacity: 0, y: -50 };
  const animateTo = { opacity: 1, y: 0 };
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const [state, setState] = useState(initState);

  const [succes, formSucces] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { values } = state;
  values.geselecteerdePlant = stekje.naam;

  const handleAddToFavorites = (e) => {
    e.preventDefault();

    const enteredFavorites = {
      naam: stekje.naam,
      foto: stekje.fotos[0].url,
      categorie: stekje.categories[0].naam,
      id: stekje.id,
    };
    const storedFavorites = localStorage.getItem("favorites");
    let favorites = [];

    if (storedFavorites) {
      favorites = JSON.parse(storedFavorites);
    }

    const isFavoriteExists = favorites.some(
      (favorite) => favorite.id === enteredFavorites.id
    );

    if (!isFavoriteExists) {
      favorites.push(enteredFavorites);

      localStorage.setItem("favorites", JSON.stringify(favorites));

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };
  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
    }));
    try {
      await sendRuilForm(values);

      setState(initState);

      formSucces(true);

      setTimeout(() => {
        formSucces(false);
      }, 3000);
    } catch (error) {
      formSucces(false);
      setState((prev) => ({
        ...prev,

        error: error.message,
      }));
    }
  };

  return (
    <>
      <Layout title={stekje.naam}>
        <h1 className={classes.header}>{stekje.naam}</h1>
        <main className={classes.detailpageContainer}>
          <section className={classes.plantContent}>
            {session && (
              <form onSubmit={handleAddToFavorites}>
                <button className={classes.favoritesBtn}>
                  <p>Add to favorites</p>
                  <Image
                    className={classes.buurtcampusImg}
                    src="/add.svg"
                    alt="add"
                    width={30}
                    height={30}
                  />
                </button>
              </form>
            )}

            {showSuccessMessage && <SuccesState message="Added to favorites" />}

            <Image
              className={classes.plantImgDetail}
              src={stekje.fotos[0].url}
              alt={stekje.naam}
              width={550}
              height={550}
              loading="eager"
            />

            <div>
              <h2>Temperatuur</h2>
              <p>{stekje.temperatuur}</p>
            </div>
            <div>
              <h2>Zonlicht</h2>
              <p>{stekje.zonlicht}</p>
            </div>
            <div>
              <h2>Stekken</h2>
              <p>{stekje.stekken}</p>
            </div>
          </section>
          <section className={classes.plantContent}>
            <div>
              <h2>Beschrijving</h2>
              <p>{stekje.beschrijving}</p>
            </div>
            <div>
              <h2>Land van herkomst</h2>
              <p>{stekje.landvanherkomst}</p>
            </div>
            <div>
              <h2>Moeilijkheidsgraad</h2>
              <p>{stekje.categories[0].naam}</p>
            </div>

            <div>
              <h2>Water geven</h2>
              <p>{stekje.watergeven}</p>
            </div>

            <div>
              <h2>Voeding</h2>
              <p>{stekje.voeding}</p>
            </div>
            <div>
              <h2>Giftig</h2>
              <p>{stekje.giftig}</p>
            </div>

            <section className={classes.formContainer}>
              <button
                onClick={() => {
                  setOpen(!open);
                }}
                className={classes.button}
              >
                Ruilen
              </button>
              {open && (
                <motion.form
                  className={classes.form}
                  onSubmit={onSubmit}
                  initial={animateFrom}
                  animate={animateTo}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <label>Geselecteerde plant</label>
                    <input
                      type="text"
                      value={stekje.naam}
                      name="geselecteerdePlant"
                      readOnly
                      aria-label={stekje.naam}
                    ></input>

                    <div>
                      <label htmlFor="naam">Naam</label>
                      <input
                        id="naam"
                        type="text"
                        name="naam"
                        value={values.naam}
                        required
                        onChange={handleChange}
                        placeholder="John Doe"
                      ></input>
                    </div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        required
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="johndoe@gmail.com"
                      ></input>
                    </div>

                    <div>
                      <label htmlFor="ruil">Plant die je wilt inruilen</label>
                      <input
                        id="ruil"
                        type="text"
                        required
                        name="inruilPlant"
                        value={values.inruilPlant}
                        onChange={handleChange}
                        placeholder="Scindapsus"
                      ></input>
                    </div>

                    <div>
                      <label htmlFor="datetime">
                        Wanneer kun je langskomen
                      </label>
                      <input
                        id="datetime"
                        type="datetime-local"
                        required
                        name="datetime"
                        value={values.datetime}
                        onChange={handleChange}
                      ></input>
                    </div>

                    <button className={classes.button} type="submit">
                      Reserveren
                    </button>
                    {succes === true && (
                      <SuccesState message="Email verstuurd!" />
                    )}
                  </div>
                </motion.form>
              )}
            </section>
          </section>
        </main>
      </Layout>
    </>
  );
}

const graphcms = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clbe0wlb32hx401ui0c2yfm49/master"
);

const QUERY = gql`
  query Stekjes($id: ID!) {
    stekje(where: { id: $id }) {
      id
      naam
      slug
      categories {
        naam
      }
      landvanherkomst
      voeding
      verpotten
      giftig

      fotos {
        url
      }
      temperatuur
      zonlicht
      beschrijving
      stekken
      watergeven
    }
  }
`;
const SLUGLIST = gql`
  {
    stekjes {
      id
    }
  }
`;

export async function getStaticPaths() {
  const { stekjes } = await graphcms.request(SLUGLIST);
  return {
    paths: stekjes.map((stekje) => ({ params: { id: stekje.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const data = await graphcms.request(QUERY, { id });
  const stekje = data.stekje;
  return {
    props: {
      stekje,
    },
    revalidate: 30,
  };
}

export default PlantDetailPage;
