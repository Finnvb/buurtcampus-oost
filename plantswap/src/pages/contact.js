import Layout from "components/layout";
import classes from "../styles/contactpage.module.css";

function ContactPage() {
  return (
    <>
      <Layout title="Plantswap contact">
        <main className={classes.container}>
          <section>
            <h1 className={classes.header}>Contact</h1>

            <div className={classes.map}>
              <iframe
                title="Oba Linnaeus"
                width="100%"
                height="100%"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=OBA%20Linnaeusstraat%20&t=&z=15&ie=UTF8&iwloc=&output=embed"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
              ></iframe>
            </div>
          </section>
          <section className={classes.flexContainer}>
            <div>
              <h2>Adres</h2>
              <p>
                OBA Linnaeusstraat
                <br />
                Linnaeusstraat 44, 1092 CL Amsterdam
              </p>
            </div>
            <div>
              <h2>Email</h2>

              <a href="mailto:buurtcampusoost@hva.nl">buurtcampusoost@hva.nl</a>
            </div>

            <div>
              <h2>Telefoonnummer</h2>
              <p>06 43450198</p>
            </div>

            <div>
              <h2>Samenwerken</h2>

              <p>
                Wil jij met andere organisaties, buurtbewoners en studenten
                samenwerken aan de stedelijke uitdagingen van Amsterdam Oost?
                Stuur een e-mail naar{" "}
                <a href="mailto:buurtcampusoost@hva.nl">
                  buurtcampusoost@hva.nl.
                </a>
              </p>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}

export default ContactPage;
