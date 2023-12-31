import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { 
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from "~/server/api/trpc";
import { attributes, cards, deckCard, decks, sets, stages } from "~/server/db/schema";

export const deckRouter = createTRPCRouter({
    createDeck: publicProcedure
        .input(z.object({
            name: z.string(),
            userId: z.string(),
            strategy: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                const {
                    name,
                    strategy,
                    userId
                } = input;

                console.log('inputs: ', {
                    name, strategy, userId
                })

                const deckCreated = await ctx
                    .db
                    .insert(decks)
                    .values({
                        name,
                        strategy,
                        userId
                    });

                return deckCreated;
            } catch (error) {
                console.error(error);
                throw new Error(`Could not insert deck ${name}.`);
            }
        }),
    addToDeck: protectedProcedure
        .input(z.object({
            deckId: z.number(),
            cardId: z.number(),
            quantity: z.number()
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                const {
                    deckId,
                    cardId,
                    quantity
                } = input;

                const deckCardCreated = await ctx
                    .db
                    .insert(deckCard)
                    .values({
                        deckId,
                        cardId,
                        quantity
                    });

                return deckCardCreated;
            } catch (error) {
                console.error(error);
                throw new Error('Could not insert a card.');
            }
        }),
    updateQuantityOfCardInDeck: protectedProcedure
        .input(z.object({
            deckId: z.number(),
            cardId: z.number(),
            quantity: z.number()
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                const {
                    deckId,
                    cardId,
                    quantity
                } = input;

                const deckCardCreated = await ctx
                    .db
                    .update(deckCard)
                    .set({ quantity })
                    .where(and(
                        eq(deckCard.deckId, deckId),
                        eq(deckCard.cardId, cardId)
                    ));

                return deckCardCreated;
            } catch (error) {
                console.error(error);
                throw new Error('Could not insert a card.');
            }
        }),
    removeFromDeck: protectedProcedure
        .input(z.object({
            deckId: z.number(),
            cardId: z.number()
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                const {
                    deckId,
                    cardId
                } = input;

                const deckCardDeleted = await ctx
                    .db
                    .delete(deckCard)
                    .where(and(
                        eq(deckCard.deckId, deckId),
                        eq(deckCard.cardId, cardId)
                    ));

                return deckCardDeleted;
            } catch (error) {
                console.error(error);
                throw new Error('Could not insert a card.');
            }
        }),
    getDecksByUserId: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .query(async ({ ctx, input }) => {
            try {
                const { id } = input;

                const cardSq = ctx
                    .db
                    .select({
                        id: cards.id,
                        name: cards.name,
                        bp: cards.bp,
                        effect: cards.effect,
                        inheritedEffect: cards.inheritedEffect,
                        attribute: attributes.name,
                        stage: stages.name
                    })
                    .from(cards)
                    .leftJoin(attributes, eq(
                        attributes.id,
                        cards.attributeId
                    ))
                    .leftJoin(stages, eq(
                        stages.id,
                        cards.stageId,
                    ))
                    .where(eq(
                        deckCard.cardId,
                        cards.id
                    ))
                    .as('cardSq');

                const deckCardsSq = ctx
                    .db
                    .select({
                        id: deckCard.id,
                        cardId: deckCard.cardId,
                        deckId: deckCard.deckId,
                        name: cardSq.name,
                        bp: cardSq.bp,
                        effect: cardSq.effect,
                        inheritedEffect: cardSq.inheritedEffect,
                        attribute: cardSq.attribute,
                        stage: cardSq.stage,
                        quantity: deckCard.quantity
                    })
                    .from(deckCard)
                    .leftJoin(cardSq, eq(
                        deckCard.cardId,
                        cardSq.id
                    ))
                    .where(eq(
                        deckCard.deckId,
                        decks.id
                    ))
                    .as('deckCardsSq');

                const decksFound = await ctx
                    .db
                    .select({
                        id: decks.id,
                        name: decks.name,
                        strategy: decks.strategy,
                    })
                    .from(decks)
                    .leftJoin(deckCardsSq, eq(
                        decks.id,
                        deckCardsSq.deckId,
                    ))
                    .where(eq(
                        decks.userId,
                        id
                    ));

                return decksFound;
            } catch (error) {
                console.error(error);
                throw new Error("Could not retrieve cards.")
            }
        }),
    getDeckById: publicProcedure
        .input(z.object({
            id: z.number()
        }))
        .query(async ({ ctx, input }) => {
            const { id } = input;

            try {

                const cardSq = ctx
                    .db
                    .select({
                        cardId: cards.id,
                        cardBattlePower: cards.bp,
                        cardName: cards.name,
                        cardEffect: cards.effect,
                        cardInheritedEffect: cards.inheritedEffect,
                        cardAttributeName: attributes.name,
                        cardSetName: sets.name,
                        cardStageName: stages.name
                    })
                    .from(cards)
                    .leftJoin(attributes, eq(
                        attributes.id,
                        cards.attributeId
                    ))
                    .leftJoin(sets, eq(
                        sets.id,
                        cards.setId
                    ))
                    .leftJoin(stages, eq(
                        stages.id,
                        cards.stageId
                    ))
                    .as('cardSq');

                const deckSq = ctx
                    .db
                    .select({
                        deckId: decks.id,
                        deckName: decks.name,
                        deckStrategy: decks.strategy
                    })
                    .from(decks)
                    .as('deckSq');

                const deckCardsFound = await ctx
                    .db
                    .select({
                        id: deckSq.deckId,
                        deckName: deckSq.deckName,
                        deckStrategy: deckSq.deckStrategy,
                    })
                    .from(deckCard)
                    .leftJoin(deckSq, eq(
                        deckSq.deckId,
                        deckCard.deckId
                    ))
                    .leftJoin(cardSq, eq(
                        cardSq.cardId,
                        deckCard.cardId
                    ))
                    .where(eq(
                        deckCard.deckId,
                        id
                    ));

                return deckCardsFound;
            } catch (error) {
                console.error(error);
                throw new Error(`Could not retrieve deck by id ${id}.`);
            }
        }),
    getDecksByPage: publicProcedure
        .input(z.object({
            limit: z.number(),
            offset: z.number()
        }))
        .query(async ({ ctx, input }) => {
            const { limit, offset } = input;

            try {
                const decksFound = await ctx
                    .db
                    .select({
                        id: decks.id,
                        name: decks.name,
                        strategy: decks.strategy
                    })
                    .from(decks)
                    .limit(limit)
                    .offset(offset);

                return decksFound;
            } catch (error) {
                console.error(error);
                throw new Error("Could not retrieve cards.")
            }
        }),
})