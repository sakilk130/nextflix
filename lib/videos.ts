import videos from "../data/videos.json";
import { IVideo } from "../types";

export const getVideos = (): IVideo[] => {
  return videos.items.map((video) => {
    return {
      id: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
    };
  });
};
