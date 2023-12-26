import { createTRPCRouter } from "~/server/api/trpc";

import { attributeRouter } from "./routers/attribute";
import { cardRouter } from "./routers/card";
import { cardTimingRouter } from "./routers/cardtiming";
import { cardTypeRouter } from "./routers/cardtype";
import { colorRouter } from "./routers/color";
import { keywordRouter } from "./routers/keyword";
import { setRouter } from "./routers/set";
import { stageRouter } from "./routers/stage";
import { typeRouter } from "./routers/type";
import { filterRouter } from "./routers/filters";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  attribute: attributeRouter,
  card: cardRouter,
  cardTiming: cardTimingRouter,
  cardType: cardTypeRouter,
  color: colorRouter,
  filter: filterRouter,
  keyword: keywordRouter,
  set: setRouter,
  stage: stageRouter,
  type: typeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
