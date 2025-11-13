import { Breadcrumb, BreadcrumbList, BreadcrumbSeparator, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getTransactionsByMonth } from "@/db/queries/getTransactionsByMonth"
import { format } from "date-fns"
import { PencilIcon } from "lucide-react"
import Link from "next/link"
import z from "zod"
import numeral from "numeral";
import { Badge } from "@/components/ui/badge"
import Filters from "./filters"
import { getTransactionYearRange } from "@/db/queries/getTransactionYearRange"

const today = new Date();

const searchSchema = z.object({
    year: z.coerce.number()
    .min(today.getFullYear() - 10)
    .max(today.getFullYear() + 1).catch(today.getFullYear()),
    month: z.coerce.number().min(1).max(12).catch(today.getMonth() + 1)

})

export default async function TransactionPage({
    searchParams
}: {
    searchParams: Promise<{
        year?: string;
        month?: string;
    }>
}) {
    const searchParamsValue = await searchParams;
    const {month, year} = searchSchema.parse(searchParamsValue);
    const selectedDate = new Date(year, month - 1, 1);

    const transactions = await getTransactionsByMonth({month, year});

    const yearRange = await getTransactionYearRange();

    console.log({transactions});

    return (
        <div className="max-w-screen-xl mx-auto py-10">
            <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
              <BreadcrumbPage>
                Transactions
              </BreadcrumbPage>
          </BreadcrumbList>  
        </Breadcrumb>
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span>{format(selectedDate, "MMM yyyy")}</span>
                    <div>
                        <Filters year={year} month={month} yearRange={yearRange} />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link href="/dashboard/transactions/new">
                       New Transaction 
                    </Link>
                </Button>
                {!transactions?.length && (
                    <p className="text-center py-10 text-lg text-neutral-500">No transactions to display</p>
                )}
                {!!transactions?.length && (
                    <Table className="mt-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Date
                                </TableHead>
                                 <TableHead>
                                    Description
                                </TableHead>
                                 <TableHead>
                                    Type
                                </TableHead>
                                 <TableHead>
                                    Category
                                </TableHead>
                                 <TableHead>
                                    Amount
                                </TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map(transaction => (
                                <TableRow key={transaction.id}>
                                    <TableCell>
                                        {format(transaction.transactionDate, "do MMM yyyy")}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.description}
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        <Badge className={transaction.categoryType === "income" 
                                            ? "bg-green-500"
                                            : "bg-orange-500"
                                        }>
                                        {transaction.categoryType}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {transaction.categoryName}
                                    </TableCell>
                                    <TableCell>
                                        {numeral(transaction.amount).format("$0,0.00")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" asChild size="icon" aria-label="Edit transaction" className="bg-[#fcff44] dark:bg-[#fcff44] text-black">
                                            <Link href={`/dashboard/transactions/${transaction.id}`}>
                                            <PencilIcon />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
        </div>
    )
}