import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MessageCard } from "./message-card";
import { MessageForm } from "./message-form";
import { useEffect, useRef } from "react";

interface props {
    projectId: string
}

export function MessagesContainer({ projectId }: props) {
    const bottomRef = useRef<HTMLDivElement>(null);

    const trpc = useTRPC();
    const { data: messages } = useSuspenseQuery(trpc.message.getMany.queryOptions({
        projectId: projectId
    }))

    useEffect(() => {
        const lastAssistantMessage = messages.findLast(
            (message) => message.role === "ASSISTANT"
        )

        if (lastAssistantMessage) {
            // TODO: Set active fragment
        }
    }, [messages])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages.length])

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="pt-2 pr-1">
                    {messages.map((message) => (
                        <MessageCard
                            key={message.id}
                            content={message.content}
                            role={message.role}
                            fragment={message.Fragment}
                            createdAt={message.createdAt}
                            isActiveFragment={false}
                            onFragmentClick={() => { }}
                            type={message.type}
                        />
                    ))}

                    <div ref={bottomRef} />
                </div>
            </div>

            <div className="relative p-3 pt-1">
                <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-t from-background/70 to-transparent pointer-events-none" />
                <MessageForm projectId={projectId} />
            </div>
        </div>
    )
}