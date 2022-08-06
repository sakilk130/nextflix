import { IVideo } from "../interfaces";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const getVideos = async (): Promise<IVideo[]> => {
  const data =
    await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=disney%20trailers&maxResults=25&key=${YOUTUBE_API_KEY}
`);
  const videos = await data.json();
  return videos.items.map((video: any) => {
    return {
      id: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
    };
  });
};
