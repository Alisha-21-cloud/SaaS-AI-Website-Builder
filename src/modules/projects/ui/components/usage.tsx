import { useAuth } from "@clerk/nextjs"
import { formatDuration, intervalToDuration } from "date-fns"
import { CrownIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"

interface props {
    points: number
    msBeforeNext: number
}

export function Usage({
    points,
    msBeforeNext
}: props) {
    const { has } = useAuth();
    const hasProAccess = has?.({ plan: "pro" });

    const resetTime = useMemo(() => {
        try {
            return formatDuration(
                intervalToDuration({
                    start: new Date(),
                    end: new Date(Date.now() + msBeforeNext)
                }),
                {
                    format: ["months", "days", "hours", "minutes", "seconds"]
                }
            )
        } catch (error) {
            console.error("Error formatting duration", error)
            return "Soon"
        }
    }, [msBeforeNext])

    return (
        <div className="rounded-t-xl bg-background border border-b-0 p-2.5">
            <div className="flex items-center gap-x-2">
                <div>
                    <p className="text-sm">
                        {points} {hasProAccess ? "" : "free"} points
                    </p>

                    <p className="text-xs text-muted-foreground">
                        Reset in{" "}{resetTime}
                    </p>
                </div>

                {!hasProAccess && (
                    <Button
                        asChild
                        variant="tertiary"
                        size="sm"
                        className="ml-auto"
                    >
                        <Link href="/pricing">
                            <CrownIcon /> Upgrade
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    )
}