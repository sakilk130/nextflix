import { magicAdmin } from "../../lib/magic-server";
import jwt from "jsonwebtoken";
import { insertUser, isNewUser } from "../../lib/db/hasura";
import setCookie from "../../lib/cookie";

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
      const user = await isNewUser(token, metadata.issuer);
      if (user.length === 0) {
        const newUser = await insertUser(
          token,
          metadata.email,
          metadata.issuer,
          metadata.publicAddress
        );
        setCookie(res, token);
        res.status(200).json({ token, isNewUser: true, newUser });
      } else {
        setCookie(res, token);
        res.status(200).json({ token, isNewUser: false });
      }
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
