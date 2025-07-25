import Image from "next/image";
import { useEffect, useState } from "react";

const ShimmerMessages = () => {
    const message = [
        "Thinking...",
        "Loading...",
        "Generating...",
        "Analyzing your request...",
        "Building your website...",
        "Crafting components...",
        "Optimizing layouts...",
        "Adding final touches...",
        "Almost ready...",
    ];

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const internal = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % message.length);
        }, 2000);

        return () => clearInterval(internal);
    }, [message.length]);

    return (
        <div className="flex items-center gap-2">
            <span className="text-base text-muted-foreground animate-pulse">
                {message[currentMessageIndex]}
            </span>
        </div>
    );
};

export const MessageLoading = () => {
    return (
        <div className="flex flex-col group px-2 pb-4">
            <div className="flex items-center gap-2 mb-2">
                <Image
                    src="/logo.svg"
                    alt="Noovix"
                    width={18}
                    height={18}
                    className="shrink-0"
                />

                <span className="text-sm font-medium">Noovix</span>
            </div>

            <div className="pl-8.5 flex flex-col gap-y-4">
                <ShimmerMessages />
            </div>
        </div>
    )
}