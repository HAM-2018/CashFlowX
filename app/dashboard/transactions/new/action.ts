"use server"

import { db } from "@/db";
import { transactionTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { addDays, subYears } from "date-fns";
import z from "zod";

const transactionSchema = z.object({
    amount: z.number().positive("Amount must be > 0"),
    description: z.string().min(3, "description must contain at least 3 characters").max(300, "Description cannot exceed 300 characters!"),
    categoryId: z.number().positive("Cateogry ID is invalid"),
    transactionDate: z.coerce.date().min(subYears(new Date(), 1)).max(addDays(new Date(), 1))
});

export const createTransaction = async (data: {
    amount: number;
    transactionDate: string;
    description: string;
    categoryId: number;
}) => {
    const {userId} = await auth();

    if(!userId) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    const validation = transactionSchema.safeParse(data);

    if(!validation.success) {
        return {
            error: true,
            message: validation.error.issues[0].message
        }
    }
    const [transaction] = await db.insert(transactionTable).values({
        userId,
        amount: data.amount.toString(),
        description: data.description,
        categoryId: data.categoryId,
        transactionDate: data.transactionDate,
    }).returning();

    return {
        id: transaction.id
    }
};