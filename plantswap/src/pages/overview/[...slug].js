import { useRouter } from "next/router";
import NavBar from "components/NavBar";

import { gql } from "@apollo/client";
import client from "../../../apolloClient";
function PlantDetailPage(stekjes) {
  // const router = useRouter();
  // const plantId = router.query.plantId;
  // console.log(plantId);
  // return <>{<p>PlantId: {plantId}</p>}</>;
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Stekjes {
        stekjes {
          slug
        }
      }
    `,
  });
  const { stekjes } = data;
  // console.log(stekjes);
  const paths = stekjes.map((stekje) => ({
    params: { slug: [stekje.slug] },
  }));
  console.log(paths);
  return { paths, fallback: false };
}

export async function getStaticProps(params) {
  // const { slug } = params.slug[0];
  const { data } = await client.query({
    query: gql`
      query Stekjes($slug: slug) {
        stekjes( where: {slug : {slug}) {
          id
          naam
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
  const stekje = stekjes[0];
  console.log(stekjes);

  return { props: { stekje } };
}

export default PlantDetailPage;
