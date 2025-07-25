import { inngest } from "@/inngest/client"
import {prisma} from "@/lib/db"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"
import { z } from "zod"

export const messageRoute = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                projectId: z.string().min(1, { message: "Project ID is required" }),
            }),
        )
        .query(async ({ input }) => {
            const message = await prisma.message.findMany({
                where: {
                    projectId: input.projectId
                },
                include: {
                    Fragment: true
                },
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
                value: z.string().min(1, { message: "Value is required" }).max(10000, { message: "Value must be less than 10000 characters" }),
                projectId: z.string().min(1, { message: "Project ID is required" }),
            })
        )
        .mutation(async ({ input }) => {
            const createMessage = await prisma.message.create({
                data: {
                    projectId: input.projectId,
                    content: input.value,
                    role: "USER",
                    type: "RESULT",
                }
            })

            await inngest.send({
                name: "code-agent/run",
                data: {
                    value: input.value,
                    projectId: input.projectId,
                },
            });

            return createMessage;
        }),
}) 