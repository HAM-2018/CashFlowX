"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const transactionSchema = z.object({
    transactionType: z.enum(["income", "expense"]),
    categoryId: z.coerce.number().positive("Please select a category!!"),
    date: z.coerce.date().max(addDays(new Date(), 1), "Transaction Date cannot be in the future!"),
    amount: z.coerce.number().positive("Amount must be greater than zero!"),
    description: z.string().min(3, "description must contain at least 3 characters").max(300, "Description cannot exceed 300 characters!"),
});

export default function TransactionForm() {
    const form = useForm<z.infer<typeof transactionSchema>>({
        resolver: zodResolver(transactionSchema) as any, //Reapproach resolver error later
        defaultValues: {
            amount: 0,
            categoryId: 0,
            description: "",
            date: new Date(),
            transactionType: "income",
        },
    });
    const handleSubmit = async (
        data: z.infer<typeof transactionSchema>
    ) => {};


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <fieldset className="grid grid-cols-2 gap-y-5 gap-x-2">
                <FormField control={form.control} name="transactionType" render={({ field }) => {
                    return (
                        <FormItem>
                            <FormLabel>
                                Transaction Type
                            </FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="income">
                                            Income
                                        </SelectItem>
                                        <SelectItem value="expense">
                                            Expense
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }} />
                <FormField control={form.control} name="categoryId" render={({ field }) => {
                    return (
                        <FormItem>
                            <FormLabel>
                                Category
                            </FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value.toString()}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }} />
                </fieldset>
            </form>
        </Form>
    )
}