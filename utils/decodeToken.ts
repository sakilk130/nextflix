import jwt from "jsonwebtoken";
export default function decodeToken(token: string) {
  const decode: any = jwt.verify(
    token,
    process.env.NEXT_PUBLIC_JWT_SECRET as string
  );
  return decode;
}
