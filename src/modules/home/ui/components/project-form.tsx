"use client"

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { z } from "zod";
import { PROJECT_TEMPLATES } from "../../constants";


const formSchema = z.object({
    value: z.string()
        .min(1, { message: "Value is required" })
        .max(10000, { message: "Value must be less than 10000 characters" }),
})

export function ProjectForm() {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: ""
        }
    })

    const createProject = useMutation(trpc.projects.create.mutationOptions({
        onSuccess: (data) => {
            queryClient.invalidateQueries(
                trpc.projects.getMany.queryOptions()
            );
            router.push(`/projects/${data?.id}`)
            // TODO: Invalidate usage status
        },
        onError: (error) => {
            // TODO: Redirect to pricing page if specific error
            toast.error("Something went wrong", {
                description: error.message
            })
        }
    }))

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await createProject.mutateAsync({
            value: values.value,
        });
    };

    const onSelect = (content: string) => {
        form.setValue("value", content, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    };

    const [isFocused, setIsFocused] = useState(false);

    const isPending = createProject.isPending
    const isDisabled = isPending || !form.formState.isValid

    return (
        <Form {...form}>
            <section className="space-y-6">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn(
                        "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
                        isFocused && "shadow-xs",
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
                <div className="flex-wrap justify-center gap-2 hidden md:flex max-w-3xl">
                    {PROJECT_TEMPLATES.map((template) => (
                        <Button
                            key={template.title}
                            variant="outline"
                            size="sm"
                            className="bg-white dark:bg-sidebar"
                            onClick={() =>onSelect(template.prompt)}
                        >
                            {template.emoji} {template.title}
                        </Button>
                    ))}
                </div>
            </section>
        </Form>
    )
}