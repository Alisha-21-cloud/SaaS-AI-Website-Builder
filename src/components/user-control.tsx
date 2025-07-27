"use client"

import { useCurrentTheme } from "@/hooks/use-current-theme"
import { UserButton } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

interface Props {
    showName?: boolean
}

export function UserControl({ showName }: Props) {
    const currentTheme = useCurrentTheme();

    return (
        <UserButton
            showName={showName}
            appearance={{
                elements: {
                    userButtonBox: "rounded-md!",
                    userButtonAvatarBox: "rounded-md! size-8!",
                    userButtonTriggerBox: "rounded-md!",
                },
                baseTheme: currentTheme === "dark" ? dark : undefined
            }}
        />
    )
}