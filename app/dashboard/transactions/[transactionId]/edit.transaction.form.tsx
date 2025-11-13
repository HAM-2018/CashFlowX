"use client";
import TransactionForm, { transactionSchema } from "@/components/transactions.form";
import { type Category } from "@/types/Category";
import { Transaction } from "@/types/Transaction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

export default function EditTransactionForm({
    categories,
    transaction
}: {
    categories: Category[];
    transaction: Transaction;
}) {

    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof transactionSchema>) => {
        const result: any = {};

        if (result.error) {
            toast.error("Error", 
            {description: result.message});
            return;
        }
        toast.success("Success",{
            description: "Transaction updated"
        });
        router.push(`/dashboard/transactions?month=
            ${data.transactionDate.getMonth()+1}
            &year=${data.transactionDate.getFullYear()}`)
    };
    return (
        <TransactionForm defaultValues={{
            amount: Number(transaction.amount),
            categoryId: transaction.categoryId,
            description: transaction.description,
            transactionDate: new Date(transaction.transactionDate),
            transactionType: categories.find(category => category.id === transaction.categoryId)?.type ?? "income"
        }} onSubmit={handleSubmit} categories={categories}/>
    )
}
