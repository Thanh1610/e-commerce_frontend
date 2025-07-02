import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCardList = ({ count = 6 }) => (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-6">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="space-y-2">
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        ))}
    </div>
);

export default SkeletonCardList;
