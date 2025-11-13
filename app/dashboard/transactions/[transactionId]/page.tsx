import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/db/queries/getCategories";
import Link from "next/link";
import EditTransactionForm from "./edit.transaction.form";
import { getTransactionById } from "@/db/queries/getTransactionById";
import { notFound } from "next/navigation";

export default async function editTransactionPage({
    params
}: {
    params: Promise<{transactionId: string}>
}) {
    const paramsValue = await params;
    const transactionId = Number(paramsValue.transactionId);

    if (isNaN(transactionId)) notFound();
    
    const categories = await getCategories();
    const transaction = await getTransactionById(transactionId);

    if (!transaction) notFound();

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
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard/transactions">Transactions</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
              <BreadcrumbPage>
                Edit Transaction
              </BreadcrumbPage>
          </BreadcrumbList>  
        </Breadcrumb>
        <Card className="mt-4 max-w-screen-md">
          <CardHeader>
            <CardTitle>Edit Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <EditTransactionForm 
            transaction={transaction} 
            categories={categories} 
            />
          </CardContent>
        </Card>
    </div>
    )
}