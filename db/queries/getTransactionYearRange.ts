import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "..";
import { transactionTable } from "../schema";
import { asc, eq } from "drizzle-orm";

export async function getTransactionYearRange() {
    const {userId} = await auth();

    if(!userId) {
        return [];
    }
    const [earliestTransaction] = await db
    .select()
    .from(transactionTable)
    .where(eq(transactionTable.userId, userId))
    .orderBy(asc(transactionTable.transactionDate))
    .limit(1);

    const today = new Date();
    const currentYear = today.getFullYear();
    const earliestYear = earliestTransaction 
    ? new Date(earliestTransaction.transactionDate).getFullYear() 
    : currentYear;

    const years = Array.from({length: currentYear - earliestYear + 1})
    .map((_, i) =>(currentYear - i));

    return years;

}