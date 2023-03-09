import { GraphQLClient, gql } from "graphql-request";
import classes from "../../styles/overviewpage.module.css";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { useState } from "react";

import { sendRuilForm } from "lib/api";

const initValues = {
  naam: "",
  email: "",
  inruilPlant: "",
  datetime: "",
};

const initState = { isLoading: false, error: "", values: initValues };

function PlantDetailPage({ stekje }) {
  const [open, setOpen] = useState(false);

  const [state, setState] = useState(initState);

  const [succes, formSucces] = useState(false);

  const { values } = state;
  values.geselecteerdePlant = stekje.naam;
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
      <NavBar />
      <h1 className={classes.header}>{stekje.naam}</h1>
      <main className={classes.detailpageContainer}>
        <section className={classes.plantContent}>
          <img
            className={classes.plantImgDetail}
            src={stekje.fotos[0].url}
            alt={stekje.naam}
          />

          <div>
            <h2>Temperatuur</h2>

            <div
              className={classes.paragraph}
              dangerouslySetInnerHTML={{ __html: stekje.temperatuur.html }}
            ></div>
          </div>
          <div>
            <h2>Zonlicht</h2>
            <div
              className={classes.paragraph}
              dangerouslySetInnerHTML={{ __html: stekje.zonlicht.html }}
            ></div>
          </div>
          <div>
            <h2>Stekken</h2>
            <div
              className={classes.paragraph}
              dangerouslySetInnerHTML={{ __html: stekje.stekken.html }}
            ></div>
          </div>
        </section>
        <section className={classes.plantContent}>
          <div>
            <h2>Beschrijving</h2>
            <div
              className={classes.paragraph}
              dangerouslySetInnerHTML={{ __html: stekje.beschrijving.html }}
            ></div>
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
            <div
              className={classes.paragraph}
              dangerouslySetInnerHTML={{ __html: stekje.watergeven.html }}
            ></div>
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
            <div
              onClick={() => {
                setOpen(!open);
              }}
              className={classes.button}
            >
              Ruilen
            </div>
            {open && (
              <form className={classes.form} onSubmit={onSubmit}>
                <div>
                  <label>Geselecteerde plant</label>
                  <input
                    type="text"
                    value={stekje.naam}
                    name="geselecteerdePlant"
                    readOnly
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
                    <label htmlFor="datetime">Wanneer kun je langskomen</label>
                    <input
                      id="datetime"
                      type="datetime-local"
                      required
                      name="datetime"
                      value={values.datetime}
                      onChange={handleChange}
                      placeholder="Scindapsus"
                    ></input>
                  </div>

                  <button type="submit">Reserveren</button>
                  {succes === true && (
                    <div className={classes.formSuccesMsg}>
                      Email verstuurd!
                    </div>
                  )}
                </div>
              </form>
            )}
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

const graphcms = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clbe0wlb32hx401ui0c2yfm49/master"
);

const QUERY = gql`
  query Stekjes($slug: String!) {
    stekje(where: { slug: $slug }) {
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
      temperatuur {
        html
      }
      zonlicht {
        html
      }
      beschrijving {
        html
      }
      stekken {
        html
      }
      watergeven {
        html
      }
    }
  }
`;
const SLUGLIST = gql`
  {
    stekjes {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { stekjes } = await graphcms.request(SLUGLIST);
  return {
    paths: stekjes.map((stekje) => ({ params: { slug: stekje.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const stekje = data.stekje;
  return {
    props: {
      stekje,
    },
    revalidate: 30,
  };
}

export default PlantDetailPage;
