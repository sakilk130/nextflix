import jwt from "jsonwebtoken";
import { getVideoByUserId } from "../../lib/db/hasura";

export default async function video(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const decode: any = jwt.verify(
        token,
        process.env.NEXT_PUBLIC_JWT_SECRET as string
      );

      if (!decode) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }
      const video_id = "4zH5iYM4wJo"; //dummy video id
      const user_id = decode?.issuer;

      const response = await getVideoByUserId(user_id, video_id, token);

      res.status(200).json({ success: true, data: response });
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
