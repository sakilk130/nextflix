import videoData from "../data/videos.json";
import { watchItAgain } from "./db/hasura";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const getVideoData = async (url: string): Promise<any> => {
  const BASE_URL = "youtube.googleapis.com/youtube/v3";
  const data =
    await fetch(`https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}
  `);
  return await data.json();
};

export const getCommonVideos = async (url: string): Promise<any> => {
  try {
    const isDev = process.env.DEVELOPMENT;
    const videos = isDev ? videoData : await getVideoData(url);

    if (videos?.error) {
      return [];
    }
    return videos?.items?.length > 0
      ? videos.items.map((video: any) => {
          return {
            id: video?.id?.videoId || video?.id,
            title: video.snippet.title,
            thumbnail: `https://i.ytimg.com/vi/${
              video?.id?.videoId || video?.id
            }/maxresdefault.jpg`,
            description: video.snippet.description,
            cast: video.snippet.channelTitle,
            releaseDate: video.snippet.publishedAt,
            viewCount: video.statistics ? video.statistics?.viewCount : 0,
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

export const getVideoById = (id: string) => {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;
  return getCommonVideos(url);
};

export const getWatchItAgainVideos = async (token: string, user_id: string) => {
  const videos: any = await watchItAgain(token, user_id);
  return videos.map((video: any) => {
    return {
      id: video.video_id,
      thumbnail: `https://i.ytimg.com/vi/${video.video_id}/maxresdefault.jpg`,
    };
  });
};
