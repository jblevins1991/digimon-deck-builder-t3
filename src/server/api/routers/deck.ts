import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { 
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from "~/server/api/trpc";
import { attributes, cardTypes, cards, deckCard, decks, sets, stages, types } from "~/server/db/schema";

export const deckRouter = createTRPCRouter({
    createDeck: publicProcedure
        .input(z.object({
            name: z.string(),
            userId: z.string(),
            strategy: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            const {
                name,
                strategy,
                userId
            } = input;

            try {

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
    addSingleToDeck: protectedProcedure
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

                const deckCardAdded = await ctx
                    .db
                    .insert(deckCard)
                    .values({
                        deckId,
                        cardId,
                        quantity: 1
                    });

                return deckCardAdded;
            } catch (error) {
                console.error(error);
                throw new Error('Could not insert a card.');
            }
        }),
    incrementQuantityInDeckBy: protectedProcedure
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

                const copiesOfCardInDeck = await ctx
                    .db
                    .select({
                        quantity: deckCard.quantity
                    })
                    .from(deckCard)
                    .where(
                        and(
                            eq(deckCard.deckId, deckId),
                            eq(deckCard.cardId, cardId)
                        )
                    );

                const newQuantity = !!copiesOfCardInDeck && copiesOfCardInDeck.length > 0
                    ? quantity + (copiesOfCardInDeck[0]?.quantity ?? 0)
                    : 1;

                if (copiesOfCardInDeck.length > 0 && !!copiesOfCardInDeck[0]?.quantity) {
                    const cardUpdated = await ctx
                        .db
                        .update(deckCard)
                        .set({
                            quantity: newQuantity
                        });

                    return cardUpdated;
                }

                const cardAdded = await ctx
                    .db
                    .insert(deckCard)
                    .values({
                        deckId,
                        cardId,
                        quantity
                    });

                return cardAdded;
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

                if (quantity <= 0) {
                    const deckCardDeleted = await ctx
                        .db
                        .delete(deckCard)
                        .where(and(
                            eq(deckCard.deckId, deckId),
                            eq(deckCard.cardId, cardId)
                        ));

                        return deckCardDeleted;
                }

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
    decrementQuantityInDeckBy: protectedProcedure
        .input(z.object({
            deckId: z.number(),
            cardId: z.number(),
            quantity: z.number(),
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                const {
                    deckId,
                    cardId,
                    quantity
                } = input;

                const copiesOfCardInDeck = await ctx
                    .db
                    .select({
                        quantity: deckCard.quantity
                    })
                    .from(deckCard)
                    .where(
                        and(
                            eq(deckCard.deckId, deckId),
                            eq(deckCard.cardId, cardId)
                        )
                    );

                const newQuantity = !!copiesOfCardInDeck && copiesOfCardInDeck.length > 0
                    ? quantity - (copiesOfCardInDeck[0]?.quantity ?? 0)
                    : 1;

                console.log(newQuantity);

                if (newQuantity <= 0) {
                    const deckCardDeleted = await ctx
                        .db
                        .delete(deckCard)
                        .where(and(
                            eq(deckCard.deckId, deckId),
                            eq(deckCard.cardId, cardId)
                        ));

                        return deckCardDeleted;
                }

                const cardUpdated = await ctx
                    .db
                    .update(deckCard)
                    .set({
                        quantity: newQuantity
                    });

                return cardUpdated;
            } catch (error) {
                console.error(error);
                throw new Error('Could not insert a card.');
            }
        }),
    deleteFromDeck: protectedProcedure
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

                const query = await ctx
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

                return query;
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
                const cardSubQuery = ctx
                    .db
                    .select({
                        lookupId: sql`${cards.id}`.as('lookupId'),
                        cardName: sql`${cards.name}`.as('cardName'),
                        cardImageAlt: sql`${cards.imageAlt}`.as('cardImageAlt'),
                        cardImage: sql`${cards.image}`.as('cardImage'),
                        cardBattlePower: sql`${cards.bp}`.as('cardBattlePower'),
                        cardEffect: sql`${cards.effect}`.as('cardEffect'),
                        cardInheritedEffect: sql`${cards.inheritedEffect}`.as('cardInheritedEffect'),
                        cardAttributeName: sql`${attributes.name}`.as('cardAttributeName'),
                        cardCardTypeName: sql`${cardTypes.name}`.as('cardCardTypeName'),
                        cardSetName: sql`${sets.name}`.as('cardSetName'),
                        cardStageName: sql`${stages.name}`.as('cardStageName'),
                        cardTypeName: sql`${types.name}`.as('cardTypeName'),
                    })
                    .from(cards)
                    .leftJoin(attributes, eq(
                        attributes.id,
                        cards.attributeId
                    ))
                    .leftJoin(cardTypes, eq(
                        cardTypes.id,
                        cards.cardTypeId
                    ))
                    .leftJoin(sets, eq(
                        sets.id,
                        cards.setId
                    ))
                    .leftJoin(stages, eq(
                        stages.id,
                        cards.stageId
                    ))
                    .leftJoin(types, eq(
                        types.id,
                        cards.cardTypeId
                    ))
                    .as('cardSubQuery');

                const deckCardsFound = await ctx
                    .db
                    .select({
                        deckName: sql`${decks.name}`.as('deckName'),
                        deckStrategy: sql`${decks.strategy}`.as('deckStrategy'),
                        quantity: deckCard.quantity,
                        cardId: sql`${cardSubQuery.lookupId}`.as('cardsId'),
                        cardName: sql`${cardSubQuery.cardName}`.as('cardName'),
                        cardImageAlt: sql`${cardSubQuery.cardImageAlt}`.as('cardImageAlt'),
                        cardImage: sql`${cardSubQuery.cardImage}`.as('cardImage'),
                        cardCardTypeName: sql`${cardSubQuery.cardCardTypeName}`.as('cardCardTypeName'),
                        cardBattlePower: sql`${cardSubQuery.cardBattlePower}`.as('cardBattlePower'),
                        cardEffect: sql`${cardSubQuery.cardEffect}`.as('cardEffect'),
                        cardInheritedEffect: sql`${cardSubQuery.cardInheritedEffect}`.as('cardInheritedEffect'),
                        cardAttributeName: sql`${cardSubQuery.cardAttributeName}`.as('cardAttributeName'),
                        cardSetName: sql`${cardSubQuery.cardSetName}`.as('cardSetName'),
                        cardStageName: sql`${cardSubQuery.cardStageName}`.as('cardStageName'),
                        cardTypeName: sql`${cardSubQuery.cardTypeName}`.as('cardTypeName'),
                    })
                    .from(deckCard)
                    .leftJoin(decks, eq(
                        deckCard.deckId,
                        decks.id,
                    ))
                    .leftJoin(cardSubQuery, eq(
                        deckCard.cardId,
                        cardSubQuery.lookupId,
                    ))
                    .where(eq(
                        deckCard.deckId,
                        id,
                    ));

                console.log(`deck cards found: ${deckCardsFound}`)

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