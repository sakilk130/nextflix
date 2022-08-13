import jwt from "jsonwebtoken";
import {
  getVideoByUserId,
  insertVideo,
  updateVideoByUserId,
} from "../../lib/db/hasura";

export default async function video(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;
      const video_id = req.query.video_id;

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

      const user_id = decode?.issuer;
      const video = await getVideoByUserId(user_id, video_id, token);

      if (video.length === 0) {
        const newVideo = await insertVideo(token, {
          video_id,
          user_id,
          favourited: 0,
        });
        res.status(200).json({ success: true, data: newVideo });
      } else {
        const updateVideo = await updateVideoByUserId(token, {
          video_id,
          user_id,
          favourited: 1,
          watched: true,
        });
        res.status(200).json({ success: true, data: updateVideo });
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
