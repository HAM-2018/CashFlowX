"use server";
import { transactionSchema } from "@/validation/transactionSchema";
import { auth } from "@clerk/nextjs/server";
import z from "zod";
import { transactionTable } from "../schema";
import { db } from "..";
import { and, eq } from "drizzle-orm";


const updateTransactionSchema = transactionSchema.and(z.object({
    id: z.number()
}));

export async function updateTransaction(data: {
    id: number;
    transactionDate: string;
    description: string;
    amount: number;
    categoryId: number

}) {
    const {userId} = await auth();

    if(!userId) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    const validation = updateTransactionSchema.safeParse(data);

    if(!validation.success) {
        return {
            error: true,
            message: validation.error.issues[0].message
        }
    }
    await db.update(transactionTable).set({
        description: data.description,
        amount: data.amount.toString(),
        transactionDate: data.transactionDate,
        categoryId: data.categoryId,
    }).where(and(eq(transactionTable.id, data.id),
    eq(transactionTable.userId, userId)));
}
