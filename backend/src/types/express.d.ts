import { IJwtPayLoad } from "./index.ts";

declare global {
  namespace Express {
    interface Request {
      user: IJwtPayLoad;
    }
  }
}
export {};
