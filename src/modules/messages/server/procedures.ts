import { inngest } from "@/inngest/client"
import {prisma} from "@/lib/db"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"
import { z } from "zod"

export const messageRoute = createTRPCRouter({
    getMany: baseProcedure
        .query(async () => {
            const message = await prisma.message.findMany({
                orderBy: {
                    updatedAt: "asc",
                },
            });
            
            return message;
        })
    ,

    create: baseProcedure
        .input(
            z.object({
                value: z.string().min(1, { message: "Message is required" }),
            })
        )
        .mutation(async ({ input }) => {
            const createMessage = await prisma.message.create({
                data: {
                    content: input.value,
                    role: "USER",
                    type: "RESULT",
                }
            })

            await inngest.send({
                name: "code-agent/run",
                data: {
                    value: input.value,
                },
            })

            return createMessage;
        }),
}) 