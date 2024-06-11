// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "ztdeveloper7@gmail.com",
    pass: "bbccrfzgdnflpwsr",
  },
});

type Data = {
  Response?: string;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {

    const { qrcode } = req.query;
      const response = await fetch(`https://qr.cms.itexpertnow.com?qrcode=${qrcode}`, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let finalRes: Data = await response.json();

    // send an email setting over here...
    const info = await transporter.sendMail({
      from: '"Urvish Shah" <ztdeveloper7@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ", // Subject line
      html: `Hi,
       <p> 
      Here is the link to download your QR Contact.
      <a href="${finalRes.Response}" target="_blank"> ${finalRes.Response} </a>
      </>
      Best regards,
      The ITExpertNow team.
      `, // html body
    });

    res.status(200).json({ message: "Your request proceed successfully." });
  }
  res.status(404).json({ message: "wrong method" });
}
