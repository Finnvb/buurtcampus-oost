import { GraphQLClient, gql } from "graphql-request";
import classes from "../../styles/workshopspage.module.css";
import Footer from "components/Footer";
import NavBar from "components/NavBar";

function WorkshopDetailPage({ workshop }) {
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
        <form className={classes.form}>
          <h2>Schrijf je in voor deze workshop</h2>
          <div>
            <label for="naam">Naam</label>
            <input id="naam" required></input>
          </div>
          <div>
            <label for="email">Email</label>
            <input id="email" required></input>
          </div>
          <div>
            <label for="leeftijd">Leeftijd</label>
            <input id="leeftijd" required></input>
          </div>
          <div>
            <label>Welke plant zou je willen stekken?</label>
            <select id="plants" name="plants">
              <option value="Spotted Star">Spotted Star</option>
              <option value="Fluweelplant">Fluweelplant</option>
              <option value="Vaderplant">Vaderplant</option>
              <option value="Sierasperge">Sierasperge</option>
              <option value="Graslelie">Graslelie</option>
            </select>
          </div>
          <button type="submit">Inschrijven</button>
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
  query Workshops($slug: String!) {
    workshop(where: { slug: $slug }) {
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
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { workshops } = await graphcms.request(SLUGLIST);
  return {
    paths: workshops.map((workshop) => ({ params: { slug: workshop.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const workshop = data.workshop;
  return {
    props: {
      workshop,
    },
    revalidate: 30,
  };
}

export default WorkshopDetailPage;
