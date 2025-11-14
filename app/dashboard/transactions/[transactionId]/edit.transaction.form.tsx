"use client";
import TransactionForm, { transactionSchema } from "@/components/transactions.form";
import { updateTransaction } from "@/db/mutations/updateTransaction";
import { type Category } from "@/types/Category";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

export default function EditTransactionForm({
    categories,
    transaction
}: {
    categories: Category[];
    transaction: {
        id: number;
        categoryId: number;
        amount: string;
        description: string;
        transactionDate: string;
    }
}) {

    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof transactionSchema>) => {
        const result: any = updateTransaction({
            id: transaction.id,
            amount: data.amount,
            description: data.description,
            categoryId: data.categoryId,
            transactionDate: format(data.transactionDate, "yyy-MM-dd")
        });

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
