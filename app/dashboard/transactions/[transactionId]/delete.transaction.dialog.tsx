"use client"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteTransaction } from "@/db/mutations/deleteTransaction";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function DeleteTransactionDialog({
    transactionId,
    transactionDate,
}: {
    transactionId: number;
    transactionDate: string;
}) {

    const router = useRouter();

    const handleDelete = async () => {
        const result = await deleteTransaction(transactionId);

        if (result?.error) {
             toast.error("Error", 
            {description: result.message});
            return;
        }
         toast.success("Success", 
            {description: "Transaction deleted"});

            const [year, month] = transactionDate.split("-");
            router.push(`/dashboard/transactions?month=${month}&year=${year}`)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" className="hover:scale-105">
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this transaction.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <Button onClick={handleDelete} variant="destructive" className="hover:scale-105">
                       Delete 
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

}