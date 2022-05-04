import express from "express";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const app = express();

app.use(express.json());

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

app.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: "Equipe Feeget <oi@feedget.com>",
    to: "Talles Corradini <teste@gmail.com>",
    subject: "Novo feedback",
    html: [
      `<p style="font-family: sans-serif; font-size: 16px; color: #111">Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
    ].join("\n"),
  });

  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
  console.log("Server running on port 3333");
});
