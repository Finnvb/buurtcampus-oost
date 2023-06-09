import SectionItem from "components/SectionItem";
import Title from "components/Title";
import classes from "../styles/homepage.module.css";
import Layout from "components/layout";
import Image from "next/image";
import Card from "components/Card";
import { useState, useEffect } from "react";

function HomePage() {
  const images = [
    "/hero-image.jpg",
    "/plants.jpg",
    "/cactus.jpg",
    "/oba-buiten.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Layout>
        <main className={classes.container}>
          <div className={classes.slideshow}>
            <section>
              <h1>
                Welkom bij <br /> Plant Swap
              </h1>
              <p>
                Heb jij een of meerdere plantenstekjes over en zou je die graag
                willen ruilen voor een nieuw plantje? Meld je stekje hier aan en
                ruil ‘m via de app. Schrijf de Latijnse naam van je plant en
                eventuele verzorgingstips op een labeltje en neem ‘m mee naar de
                OBA Linnaeusstraat in Amsterdam.
              </p>
            </section>
            {images.map((image, index) => (
              <>
                <Image
                  key={index}
                  src={image}
                  alt={`Slideshow image ${index}`}
                  className={index === currentIndex ? classes.active : ""}
                  fill="fill"
                  objectFit="cover"
                  loading="eager"
                />
              </>
            ))}
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
                height="22rem"
              >
                Binnen Plantswap kun je kiezen uit de opties ruilen of doneren.
                Met de optie ‘ruilen’ kies je uit onze beschikbare stekjes uit
                de stekjeskast. Vul het formulier in en kom je stekje bij ons
                ruilen!
              </SectionItem>
              <SectionItem
                title="Doneren"
                linkTitle="Doneren"
                link="/donate"
                source="/donate.svg"
                display="block"
                height="22rem"
              >
                Heb jij (net als wij) teveel planten in huis? Wij zijn super
                blij als je stekjes komt doneren. Je kunt ze aanmelden via de
                app en daarna neerzetten in de PlantSwap kast in de bieb.
              </SectionItem>
              <SectionItem
                title="Workshops"
                linkTitle="Workshops"
                link="/workshops"
                source="/workshop.svg"
                display="block"
                height="22rem"
              >
                De eerste workshop ‘Planten stekken en verzorgen’ zal
                plaatsvinden in juni 2023 in de OBA Linnaeusstraat, meld je hier
                aan voor meer informatie en om op de hoogte te blijven.
              </SectionItem>
            </div>
          </section>

          <section>
            <Title titleText="Onze pijlers" />
            <div className={classes.section}>
              <Card img="/heart.svg" title="Vitaliteit">
                Planten verzorgen en in huis hebben is meer dan een hobby met
                een esthetische functie. Door planten te leren stekken en
                verzorgen kun je veel leren over hoe planten groeien en hoe de
                natuur werkt. Planten in huis zorgen voor meer zuurstof in de
                lucht en hebben een positief effect op je mentaal en emotioneel
                welzijn. Kleine plantjes, grote voordelen voor je vitaliteit!
              </Card>

              <Card img="/leaf.svg" title="Duurzaamheid">
                Veel mensen gooien hun dode plant weg omdat ze te weinig kennis
                over goede verzorging hebben, en kopen een nieuwe die vervolgens
                ook weer dood gaat om dezelfde reden. Als je weet hoe je een
                plant goed kunt verzorgen, zal deze gemakkelijk te stekken zijn
                waardoor je nieuwe plantjes krijgt die je in onze OBA kunt
                ruilen voor plantjes die je nog niet hebt. Niet alleen veel
                leuker, maar vooral ook duurzamer en gratis!
              </Card>
              <Card img="/teamwork.svg" title="Samenwerken">
                Bij PlantSwap vinden we het belangrijk dat mensen in de buurt er
                voor elkaar zijn, en samenwerken om de buurt socialer, vitaler
                en duurzamer te maken. Het ruilen van stekjes zorgt ervoor dat
                buurtbewoners elkaar op een laagdrempelige manier bij de OBA
                kunnen ontmoeten en elkaar leren kennen, waardoor de sociale
                cohesie in de buurt verbetert.
              </Card>
            </div>
          </section>

          <section>
            <Title titleText="Over Buurtcampus Oost" />
            <div className={classes.section}>
              <Image
                className={classes.buurtcampusImg}
                src="/buurtcampusOost.avif"
                alt="buurtcampus"
                width={1000}
                height={500}
                quality={100}
              />
              <article className={classes.overons}>
                De Buurtcampus Oost heeft als doel Amsterdam-Oost duurzamer,
                inclusiever en gezonder te maken. Plant Swap Amsterdam zorgt
                ervoor dat plantenliefhebbers elkaar ontmoeten in de
                bibliotheek. Daarnaast hebben planten in huis een positief
                effect op je lichamelijke en geestelijke gezondheid. Veel mensen
                weten niet goed hoe ze voor planten moeten zorgen en kopen
                nieuwe als ze dood gaan. In het kader van duurzaamheid,
                gezondheid en meer sociale connectie, is PlantSwap Amsterdam een
                plek van sociale ontmoeting, waar mensen samen leren over
                planten.
              </article>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}

export default HomePage;
