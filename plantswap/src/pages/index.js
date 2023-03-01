import NavBar from "components/NavBar";
import Footer from "components/Footer";
import SectionItem from "components/SectionItem";
import Title from "components/Title";
import classes from "../styles/homepage.module.css";

function HomePage() {
  return (
    <>
      <NavBar />
      <main className={classes.container}>
        <div className={classes.bgImage}>
          <section>
            <h1>Welkom bij Plantswap</h1>
            <p>
              Heb jij een of meerdere plantenstekjes over en zou je die graag
              willen ruilen voor een nieuw plantje? Meld je stekje hier aan en
              ruil ‘m via de app. Schrijf de Latijnse naam van je plant en
              eventuele verzorgingstips op een labeltje en neem ‘m mee naar de
              OBA Linnaeusstraat in Amsterdam.
            </p>
          </section>
        </div>

        <section>
          <Title titleText="Hoe werkt het?" />
          <div className={classes.section}>
            <SectionItem
              title="Ruilen"
              linkTitle="Ruilen"
              link="/overview"
              source="/trade.svg"
              display="block"
              height="25rem"
            >
              Binnen Plantswap kun je kiezen uit de opties ruilen of doneren.
              Met de optie ruilen kies je uit onze beschikbare stekjes uit de
              stekjeskast, vul je de formulier in en kun je direct je nieuwe
              stekje ophalen!
            </SectionItem>
            <SectionItem
              title="Doneren"
              linkTitle="Doneren"
              link="/donate"
              source="/donate.svg"
              display="block"
              height="25rem"
            >
              Heb jij (net als wij) teveel planten in huis? Wij zijn super blij
              als je stekjes komt doneren. Je kunt ze aanmelden via de app en
              daarna neerzetten in de PlantSwap kast in de bieb.
            </SectionItem>
            <SectionItem
              title="Workshops"
              linkTitle="Workshops"
              link="/workshops"
              source="/workshop.svg"
              display="block"
              height="25rem"
            >
              De eerste workshop ‘Planten stekken en verzorgen’ zal plaatsvinden
              in maart 2023 in de OBA Linnaeusstraat, meld je hier aan voor meer
              informatie en om op de hoogte te blijven.
            </SectionItem>
          </div>
        </section>

        <section>
          <Title titleText="Onze pijlers" />
          <div className={classes.section}>
            <SectionItem
              title="Vitaliteit"
              // linkTitle="Ruilen"
              link="/overview"
              source="/heart.svg"
              display="none"
              height="15rem"
            >
              Een vitaal persoon heeft een duidelijke wilskracht, beschikt over
              energie, lichamelijke kracht en weerbaarheid. Wij staan voor
              vitaliteit!
            </SectionItem>

            <SectionItem
              title="Duurzaamheid"
              // linkTitle="Ruilen"
              link="/overview"
              source="/leaf.svg"
              display="none"
              height="15rem"
            >
              Duurzame ontwikkeling is een ontwikkeling die tegemoetkomt aan de
              levensbehoeften van de huidige generatie, zonder die van de
              toekomstige generaties tekort te doen.
            </SectionItem>

            <SectionItem
              title="Samenwerken"
              // linkTitle="Ruilen"
              link="/overview"
              source="/teamwork.svg"
              display="none"
              height="15rem"
            >
              Goed samenwerken is van doorslaggevend belang voor het behalen van
              de gewenste resultaten bij werk waar meerdere personen bij
              betrokken zijn.
            </SectionItem>
          </div>
        </section>

        <section>
          <Title titleText="Over Buurtcampus Oost" />
          <div className={classes.section}>
            <img
              className={classes.buurtcampusImg}
              src="buurtcampusOost.avif"
              alt="buurtcampus"
            />
            <SectionItem
              // linkTitle="Ruilen"
              link="/overview"
              display="none"
            >
              De Buurtcampus Oost heeft als doel Amsterdam-Oost duurzamer,
              inclusiever en gezonder te maken. Plant Swap Amsterdam zorgt
              ervoor dat plantenliefhebbers elkaar ontmoeten in de bibliotheek.
              Daarnaast hebben planten in huis een positief effect op je
              lichamelijke en geestelijke gezondheid. Veel mensen weten niet
              goed hoe ze voor planten moeten zorgen en kopen nieuwe als ze dood
              gaan. In het kader van duurzaamheid, gezondheid en meer sociale
              connectie, is PlantSwap Amsterdam een plek van sociale ontmoeting,
              waar mensen samen leren over planten.
            </SectionItem>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

export default HomePage;
