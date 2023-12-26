import { 
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { colors } from "~/server/db/schema";

export const colorRouter = createTRPCRouter({
    getColors: publicProcedure
        .query(async ({ ctx }) => {
            const colorsFound = await ctx
                .db
                .select({
                    id: colors.id,
                    name: colors.name,
                })
                .from(colors);

            return colorsFound;
        }),
})