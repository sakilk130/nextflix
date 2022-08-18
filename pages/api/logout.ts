import { removeTokenCookie } from "../../lib/cookie";
import { magicAdmin } from "../../lib/magic-server";
import decodeToken from "../../utils/decodeToken";

export default async function logout(req: any, res: any) {
  try {
    if (!req.cookies.token)
      return res.status(401).json({ message: "User is not logged in" });
    const token = req.cookies.token;
    const decode = decodeToken(token);
    const user_id = decode?.issuer;
    removeTokenCookie(res);
    try {
      await magicAdmin.users.logoutByIssuer(user_id);
    } catch (error) {
      console.error("Error occurred while logging out magic user", error);
    }
    res.writeHead(302, { Location: "/login" });
    res.end();
  } catch (error) {
    console.error("/api/logout", error);
    res.status(401).json({ message: "User is not logged in" });
  }
}
