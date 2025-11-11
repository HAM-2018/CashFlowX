"use client";
import TransactionForm, { transactionSchema } from "@/components/transactions.form";
import { type Category } from "@/types/Category";
import z from "zod";
import { createTransaction } from "./action";
import { format } from "date-fns";
import { toast } from "sonner";


export default function NewTransactionForm({
    categories
}: {
    categories: Category[];
}) {

    const handleSubmit = async (data: z.infer<typeof transactionSchema>) => {
        const result = await createTransaction({
            amount: data.amount,
            transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
            categoryId: data.categoryId,
            description: data.description
        });
        if (result.error) {
            toast("Error", {description: result.message});
        }
        console.log(result.id);
    };
    return (
        
        <TransactionForm onSubmit={handleSubmit} categories={categories}/>
    )
}