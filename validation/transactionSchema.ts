import { addDays, subYears } from "date-fns";
import z from "zod";


export const transactionSchema = z.object({
    amount: z.number().positive("Amount must be > 0"),
    description: z.string().min(3, "description must contain at least 3 characters").max(300, "Description cannot exceed 300 characters!"),
    categoryId: z.number().positive("Cateogry ID is invalid"),
    transactionDate: z.coerce.date().min(subYears(new Date(), 1)).max(addDays(new Date(), 1))
});