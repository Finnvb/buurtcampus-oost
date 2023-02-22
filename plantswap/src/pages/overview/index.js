import NavBar from "components/NavBar";
import Footer from "components/Footer";
import { gql } from "@apollo/client";
import client from "../../../apolloClient";
import classes from "../../styles/overviewpage.module.css";

import Link from "next/link";
function OverviewPage(stekjes) {
  console.log(stekjes);

  return (
    <>
      <NavBar />
      <h1 className={classes.header}>Alle stekjes</h1>

      <ul className={classes.plantContainer}>
        {stekjes.stekjes.map((stekje, i) => (
          <Link className={classes.link} href={`overview/${stekje.slug}`}>
            <li key={i} className={classes.plantItem}>
              <img
                className={classes.plantImg}
                src={stekje.fotos[0].url}
                alt={stekje.fotos.url}
              />
              <p>{stekje.naam}</p>
            </li>
          </Link>
        ))}
      </ul>

      <Footer />
    </>
  );
}

export default OverviewPage;

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Stekjes {
        stekjes {
          id
          naam
          fotos {
            url
          }
          stekken {
            html
          }
          temperatuur {
            html
          }
          slug
          verpotten
          voeding
          watergeven {
            html
          }
          zonlicht {
            html
          }
        }
      }
    `,
  });
  const { stekjes } = data;
  return {
    props: { stekjes },
  };
}
