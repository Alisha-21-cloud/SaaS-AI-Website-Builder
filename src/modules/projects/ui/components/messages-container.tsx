import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MessageCard } from "./message-card";
import { MessageForm } from "./message-form";
import { useEffect, useRef } from "react";
import { Fragment } from "@/generated/prisma";
import { MessageLoading } from "./message-loading";

interface props {
    projectId: string;
    activeFragment: Fragment | null;
    setActiveFragment: (fragment: Fragment | null) => void;
}

export const MessagesContainer = ({
    projectId,
    activeFragment,
    setActiveFragment
}: props) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const lastAssistantMessageIdRef = useRef<string | null>(null);

    const trpc = useTRPC();
    const { data: messages } = useSuspenseQuery(trpc.message.getMany.queryOptions({
        projectId: projectId
    }, {
        refetchInterval: 2000,
    }));


    useEffect(() => {
        const lastAssistantMessage = messages.findLast(
            (message) => message.role === "ASSISTANT",
        );

        if (
            lastAssistantMessage?.Fragment &&
            lastAssistantMessage.id !== lastAssistantMessageIdRef.current
        ) {
            setActiveFragment(lastAssistantMessage.Fragment);
            lastAssistantMessageIdRef.current = lastAssistantMessage.id
        }
    }, [messages, setActiveFragment]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages.length]);

    const lastMessage =  messages[messages.length - 1];
    const isLastMessageUser = lastMessage?.role === "USER";

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
                            isActiveFragment={activeFragment?.id === message.Fragment?.id}
                            onFragmentClick={() => setActiveFragment(message.Fragment)}
                            type={message.type}
                        />
                    ))}

                    {isLastMessageUser && <MessageLoading />}
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