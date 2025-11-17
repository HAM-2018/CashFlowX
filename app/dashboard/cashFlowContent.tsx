"use client";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import numeral from "numeral";
import { format } from "date-fns";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

export function CashFlowContent({
    annualCashFlow
}: {
    annualCashFlow: {month: number; income: number; expense: number}[]
}) {
    const today = new Date();
    return (
        <ChartContainer config={{
            income: {
                label: "Income",
                color: "#84cc16"
            },
            expenses: {
                label: "Expense",
                color: "#f97316"
            },
        }} className="w-full h-[300px]"
        >
            <BarChart data={annualCashFlow}>
                <CartesianGrid vertical={false} />
                <YAxis tickFormatter={(value) => numeral(value).format("$0,0.00")}/>
                <XAxis tickFormatter={(value) => format(new Date(today.getFullYear(), value, 1), "MMM")} />
                <ChartTooltip content={
                    <ChartTooltipContent labelFormatter={(value, payload) => {
                        console.log({value, payload});
                        const month = payload[0]?.payload.month;
                        return <div>
                            {format(new Date(today.getFullYear(), month - 1, 1), "MMM")}
                        </div>
                    }} />
                } />
                <Legend verticalAlign="top"
                 align="right" 
                 height={30} 
                 iconType="circle"
                 formatter={(value) => {
                    return <span className="capitalize text-primary">{value}</span>
                 }}
                 />
                <Bar dataKey="income" radius={4} fill="var(--color-income)"/>
                <Bar dataKey="expense" radius={4} fill="var(--color-expenses)" />
            </BarChart>
        </ChartContainer>
    )
}