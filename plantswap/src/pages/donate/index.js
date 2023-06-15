import { useState } from "react";
import classes from "../../styles/donatepage.module.css";
import { sendDoneerForm } from "lib/api";
import Layout from "components/layout";
import SuccesState from "components/SuccesState";
import Image from "next/image";
import Link from "next/link";

const initValues = {
  naam: "",
  email: "",
  datetime: "",
  naamplant: "",
};

const initState = { values: initValues };

export default function DonatePage() {
  const [naam, setName] = useState("");
  const [landvanherkomst, setLandvanherkomst] = useState("");
  const [watergeven, setWatergeven] = useState("");
  const [voeding, setVoeding] = useState("");
  const [giftig, setGiftig] = useState("");
  const [succes, formSucces] = useState(false);

  const [count, setCount] = useState(1);
  const [state, setState] = useState(initState);
  const { values } = state;
  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  const slug = null;
  let categories = "clducg5wd5c8x0bw4b9t4bag5";
  values.naamplant = naam;
  function click() {
    categories = "clducgjm756j20bw59bytl32c";
  }
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setState((prev) => ({
      ...prev,
    }));

    try {
      const response = await fetch("/api/submitForm", {
        method: "POST",
        body: JSON.stringify({
          naam,
          slug,
          landvanherkomst,
          watergeven,
          voeding,
          giftig,
          categories,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setSuccess(true);
        setError(null);
        formSucces(true);

        setTimeout(() => {
          formSucces(false);
        }, 3000);
      } else {
        setSuccess(false);
        setSuccess(false);
        setError(data.error);
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setError(error.message);
    }

    try {
      await sendDoneerForm(values);

      setState(initState);
    } catch (error) {
      formSucces(false);
      setState((prev) => ({
        ...prev,

        error: error.message,
      }));
    }
  };

  return (
    <>
      <Layout title="Plantswap donate">
        <h2 className={classes.header}>Doneren </h2>

        <main className={classes.container}>
          <Image
            src="/plant-donation.jpg"
            alt="plant-donation"
            className={classes.plantImg}
            width={700}
            height={700}
            loading="eager"
          />

          <article className={classes.article}>
            <p>
              Heb jij (net als wij) teveel planten in huis? Wij zijn super blij
              als je stekjes komt doneren. Je kunt ze aanmelden via de app en
              daarna neerzetten in de PlantSwap kast in de bieb. Vul het
              formulier in om een plant te doneren.
            </p>

            <p>
              Weet je niet wat voor plant je hebt? Klik hieronder om erachter te
              komen.
            </p>

            <Link href="https://identify.plantnet.org/nl">
              <Image
                className={classes.plantNet}
                src="/plantnet-logo.svg"
                alt="plantnet"
                width={200}
                height={60}
              />
            </Link>
          </article>

          <form className={classes.form} onSubmit={handleSubmit}>
            {count === 1 ? (
              <>
                <h2>Contactgegevens</h2>
                <label>Naam</label>
                <input
                  id="naam"
                  type="text"
                  name="naam"
                  value={values.naam}
                  required
                  onChange={handleChange}
                  placeholder="John Doe"
                />

                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  required
                  onChange={handleChange}
                  placeholder="johndoe@gmail.com"
                />

                <label htmlFor="datetime">Wanneer kun je langskomen</label>
                <input
                  id="datetime"
                  type="datetime-local"
                  required
                  value={values.datetime}
                  onChange={handleChange}
                  name="datetime"
                />

                <input
                  id="naamplant"
                  type="hidden"
                  name="naamplant"
                  value={naam}
                  required
                  onChange={handleChange}
                />
                <button
                  className={classes.button}
                  type="submit"
                  onClick={() => setCount(count + 1)}
                  disabled={count > 1}
                >
                  Next
                  <Image
                    src="/arrowRight.svg"
                    alt="nextArrow"
                    width={30}
                    height={20}
                  />
                </button>
              </>
            ) : null}
            {count === 2 ? (
              <>
                <h2>Plantgegevens</h2>
                <label htmlFor="naam">Naam van plant</label>
                <input
                  type="text"
                  id="naam"
                  name="naam"
                  value={naam}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                  placeholder="Scindapsus"
                />
                <label htmlFor="landvanherkomst">Land van herkomst</label>
                <input
                  type="text"
                  id="landvanherkomst"
                  name="landvanherkomst"
                  value={landvanherkomst}
                  onChange={(e) => {
                    setLandvanherkomst(e.target.value);
                  }}
                  required
                  placeholder="Zuidoost-Azië"
                />
                <label htmlFor="watergeven">
                  Hoe vaak heeft de plant water nodig
                </label>
                <input
                  type="text"
                  id="watergeven"
                  name="watergeven"
                  value={watergeven}
                  onChange={(e) => {
                    setWatergeven(e.target.value);
                  }}
                  required
                  placeholder="3x per maand"
                />

                <input
                  id="slug"
                  type="hidden"
                  name="slug"
                  value={naam}
                  required
                  readOnly
                />
                <label htmlFor="voeding">
                  Heeft de plant plantenvoeding nodig
                </label>
                <input
                  type="text"
                  id="voeding"
                  name="voeding"
                  value={voeding}
                  onChange={(e) => {
                    setVoeding(e.target.value);
                  }}
                  required
                  placeholder="in de zomer elke twee maanden
                plantenvoeding"
                />
                <label htmlFor="giftig">
                  Is de plant giftig voor huisdieren
                </label>
                <input
                  type="text"
                  id="giftig"
                  name="giftig"
                  value={giftig}
                  onChange={(e) => {
                    setGiftig(e.target.value);
                  }}
                  required
                  placeholder="ja, de bladeren zijn giftig voor huisdieren"
                />

                <label htmlFor="categories">
                  Is de plant makkelijk of moeilijk te onderhouden
                </label>
                <select name="categories" id="categories">
                  <option value="makkelijk">Makkelijk</option>
                  <option onClick={click} value="moeilijk">
                    Moeilijk
                  </option>
                </select>
                {succes === true && (
                  <SuccesState message="Form submitted and being reviewed" />
                )}

                <button className={classes.submitButton} type="submit">
                  Send
                </button>
                <button
                  className={classes.button}
                  type="submit"
                  onClick={() => setCount(count - 1)}
                  disabled={count < 2}
                >
                  <Image
                    src="/arrowLeft.svg"
                    alt="backArrow"
                    width={30}
                    height={20}
                  />
                  Back
                </button>
              </>
            ) : null}
            <div className={classes.buttonContainer}></div>

            <h3> {count} / 2</h3>
          </form>
        </main>
      </Layout>
    </>
  );
}
