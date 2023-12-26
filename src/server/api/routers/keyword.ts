import { 
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { keywords } from "~/server/db/schema";

export const keywordRouter = createTRPCRouter({
    getKeywords: publicProcedure
        .query(async ({ ctx }) => {
            const keywordsFound = await ctx
                .db
                .select({
                    id: keywords.id,
                    name: keywords.name,
                })
                .from(keywords);

            return keywordsFound;
        }),
})