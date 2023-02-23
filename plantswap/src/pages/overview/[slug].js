import { GraphQLClient, gql } from "graphql-request";
import classes from "../../styles/overviewpage.module.css";
import Footer from "components/Footer";
import NavBar from "components/NavBar";

function PlantDetailPage({ stekje }) {
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
          {/* <div>
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
          </div> */}
          <div>
            <h2>Voeding</h2>
            <p>{stekje.voeding}</p>
          </div>
          <div>
            <h2>Giftig</h2>
            <p>{stekje.giftig}</p>
          </div>
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
