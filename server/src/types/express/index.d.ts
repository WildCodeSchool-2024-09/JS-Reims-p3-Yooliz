import type { JwtPayload } from "jsonwebtoken";

declare global {
  export type MyPayload = JwtPayload & {
    sub: string;
    isAdmin: boolean;
  };

  namespace Express {
    export interface Request {
      cookies: { [key: string]: string };
      auth?: MyPayload;
    }
  }
}
