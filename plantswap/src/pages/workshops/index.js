import { GraphQLClient, gql } from "graphql-request";

import NavBar from "components/NavBar";
import Footer from "components/Footer";
import classes from "../../styles/workshopspage.module.css";
import Link from "next/link";
function WorkshopsPage({ workshops }) {
  return (
    <>
      <NavBar />
      <h1 className={classes.header}>Alle workshops</h1>

      <ul className={classes.workshopContainer}>
        {workshops.map((workshop, i) => (
          <li key={i} className={classes.workshopItem}>
            <Link className={classes.link} href={`workshops/${workshop.id}`}>
              <div className={classes.workshopItem}>
                <img
                  className={classes.workshopImg}
                  src={workshop.foto[0].url}
                  alt={workshop.foto.url}
                />
                <p>{workshop.naam}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <Footer />
    </>
  );
}

const graphcms = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clbe0wlb32hx401ui0c2yfm49/master"
);

const QUERY = gql`
  query Workshops {
    workshops {
      naam
      slug
      datum
      id
      locatie
      kosten
      omschrijving {
        html
      }
      foto {
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { workshops } = await graphcms.request(QUERY);
  // console.log(workshops);
  return {
    props: {
      workshops,
    },
    revalidate: 30,
  };
}

export default WorkshopsPage;
