import { magicAdmin } from "../../lib/magic-server";
import jwt from "jsonwebtoken";

export default async function login(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const didToken = req.headers.authorization.split(" ")[1];
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);
      const token = await jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 10 * 24 * 60 * 60, //10 days
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metadata.issuer}`,
          },
        },
        process.env.NEXT_PUBLIC_JWT_SECRET as string
      );
      res.send({ token });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "This route support only POST" });
  }
}
