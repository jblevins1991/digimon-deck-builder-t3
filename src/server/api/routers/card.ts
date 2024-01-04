import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { attributes, cardTypes, cards, sets, stages } from "~/server/db/schema";

export const cardRouter = createTRPCRouter({
    createCard: publicProcedure
        .input(z.object({
            name: z.string(),
            level: z.number().optional(),
            bp: z.number().optional(),
            effect: z.string().optional(),
            inheritedEffect: z.string().optional(),
            image: z.string(),
            imageAlt: z.string(),
            attributeId: z.number().optional(),
            cardTypeId: z.number(),
            setId: z.number(),
            stageId: z.number().optional(),
            typeId: z.number().optional()
        }))
        .mutation(async ({ ctx, input }) => {
            const {
                name,
                level,
                bp,
                effect,
                inheritedEffect,
                image,
                imageAlt,
                attributeId,
                cardTypeId,
                setId,
                stageId,
                typeId
            } = input;
            
            try {
                const cardCreated = await ctx
                    .db
                    .insert(cards)
                    .values({
                        name,
                        level,
                        bp,
                        effect,
                        inheritedEffect,
                        image,
                        imageAlt,
                        attributeId,
                        cardTypeId,
                        setId,
                        stageId,
                        typeId
                    });
                    
                return cardCreated;
            } catch (error) {
                console.error(error);
                throw new Error('Could not insert a card.');
            }
        }),
    getCardsByPage: publicProcedure
        .input(z.object({
            battlePower: z.object({
                end: z.number().optional(),
                start: z.number().optional(),
            }).optional(),
            level: z.number().optional(),
            attributes: z.array(z.number()).optional(),
            cardTypes: z.array(z.number()).optional(),
            sets: z.array(z.number()).optional(),
            stages: z.array(z.number()).optional(),
            searchTerm: z.string().optional(),
            limit: z.number(),
            offset: z.number()
        }))
        .query(async ({ ctx, input }) => {
            const {
                battlePower: battlePowerFilter,
                level: levelFilter,
                attributes: attributesFilter,
                sets: setsFilter,
                stages: stagesFilter,
                searchTerm,
                limit,
                offset
            } = input;

            try {
                const cardsFound = await ctx
                    .db
                    .select({
                        id: cards.id,
                        name: cards.name,
                        bp: cards.bp,
                        effect: cards.effect,
                        inheritedEffect: cards.inheritedEffect,
                        imageAlt: cards.imageAlt,
                        image: cards.image,
                        level: cards.level,
                        attributeName: sql`${attributes.name}`.as('attributeName'),
                        cardTypeName: sql`${cardTypes.name}`.as('cardTypeName'),
                        setName: sql`${sets.name}`.as('setName'),
                        stageName: sql`${stages.name}`.as('stageName'),
                    })
                    .from(cards)
                    .leftJoin(attributes, eq(
                        cards.attributeId,
                        attributes.id
                    ))
                    .leftJoin(cardTypes, eq(
                        cards.cardTypeId,
                        cardTypes.id
                    ))
                    .leftJoin(sets, eq(
                        cards.setId,
                        sets.id
                    ))
                    .leftJoin(stages, eq(
                        cards.stageId,
                        stages.id
                    ));

                return cardsFound;
            } catch (error) {
                console.error(error);
                throw new Error("Could not retrieve cards.")
            }
        }),
    getCardById: publicProcedure
        .input(z.object({
            id: z.number()
        }))
        .query(async ({ ctx, input }) => {
            const { id } = input;

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
                    .where(eq(cards.id, id));

                return cardsFound;
            } catch (error) {
                console.error(error);
                throw new Error("Could not retrieve cards.")
            }
        }),
})