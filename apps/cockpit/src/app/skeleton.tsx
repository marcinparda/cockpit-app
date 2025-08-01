import { Skeleton } from '@cockpit-app/cockpit-ui';

export const AppSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-14 w-full" />
      <div className="flex flex-col gap-4 mt-4 pl-4">
        <Skeleton className="h-10 w-44" />
        <Skeleton className="h-6 w-96" />
        <div className="flex gap-6">
          <Skeleton className="h-44 w-96 rounded" />
          <Skeleton className="h-44 w-96 rounded" />
        </div>
      </div>
    </div>
  );
};
