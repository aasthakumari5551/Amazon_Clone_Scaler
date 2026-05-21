import type { CorsOptions } from "cors";
import { env } from "./env";

const corsOptions: CorsOptions = {
  origin: [env.CLIENT_URL],
  credentials: true
};

export default corsOptions;
