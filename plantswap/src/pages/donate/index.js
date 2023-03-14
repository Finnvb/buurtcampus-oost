// import NavBar from "components/NavBar";
// import Footer from "components/Footer";
// import React, { useRef, useState } from "react";
// import { submitComment } from "lib/api";
// import classes from "../../styles/donatepage.module.css";

// function DonatePage() {
//   const [error, setError] = useState(false);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   // const commentEl = useRef();
//   const nameEl = useRef();
//   // const emailEl = useRef();

//   const handleCommentSubmission = (e) => {
//     e.preventDefault();
//     setError(false);

//     // const { value: comment } = commentEl.current;
//     const { value: naam } = nameEl.current;
//     // const { value: email } = emailEl.current;

//     if (!naam) {
//       setError(error);
//       return;
//     }

//     const commentObj = {
//       naam,
//     };

//     submitComment(commentObj).then((res) => {
//       setShowSuccessMessage(true);
//       setTimeout(() => {
//         setShowSuccessMessage(false);
//       }, 3000);
//     });
//   };
//   return (
//     <>
//       <NavBar />
//       <h1 className={classes.header}>Doneren</h1>

//       <form className={classes.form}>
//         <h2>Vul de formulier in om een plant te doneren</h2>

//         <div>
//           <label htmlFor="naam">Naam</label>
//           <input
//             id="naam"
//             type="text"
//             name="naam"
//             ref={nameEl}
//             required
//             placeholder="John Doe"
//           ></input>
//         </div>

//         <button type="submit" onClick={handleCommentSubmission}>
//           Inschrijven
//         </button>
//         {showSuccessMessage === true && (
//           <div className={classes.formSuccesMsg}>Email verstuurd!</div>
//         )}
//       </form>

//       <Footer />
//     </>
//   );
// }

// export default DonatePage;

// import { useState } from "react";

// function DonatePage() {
//   const [name, setName] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(
//         "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clbe0wlb32hx401ui0c2yfm49/master",
//         {
//           method: "POST",
//           body: JSON.stringify({
//             query: `
//             mutation {
//               createStekje(data: { naam: "${name}" }) {

//               }
//             }
//           `,
//           }),
//           headers: {
//             "Content-Type": "application/json",

//             authorization: process.env.HYGRAPH_DEV_AUTH_TOKEN,
//           },
//         }
//       );
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input
//           type="text"
//           value={name}
//           onChange={(event) => {
//             console.log(event.target.value);
//             setName(event.target.value);
//           }}
//         />
//       </label>

//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default DonatePage;

import { useState } from "react";

export default function DonatePage() {
  const [naam, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/submitForm", {
        method: "POST",
        body: JSON.stringify({ naam }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      console.log(data);
      if (data.success) {
        console.log("yes");
        setSuccess(true);
        setError(null);
      } else {
        console.log("no");
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
      />

      {/* <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} /> */}

      <button type="submit">Send</button>
    </form>
  );
}
