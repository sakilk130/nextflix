import { IVideo } from "../interfaces";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
import videos from "../data/videos.json";
export const getCommonVideos = async (url: string): Promise<IVideo[]> => {
  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
    const data =
      await fetch(`https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}
    `);
    const videos = await data.json();
    if (videos?.error) {
      return [];
    }
    return videos?.items?.length > 0
      ? videos.items.map((video: any) => {
          return {
            id: video?.id?.videoId || video?.id,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high.url,
          };
        })
      : [];
  } catch (error) {
    return [];
  }
};

export const getVideos = (query: string) => {
  const url = `search?part=snippet&q=${query}`;
  return getCommonVideos(url);
};

export const getPopularVideos = () => {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`;
  return getCommonVideos(url);
};
