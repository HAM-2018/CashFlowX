import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "..";
import { and, eq, sql, sum } from "drizzle-orm";
import { categoriesTable, transactionTable } from "../schema";

export async function getAnnualCashFlow(year: number) {
    const {userId} = await auth();

    if(!userId) return [];

    const month = sql`EXTRACT(MONTH FROM ${transactionTable.transactionDate})`

    const cashFlow = await db.select({
        month,
        totalIncome: sum(
            sql`CASE WHEN ${categoriesTable.type} = 'income' THEN ${transactionTable.amount} ELSE 0 END`),
        totalExpense: sum(
            sql`CASE WHEN ${categoriesTable.type} = 'expense' THEN ${transactionTable.amount} ELSE 0 END`)
        }).from(transactionTable)
        .leftJoin(categoriesTable, eq(transactionTable.categoryId, categoriesTable.id))
        .where(
        and(
        eq(transactionTable.userId, userId),
        sql`EXTRACT(YEAR FROM ${transactionTable.transactionDate}) = ${year}`
        
            )
        )
        .groupBy(month);

        const annualCashFlow: {
            month: number;
            income: number;
            expense: number
        }[] = [];

        for (let i = 1; i <= 12; i++) {
            const monthlyCashFlow = cashFlow.find((cashFlow) => Number(cashFlow.month) === i);
            annualCashFlow.push({
                month: i,
                income: Number(monthlyCashFlow?.totalIncome ?? 0),
                expense: Number(monthlyCashFlow?.totalExpense ?? 0)
            });
        }
    return annualCashFlow;
}