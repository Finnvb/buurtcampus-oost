// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mailOptions, transporter } from "config/nodemailer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    console.log(req.body);

    if (!data.naam || !data.email || !data.leeftijd || !data.plants) {
      res.status(400).json({ message: "Bad request" });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: "Deelnemen workshop",
        text: "This is a test string",
        html: `<h1>Workshop stekjes maken</h1><p>Naam:${data.naam}</p><p>email:${data.email}</p><p>leeftijd:${data.leeftijd}</p><p>plant die ik wil stekken:${data.plants}</p>`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }

  res.status(400).json({ message: "Bad request" });
};

export default handler;
