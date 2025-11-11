"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { type Category } from "@/types/Category";

export const transactionSchema = z.object({
    transactionType: z.enum(["income", "expense"]),
    categoryId: z.coerce.number().positive("Please select a category!"),
    transactionDate: z.coerce.date().max(addDays(new Date(), 1), "Transaction Date cannot be in the future!"),
    amount: z.coerce.number().positive("Amount must be greater than 0!"),
    description: z.string().min(3, "description must contain at least 3 characters").max(300, "Description cannot exceed 300 characters!"),
});

type Props = {
    categories: Category[];
    onSubmit: (data: z.infer<typeof transactionSchema>) => Promise<void>;
};

export default function TransactionForm({
    categories, onSubmit }:Props) {
    const form = useForm<z.infer<typeof transactionSchema>>({
        resolver: zodResolver(transactionSchema) as any, //Reapproach resolver error later
        defaultValues: {
            amount: 0,
            categoryId: 0,
            description: "",
            transactionDate: new Date(),
            transactionType: "income",
        },
    });
    

    const transactionType = form.watch("transactionType");
    const filteredCategories = categories.filter((category) => category.type === transactionType);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset 
                disabled={form.formState.isSubmitting} 
                className="grid grid-cols-2 gap-y-5 gap-x-2"
                >
                <FormField control={form.control} name="transactionType" render={({ field }) => {
                    return (
                        <FormItem>
                            <FormLabel>
                                Transaction Type
                            </FormLabel>
                            <FormControl>
                                <Select onValueChange={(newValue) => {
                                     field.onChange(newValue);
                                     form.setValue("categoryId", 0);
                                    }} 
                                     value={field.value}>
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
                                        {filteredCategories.map(category => (
                                            <SelectItem key={category.id} value={category.id.toString()}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }} />
                <FormField control={form.control} name="transactionDate" render={({ field }) => {
                    return (
                        <FormItem>
                            <FormLabel>
                                Transaction Date
                            </FormLabel>
                            <FormControl>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant="outline"
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon />
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar 
                                    mode="single" 
                                    selected={field.value} 
                                    onSelect={field.onChange}
                                    disabled={{
                                        after: addDays(new Date(), 1),
                                    }}
                                    />
                                </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }} />
                <FormField control={form.control} name="amount" render={({ field }) => {
                    return (
                        <FormItem>
                            <FormLabel>
                                Amount
                            </FormLabel>
                            <FormControl>
                                <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }} />
                </fieldset>
                <fieldset
                disabled={form.formState.isSubmitting}
                className="mt-5 flex-col gap-5" 
                >
                    <FormField control={form.control} name="description" render={({ field }) => {
                    return (
                        <FormItem>
                            <FormLabel>
                                Description
                            </FormLabel>
                            <FormControl>
                                <Input {...field} /> 
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }} />
                    <div className="flex items-center gap-3 mt-5">
                    <Button type="submit" className=" w-50">
                        Submit
                    </Button>
                    <div className="flex items-center space-x-2">
                        <Switch id="set-recurring" />
                        <Label htmlFor="set-recurring">Set Recurring</Label>
                    </div>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}