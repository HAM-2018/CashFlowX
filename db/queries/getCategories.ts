import "server-only"; // Ensures can not be imported to client components
import { db } from "@/db";
import { categoriesTable } from "../schema";

export async function getCategories() {
    const categories = await db.select().from(categoriesTable);
    return categories;
}