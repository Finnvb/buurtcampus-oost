const fetch = require("node-fetch");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { naam, landvanherkomst, watergeven, voeding, giftig, categories } =
      req.body;
    console.log(req.body);
    const url =
      "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clbe0wlb32hx401ui0c2yfm49/master";

    const mutation = `   mutation MyMutation {
        createStekje(data: {naam: "${naam}", slug: "${naam}", landvanherkomst: "${landvanherkomst}", watergeven: "${watergeven}", voeding: "${voeding}", giftig: "${giftig}", categories: {connect: {id: "${categories}"}}}) {
          id
          naam
          slug
          landvanherkomst
          watergeven
          giftig
          categories{id
            naam
          }
         
         
        }
      }`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HYGRAPH_DEV_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            naam,
            watergeven,
            landvanherkomst,
            voeding,
            giftig,
            categories,
          },
        }),
      });

      const data = await response.json();
      console.log(data);
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error });
    }
  } else {
    res.status(400).json({ success: false, error: "Invalid request method." });
  }
}
