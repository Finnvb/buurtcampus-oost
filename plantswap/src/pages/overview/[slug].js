import { GraphQLClient, gql } from "graphql-request";
import classes from "../../styles/overviewpage.module.css";
import Footer from "components/Footer";
import NavBar from "components/NavBar";

function PlantDetailPage({ stekje }) {
  return (
    <>
      <NavBar />
      <p>{stekje.naam}</p>
      <img
        className={classes.plantImg}
        src={stekje.fotos[0].url}
        alt={stekje.naam}
      />

      <div dangerouslySetInnerHTML={{ __html: stekje.zonlicht.html }}></div>

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
      fotos {
        url
      }
      zonlicht {
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
