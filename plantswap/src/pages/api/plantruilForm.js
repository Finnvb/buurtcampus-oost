import { mailOptions, transporter } from "config/nodemailer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    console.log(req.body);

    if (!data.naam || !data.email || !data.datetime) {
      res.status(400).json({ message: "Bad request" });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: "Plant ruilen",
        text: "This is a test string",
        html: `<h1>Plant ruilen</h1><p>Naam:<br>${data.naam}</p><p>email:<br>${data.email}</p><p>Gereserveerde plant:<br>${data.geselecteerdePlant}</p><p>Plant die ik hiervoor wil inruilen:<br>${data.inruilPlant}</p><p>tijd en datum dat ik langs kan komen:<br>${data.datetime}</p>`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }

  res.status(200).json({ message: "form request sent" });
};

export default handler;
