import { GraphQLClient, gql } from "graphql-request";
import Layout from "components/layout";
import classes from "../../styles/overviewpage.module.css";
import Link from "next/link";
import Image from "next/image";

function OverviewPage({ stekjes }) {
  return (
    <>
      <Layout title="Plantswap overview">
        <h1 className={classes.header}>Alle stekjes</h1>
        <ul className={classes.plantContainer}>
          {stekjes.map((stekje, i) => (
            <li key={i}>
              <Link className={classes.link} href={`overview/${stekje.slug}`}>
                <div className={classes.plantItem}>
                  <Image
                    className={classes.plantImg}
                    src={stekje.fotos[0].url}
                    alt={stekje.naam}
                    width="300"
                    height="330"
                  />

                  <p>{stekje.naam}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
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
