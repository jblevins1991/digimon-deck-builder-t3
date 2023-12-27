import { eq } from "drizzle-orm";
import { z } from "zod";

import { 
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from "~/server/api/trpc";
import { attributes, cards, sets, stages } from "~/server/db/schema";

export const cardRouter = createTRPCRouter({
    getCardsByPage: publicProcedure
        .input(z.object({
            limit: z.number(),
            offset: z.number()
        }))
        .query(async ({ ctx, input }) => {
            const { limit, offset  } = input;

            try {
                const cardsFound = await ctx
                    .db
                    .select({
                        name: cards.name,
                        bp: cards.bp,
                        effect: cards.effect,
                        inheritedEffect: cards.inheritedEffect,
                        imageAlt: cards.imageAlt,
                        image: cards.image,
                        level: cards.level,
                        attributeId: cards.attributeId,
                        setId: cards.setId,
                        stageId: cards.stageId
                    })
                    .from(cards)
                    .leftJoin(attributes, eq(
                        cards.attributeId,
                        attributes.id
                    ))
                    .leftJoin(sets, eq(
                        cards.setId,
                        sets.id
                    ))
                    .leftJoin(stages, eq(
                        cards.stageId,
                        stages.id
                    ))
                    .limit(limit)
                    .offset(offset);

                return cardsFound;
            } catch (error) {
                console.error(error);
                throw new Error("Could not retrieve cards.")
            }
        }),
})