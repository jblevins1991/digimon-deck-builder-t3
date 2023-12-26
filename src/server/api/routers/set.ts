import { 
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { sets } from "~/server/db/schema";

export const setRouter = createTRPCRouter({
    getSets: publicProcedure
        .query(async ({ ctx }) => {
            const setsFound = await ctx
                .db
                .select({
                    id: sets.id,
                    name: sets.name,
                })
                .from(sets);

            return setsFound;
        }),
})