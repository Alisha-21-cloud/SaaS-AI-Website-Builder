"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { ReactNode } from "react"

interface HintProps {
    children: ReactNode
    text: string
    side?: "top" | "right" | "bottom" | "left"
    algin?: "start" | "center" | "end"
}

export function Hint({
    children,
    text,
    side = "top",
    algin = "center",
}: HintProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>

                <TooltipContent side={side} align={algin}>
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};