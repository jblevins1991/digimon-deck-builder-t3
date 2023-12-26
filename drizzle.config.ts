import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
    database: env.DATABASE_DATABASE
  },
  tablesFilter: ["digimon-deck-builder-t3_*"],
} satisfies Config;
