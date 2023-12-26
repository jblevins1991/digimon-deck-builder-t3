import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { env } from "~/env";
import * as schema from "./schema";

export const db = drizzle(
  connect({
    host: env.DATABASE_URL
  }),
  { schema }
);
