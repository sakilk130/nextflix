const { Magic } = require("@magic-sdk/admin");

export const magicAdmin = new Magic(
  process.env.NEXT_PUBLIC_MAGIC_LINK_SECRET_KEY as string
);
