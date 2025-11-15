"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "..";
import { transactionTable } from "../schema";
import { and, eq } from "drizzle-orm";


export async function deleteTransaction(transactionId: number) {
    const {userId} = await auth();

    if (!userId) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    await db.delete(transactionTable).where(
        and(eq(transactionTable.id, transactionId),
        eq(transactionTable.userId, userId))
    );
}