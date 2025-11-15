import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "..";
import { categoriesTable, transactionTable } from "../schema";
import { desc, eq } from "drizzle-orm";

export async function getRecentTransactions() {
    const {userId} = await auth();

    if(!userId) return [];

    const transactions = await db.select({
        id: transactionTable.id,
        description: transactionTable.description,
        amount: transactionTable.amount,
        transactionDate: transactionTable.transactionDate,
        categoryName: categoriesTable.name,
        categoryType: categoriesTable.type
    })
    .from(transactionTable)
    .where(eq(transactionTable.userId, userId))
    .orderBy(desc(transactionTable.transactionDate))
    .limit(5).leftJoin(categoriesTable, 
    eq(transactionTable.categoryId, categoriesTable.id));

    return transactions;
};