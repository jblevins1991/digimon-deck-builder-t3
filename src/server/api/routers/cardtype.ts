import { 
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { cardTypes } from "~/server/db/schema";

export const cardTypeRouter = createTRPCRouter({
    getCardTypes: publicProcedure
        .query(async ({ ctx }) => {
            const cardTypesFound = await ctx
                .db
                .select({
                    id: cardTypes.id,
                    name: cardTypes.name,
                })
                .from(cardTypes);

            return cardTypesFound;
        }),
})