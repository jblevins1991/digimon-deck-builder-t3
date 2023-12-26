import { 
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { attributes, cardTimings, cardTypes, colors, keywords, sets, stages, types } from "~/server/db/schema";

export const filterRouter = createTRPCRouter({
    getFilters: publicProcedure
        .query(async ({ ctx }) => {
            try {
                const attributesFound = await ctx
                    .db
                    .select({
                        id: attributes.id,
                        name: attributes.name,
                    })
                    .from(attributes);

                const cardTimingsFound = await ctx
                    .db
                    .select({
                        id: cardTimings.id,
                        name: cardTimings.name,
                    })
                    .from(cardTimings);

                const cardTypesFound = await ctx
                    .db
                    .select({
                        id: cardTypes.id,
                        name: cardTypes.name,
                    })
                    .from(cardTypes);

                const colorsFound = await ctx
                    .db
                    .select({
                        id: colors.id,
                        name: colors.name,
                    })
                    .from(colors);

                const keywordsFound = await ctx
                    .db
                    .select({
                        id: keywords.id,
                        name: keywords.name,
                    })
                    .from(keywords);

                
                const setsFound = await ctx
                    .db
                    .select({
                        id: sets.id,
                        name: sets.name,
                    })
                    .from(sets);

                const stagesFound = await ctx
                    .db
                    .select({
                        id: stages.id,
                        name: stages.name,
                    })
                    .from(stages);

                const typesFound = await ctx
                    .db
                    .select({
                        id: types.id,
                        name: types.name,
                    })
                    .from(types);

                return {
                    attributes: attributesFound,
                    cardTimings: cardTimingsFound,
                    cardTypes: cardTypesFound,
                    colors: colorsFound,
                    keywords: keywordsFound,
                    sets: setsFound,
                    stages: stagesFound,
                    types: typesFound
                };
            } catch (error) {
                throw new Error("Could not retrieve filters.");
            }
        }),
})