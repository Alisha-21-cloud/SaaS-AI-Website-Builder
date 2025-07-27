import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { z } from "zod";
import { Usage } from "./usage";
import { useRouter } from "next/navigation";

interface props {
    projectId: string
}

const formSchema = z.object({
    value: z.string()
        .min(1, { message: "Value is required" })
        .max(10000, { message: "Value must be less than 10000 characters" }),
})

export function MessageForm({ projectId }: props) {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const { data: usage } = useQuery(trpc.usage.status.queryOptions());

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: ""
        }
    })

    const createMessage = useMutation(trpc.message.create.mutationOptions({
        onSuccess: () => {
            form.reset();
            queryClient.invalidateQueries(
                trpc.message.getMany.queryOptions({
                    projectId
                })
            )
            // TODO: Invalidate usage status
            queryClient.invalidateQueries(
                trpc.usage.status.queryOptions()
            )
        },
        onError: (error) => {
            // TODO: Redirect to pricing page if specific error
            toast.error(error.message);

            if (error.data?.code === "TOO_MANY_REQUESTS") {
                router.push("/pricing")
            }
        }
    }))

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await createMessage.mutateAsync({
            value: values.value,
            projectId
        })
    }

    const [isFocused, setIsFocused] = useState(false);
    const showUsage = !!usage;

    const isPending = createMessage.isPending
    const isDisabled = isPending || !form.formState.isValid

    return (
        <Form {...form}>
            {showUsage && (
                <Usage
                    points={usage?.remainingPoints || 0}
                    msBeforeNext={usage?.msBeforeNext || 0}
                />
            )}

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
                    isFocused && "shadow-xs",
                    showUsage && "rounded-t-none"
                )}
            >
                <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                        <TextareaAutosize
                            {...field}
                            disabled={isPending}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            minRows={2}
                            maxRows={8}
                            className="pt-4 resize-none border-none w-full outline-none bg-transparent"
                            placeholder="What would you like to build?"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                    e.preventDefault();
                                    form.handleSubmit(onSubmit)();
                                }
                            }}
                        />
                    )}
                />

                <div className="flex gap-x-2 items-end justify-between pt-2">
                    <div className="text-[10px] to-muted-foreground font-mono">
                        <kbd className="ml-auto pointer-events-none inline-flex h-5 scale-none items-center gap-1 rounded border border-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                            <span>&#8984;</span> Enter
                        </kbd>

                        &nbsp;to submit
                    </div>

                    <Button
                        disabled={isDisabled}
                        className={cn(
                            "size-8 rounded-full",
                            isDisabled && "bg-muted-foreground border"
                        )}
                    >
                        {isPending ? (
                            <Loader2Icon className="size-4 animate-spin" />
                        ) : (
                            <ArrowUpIcon />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}