import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { env } from "~/env";
import * as schema from "./schema";

export const db = drizzle(
  new Client({
    url: env.DATABASE_URL,
    // username: env.DATABASE_USERNAME,
    // password: env.DATABASE_PASSWORD
  }).connection(),
  { schema }
);
