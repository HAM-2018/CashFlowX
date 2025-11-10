import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { categoriesTable, transactionTable } from "./db/schema";

dotenv.config({
  path: ".env.local"
});

const db = drizzle(process.env.DATABASE_URL!);
const categorySeedData: (typeof categoriesTable.$inferInsert)[] = [
    {
        name: "Salary",
        type: "income"
    },
    {
        name: "Rental",
        type: "income"
    },
    {
        name: "Investments",
        type: "income"
    },
    {
        name: "Other",
        type: "income"
    },
    {
        name: "Rent",
        type: "expense"
    },
    {
        name: "Housing",
        type: "expense"
    },
    {
        name: "Entertainment",
        type: "expense"
    },
    {
        name: "Food & Groceries",
        type: "expense"
    },
    {
        name: "Transportation",
        type: "expense"
    },
    {
        name: "Other",
        type: "expense"
    },
]

async function main() {
    await db.insert(categoriesTable).values(categorySeedData);
}

main();