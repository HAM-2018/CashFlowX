import CashFlow from "./cashFlow";
import RecentTransactions from "./recentTransactions";


export default function DashboardPage() {
    return (
        <div className="max-w-screen-xl mx-auto py-5">
            <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
            <CashFlow />
            <RecentTransactions />
        </div>
    )
}