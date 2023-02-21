import NavBar from "components/NavBar";
import { gql } from "@apollo/client";
import client from "../../../apolloClient";

import Link from "next/link";
function OverviewPage(stekjes) {
  console.log(stekjes);
  return (
    <>
      <NavBar />
      <h1>Dit is de OverviewPage</h1>

      <ul>
        {stekjes.stekjes.map((stekje, i) => (
          <li key={i}>
            <Link href={`overview/${stekje.id}`}>{stekje.naam}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default OverviewPage;

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Stekjes {
        stekjes {
          aanmelddatum
          createdAt
          id
          naam
          publishedAt
          updatedAt
        }
      }
    `,
  });
  const { stekjes } = data;
  return {
    props: { stekjes },
  };
}
