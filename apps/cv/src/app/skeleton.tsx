import { Skeleton } from '@cockpit-app/shared-react-ui';

export const AppSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 print:p-2 print:max-w-none bg-white print:bg-white print:m-0">
      <Skeleton className="h-14 w-sm" />
      <Skeleton className="h-6 w-md mt-2" />
      <Skeleton className="h-6 w-full mt-4" />
      <Skeleton className="h-44 w-full mt-4" />
      <Skeleton className="h-24 w-full mt-4" />
      <Skeleton className="h-96 w-full mt-4" />
      <Skeleton className="h-96 w-full mt-4" />
      <Skeleton className="h-96 w-full mt-4" />
    </div>
  );
};
