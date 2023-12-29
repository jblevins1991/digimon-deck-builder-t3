import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { 
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from "~/server/api/trpc";
import { deckCard, decks } from "~/server/db/schema";

export const deckRouter = createTRPCRouter({
    createDeck: protectedProcedure
        .input(z.object({
            name: z.string(),
            userId: z.number(),
            strategy: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                const {
                    name,
                    strategy,
                    userId
                } = input;

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
                throw new Error('Could not insert a card.');
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
            id: z.number()
        }))
        .query(async ({ ctx, input }) => {
            try {
                const { id } = input;

                const decksFound = await ctx
                    .db
                    .select({
                        id: decks.id,
                        name: decks.name,
                        strategy: decks.strategy
                    })
                    .from(decks)
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
            try {
                const { id } = input;

                const decksFound = await ctx
                    .db
                    .select({
                        id: decks.id,
                        name: decks.name,
                        strategy: decks.strategy
                    })
                    .from(decks)
                    .where(eq(
                        decks.id,
                        id
                    ));

                return decksFound;
            } catch (error) {
                console.error(error);
                throw new Error("Could not retrieve cards.")
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