import { 
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { attributes } from "~/server/db/schema";

export const attributeRouter = createTRPCRouter({
    getAttributes: publicProcedure
        .query(async ({ ctx }) => {
            const attributesFound = await ctx
                .db
                .select({
                    id: attributes.id,
                    name: attributes.name,
                })
                .from(attributes);

            return attributesFound;
        }),
})