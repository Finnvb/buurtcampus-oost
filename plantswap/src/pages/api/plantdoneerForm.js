// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mailOptions, transporter } from "config/nodemailer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    console.log(req.body);

    if (!data.naam || !data.email || !data.datetime || !data.naamplant) {
      res.status(400).json({ message: "Bad request" });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: "Plant doneren",
        text: "This is a test string",
        html: `<h1>Plant doneren</h1><p>Naam:<br>${data.naam}</p><p>email:<br>${data.email}</p><p>Naam van plant:<br>${data.naamplant}</p><p>tijd en datum dat ik langs kan komen:<br>${data.datetime}</p>`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }

  res.status(200).json({ message: "form request sent" });
};

export default handler;
