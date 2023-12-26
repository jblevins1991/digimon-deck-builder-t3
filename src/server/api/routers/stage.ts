import { 
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { stages } from "~/server/db/schema";

export const stageRouter = createTRPCRouter({
    getStages: publicProcedure
        .query(async ({ ctx }) => {
            const stagesFound = await ctx
                .db
                .select({
                    id: stages.id,
                    name: stages.name,
                })
                .from(stages);

            return stagesFound;
        }),
})