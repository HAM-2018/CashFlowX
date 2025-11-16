import { getAnnualCashFlow } from "@/db/queries/getAnnualCashFlow"


export default async function CashFlow()  {
    const cashFlow = await getAnnualCashFlow(2025);
    return <div></div>
}