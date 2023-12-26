import { 
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { cardTimings } from "~/server/db/schema";

export const cardTimingRouter = createTRPCRouter({
    getCardsByPage: publicProcedure
        .query(async ({ ctx }) => {
            const cardTimingsFound = await ctx
                .db
                .select({
                    id: cardTimings.id,
                    name: cardTimings.name,
                })
                .from(cardTimings);

            return cardTimingsFound;
        }),
})