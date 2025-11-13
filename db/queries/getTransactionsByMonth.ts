import "server-only"; // Ensures can not be imported to client components
import { db } from "@/db";
import { categoriesTable, transactionTable } from "../schema";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { format } from "date-fns";

export async function getTransactionsByMonth({
    month, year
}: {
    month: number;
    year: number;
}) {
    const {userId} = await auth();
    if (!userId) {
        return null;
    }
    const earliest = new Date(year, month -1, 1);
    const latest = new Date(year, month, 0);

    const transactions = await db
    .select({
        id: transactionTable.id,
        description: transactionTable.description,
        amount: transactionTable.amount,
        transactionDate: transactionTable.transactionDate,
        categoryName: categoriesTable.name,
        categoryType: categoriesTable.type
    })
    .from(transactionTable)
    .where(
        and(eq(transactionTable.userId, userId), 
        gte(transactionTable.transactionDate, format(earliest, "yyyy-MM-dd")),
        lte(transactionTable.transactionDate, format(latest, "yyyy-MM-dd"))))
        .orderBy(desc(transactionTable.transactionDate))
        .leftJoin(categoriesTable, eq(transactionTable.categoryId, categoriesTable.id));

    return transactions;
}