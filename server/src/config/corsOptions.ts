import type { CorsOptions } from "cors";

const clientUrl = process.env.CLIENT_URL;

const corsOptions: CorsOptions = {
  origin: clientUrl ? [clientUrl] : false,
  credentials: true
};

export default corsOptions;
