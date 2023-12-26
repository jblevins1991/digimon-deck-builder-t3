import { 
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { types } from "~/server/db/schema";

export const typeRouter = createTRPCRouter({
    getTypes: publicProcedure
        .query(async ({ ctx }) => {
            const typesFound = await ctx
                .db
                .select({
                    id: types.id,
                    name: types.name,
                })
                .from(types);

            return typesFound;
        }),
})