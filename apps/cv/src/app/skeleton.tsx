import { Skeleton } from '@cockpit-app/shared-react-ui';

export const AppSkeleton = () => {
  return (
    <div className="mx-auto max-w-4xl bg-white p-8 print:m-0 print:max-w-none print:bg-white print:p-2">
      <Skeleton className="h-14 w-sm" />
      <Skeleton className="mt-2 h-6 w-md" />
      <Skeleton className="mt-4 h-6 w-full" />
      <Skeleton className="mt-4 h-44 w-full" />
      <Skeleton className="mt-4 h-24 w-full" />
      <Skeleton className="mt-4 h-96 w-full" />
      <Skeleton className="mt-4 h-96 w-full" />
      <Skeleton className="mt-4 h-96 w-full" />
    </div>
  );
};
