import { GraphQLClient, gql } from "graphql-request";
import classes from "../../styles/workshopspage.module.css";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
// import { useEffect } from "react";
import { useState } from "react";

import { sendWorkshopForm } from "lib/api";

const initValues = {
  naam: "",
  email: "",
  leeftijd: "",
  workshop: "",
};

const initState = { values: initValues };

function WorkshopDetailPage({ workshop }) {
  const [state, setState] = useState(initState);

  const [succes, formSucces] = useState(false);

  const { values } = state;
  values.workshop = workshop.naam;

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
      await sendWorkshopForm(values);

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
      <h1 className={classes.header}>{workshop.naam}</h1>
      <main className={classes.detailpageContainer}>
        <section className={classes.workshopContent}>
          <img
            className={classes.plantImgDetail}
            src={workshop.foto[0].url}
            alt={workshop.naam}
          />

          <div
            className={classes.paragraph}
            dangerouslySetInnerHTML={{ __html: workshop.omschrijving.html }}
          ></div>
          <div>
            <h2>Locatie</h2>
            <p>{workshop.locatie}</p>
          </div>
          <div>
            <h2>Datum</h2>
            <p>{workshop.datum}</p>
          </div>
          <div>
            <h2>Kosten</h2>
            <p>{workshop.kosten}</p>
          </div>
        </section>
        <form className={classes.form} onSubmit={onSubmit}>
          <h2>Schrijf je in voor deze workshop</h2>

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
            <label htmlFor="leeftijd">Leeftijd</label>
            <input
              id="leeftijd"
              type="number"
              required
              name="leeftijd"
              value={values.leeftijd}
              onChange={handleChange}
              placeholder="30"
              min="0"
            ></input>
          </div>
          <div>
            <input
              id="workshop"
              type="hidden"
              name="workshop"
              value={workshop.naam}
              required
              readOnly
            ></input>
          </div>

          <button type="submit">Inschrijven</button>
          {succes === true && (
            <div className={classes.formSuccesMsg}>Email verstuurd!</div>
          )}
        </form>
      </main>
      <Footer />
    </>
  );
}

const graphcms = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clbe0wlb32hx401ui0c2yfm49/master"
);

const QUERY = gql`
  query Workshops($id: ID!) {
    workshop(where: { id: $id }) {
      id
      naam
      kosten
      slug
      locatie
      datum
      foto {
        url
      }
      omschrijving {
        html
      }
    }
  }
`;
const SLUGLIST = gql`
  {
    workshops {
      id
    }
  }
`;

export async function getStaticPaths() {
  const { workshops } = await graphcms.request(SLUGLIST);
  return {
    paths: workshops.map((workshop) => ({ params: { id: workshop.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const data = await graphcms.request(QUERY, { id });
  const workshop = data.workshop;
  return {
    props: {
      workshop,
    },
    revalidate: 30,
  };
}

export default WorkshopDetailPage;
