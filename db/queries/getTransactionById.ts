import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "..";
import { transactionTable } from "../schema";
import { and, eq } from "drizzle-orm";

export async function getTransactionById(transactionId: number) {
    const {userId} = await auth();

    if (!userId) return null;

    const [transaction] = await db
    .select()
    .from(transactionTable)
    .where(and(eq(transactionTable.id, transactionId),
    eq(transactionTable.userId, userId )));

    return transaction;
}