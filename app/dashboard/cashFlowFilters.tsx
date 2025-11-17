"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

type Props = {
    year: number;
    yearRange: number[];
};

export default function CashFlowFilters({
    year,
    yearRange
}: Props) {

    const router = useRouter();

    return (
        <Select defaultValue={year.toString()} onValueChange={(value) =>{
            router.push(`/dashboard?year=${value}`)
        }}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
                <SelectContent>
                    {yearRange.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>       
        </Select>
    )
}