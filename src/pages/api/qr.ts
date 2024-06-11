// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  Response?: string;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    res.status(200).json({ Response: "John Doe" });
  } else if (req.method === "POST") {
    try {
      const { qrcode } = req.query;
      const response = await fetch(`https://qr.cms.itexpertnow.com?qrcode=${qrcode}`, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let finalRes: Data = await response.json();
      res.status(200).json(finalRes);
    } catch (err) {
      res.status(401).json({ message: "Error: " + err });
    }
  }
}
