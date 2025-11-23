import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return(
       <div className="max-w-7x1 mx-auto py-10">
        <Skeleton className="w-full max-w-3x1 h-[300px] mt-4" />
       </div>
    )
}