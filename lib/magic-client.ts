import { Magic } from "magic-sdk";
const MAGIC_LINK_API_KEY = process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY as string;

const createMagicLink = () => {
  return typeof window !== "undefined" && new Magic(MAGIC_LINK_API_KEY);
};

const magic: any = createMagicLink();

export default magic;
