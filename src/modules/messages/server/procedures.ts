import { inngest } from "@/inngest/client"
import {prisma} from "@/lib/db"
import { consumeCredits } from "@/lib/usage"
import { protectedProcedure, createTRPCRouter } from "@/trpc/init"

import { TRPCError } from "@trpc/server"
import { z } from "zod"

export const messageRoute = createTRPCRouter({
    getMany: protectedProcedure
        .input(
            z.object({
                projectId: z.string().min(1, { message: "Project ID is required" }),
            }),
        )
        .query(async ({ input, ctx }) => {
            const message = await prisma.message.findMany({
                where: {
                    projectId: input.projectId,
                    project: {
                        userId: ctx.auth.userId
                    },
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

    create: protectedProcedure
        .input(
            z.object({
                value: z.string().min(1, { message: "Value is required" }).max(10000, { message: "Value must be less than 10000 characters" }),
                projectId: z.string().min(1, { message: "Project ID is required" }),
            })
        )
        .mutation(async ({ input,ctx }) => {
            const existingProject = await prisma.project.findUnique({
                where : {
                    id: input.projectId,
                    userId: ctx.auth.userId,
                },
            });

            if (!existingProject) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" })
            }

            try {
                await consumeCredits();
            } catch (error) {
                if (error instanceof Error) {
                    throw new TRPCError({ code: "UNAUTHORIZED", message: error.message })
                } else {
                    throw new TRPCError({
                        code: "TOO_MANY_REQUESTS",
                        message: "You have reached your request limit"
                    })
                }
            }
            
            const createMessage = await prisma.message.create({
                data: {
                    projectId: existingProject.id,
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