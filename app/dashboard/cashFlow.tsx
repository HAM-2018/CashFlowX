import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnnualCashFlow } from "@/db/queries/getAnnualCashFlow"
import CashFlowFilters from "./cashFlowFilters";
import { getTransactionYearRange } from "@/db/queries/getTransactionYearRange";
import { CashFlowContent } from "./cashFlowContent";


export default async function CashFlow({
    year
}: {
    year: number
})  {
    const [cashFlow, yearRange] = await Promise.all(
        [ getAnnualCashFlow(year), getTransactionYearRange()]);
    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span>Cash flow</span>
                    <CashFlowFilters year={year} yearRange={yearRange} />
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-[1fr_250px]">
                <CashFlowContent annualCashFlow={cashFlow} />
            </CardContent>
        </Card>
    )
}