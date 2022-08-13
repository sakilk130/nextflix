import jwt from "jsonwebtoken";
import {
  getVideoByUserId,
  insertVideo,
  updateVideoByUserId,
} from "../../lib/db/hasura";

export default async function video(req: any, res: any) {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const video_id =
      req.method === "POST" ? req.body.video_id : req.query.video_id;

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
    if (req.method === "POST") {
      const { favourited, watched = true } = req.body;

      if (video.length === 0) {
        const newVideo = await insertVideo(token, {
          video_id,
          user_id,
          favourited,
          watched,
        });
        res.status(200).json({ success: true, data: newVideo });
      } else {
        const updateVideo = await updateVideoByUserId(token, {
          video_id,
          user_id,
          favourited,
          watched,
        });
        res.status(200).json({ success: true, data: updateVideo });
      }
    } else {
      if (video.length === 0) {
        res.status(200).json({ success: true, data: null });
      } else {
        res.status(200).json({ success: true, data: video[0] });
      }
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
