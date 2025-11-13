"use client";

import { Button } from "@/components/ui/button";
import { SelectItem, SelectValue, SelectTrigger, SelectContent, Select } from "@/components/ui/select";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";


export default function Filters({
    year,
    month,
    yearRange
}:{
    year: number;
    month: number;
    yearRange: number[];
}) {
    const [chosenMonth, setChosenMonth] = useState(month);
    const [chosenYear, setChosenYear] = useState(year);
    return (
        <div className="flex gap-1">
            <Select value={chosenMonth.toString()} onValueChange={(newValue) => setChosenMonth(Number(newValue))}>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({length: 12}).map((_, i) =>(
                        <SelectItem key={i} value={`${i + 1}`}>
                            {format(new Date(chosenYear, i, 1), "MMM")}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
             <Select value={chosenYear.toString()}
              onValueChange={(newValue) => setChosenYear(Number(newValue))}>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {yearRange.map((year) =>(
                        <SelectItem key={year} value={`${year}`}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button asChild className="bg-blue-500">
                <Link href={`/dashboard/transactions?year=${chosenYear}&month=${chosenMonth}`}>
                    Search
                </Link>
            </Button>
        </div>
    );
}