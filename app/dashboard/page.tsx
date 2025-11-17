import CashFlow from "./cashFlow";
import RecentTransactions from "./recentTransactions";


export default async function DashboardPage({
    searchParams
}: {
    searchParams: Promise<{year: string}>
}) {
    const today = new Date();
    const searchParamsValue = await searchParams;
    let year = Number(searchParamsValue.year ?? today.getFullYear());

    if (isNaN(year)) year = today.getFullYear();


    return (
        <div className="max-w-screen-xl mx-auto py-5">
            <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
            <CashFlow year={year}/>
            <RecentTransactions />
        </div>
    )
}