import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import twilio from "twilio";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

app.post("/send-sms", (req, res) => {
  const { to, body } = req.body;

  client.messages
    .create({
      body: body,
      from: "+14848669801",
      to: to,
    })
    .then((message) => res.json({ sid: message.sid }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:${port}");
});
