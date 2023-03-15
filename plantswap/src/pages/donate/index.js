import { useState } from "react";

export default function DonatePage() {
  const [naam, setName] = useState("");
  const [landvanherkomst, setLandvanherkomst] = useState("");
  const [watergeven, setWatergeven] = useState("");
  const slug = null;

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // let date = new Date();
  // console.log(
  //   `${currentDate.getDate()}/${
  //     currentDate.getMonth() + 1
  //   }/${currentDate.getFullYear()}`
  // );

  // let currentDate = `${date.getDate()}/${
  //   date.getMonth() + 1
  // }/${date.getFullYear()}`;
  // currentDate.toString();
  // console.log(currentDate);

  // let datee = new Date().toISOString();
  // console.log(datee); // 6/17/2022

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/submitForm", {
        method: "POST",
        body: JSON.stringify({ naam, slug, landvanherkomst, watergeven }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        // console.log("yes");
        setSuccess(true);
        setError(null);
      } else {
        // console.log("no");
        setSuccess(false);
        setError(data.error);
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="naam">naam:</label>
      <input
        type="text"
        id="naam"
        name="naam"
        value={naam}
        onChange={(e) => {
          setName(e.target.value);
        }}
        required
      />

      <label htmlFor="landvanherkomst">Land van herkomst:</label>
      <input
        type="text"
        id="landvanherkomst"
        name="landvanherkomst"
        value={landvanherkomst}
        onChange={(e) => {
          setLandvanherkomst(e.target.value);
        }}
        required
      />

      <label htmlFor="watergeven">
        Hoeveel keer per maand moet je water geven:
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
      />

      <input
        id="slug"
        type="hidden"
        name="slug"
        value={naam}
        required
        readOnly
      />

      {/* <input
        id="aanmelddatum"
        // type="hidden"
        name="aanmelddatum"
        value={datee}
        required
        readOnly
      /> */}

      {/* <select name="categories" id="categories">
        <option value="makkelijk">makkelijk</option>
        <option value="moeilijk">moeilijk</option>
      </select> */}

      <button type="submit">Send</button>
    </form>
  );
}
