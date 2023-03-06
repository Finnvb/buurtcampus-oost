import { GraphQLClient, gql } from "graphql-request";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import classes from "../../styles/overviewpage.module.css";
import Link from "next/link";

function OverviewPage({ stekjes }) {
  return (
    <>
      <NavBar />
      <h1 className={classes.header}>Alle stekjes</h1>

      <ul className={classes.plantContainer}>
        {stekjes.map((stekje, i) => (
          <li key={i}>
            <Link className={classes.link} href={`overview/${stekje.slug}`}>
              <div className={classes.plantItem}>
                <img
                  className={classes.plantImg}
                  src={stekje.fotos[0].url}
                  alt={stekje.fotos.url}
                />
                <p>{stekje.naam}</p>
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
  query {
    stekjes {
      naam
      slug

      fotos {
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { stekjes } = await graphcms.request(QUERY);
  // console.log(stekjes);
  return {
    props: {
      stekjes,
    },
    revalidate: 30,
  };
}

export default OverviewPage;
