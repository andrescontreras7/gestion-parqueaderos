import { Card, Skeleton } from "@nextui-org/react";

export default function ViewSkeleton() {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-4xl space-y-5 p-6 bg-gray-800 rounded-lg shadow-lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-gray-700" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-full rounded-lg">
            <div className="h-6 w-full rounded-lg bg-gray-700" />
          </Skeleton>
          <Skeleton className="w-3/4 rounded-lg">
            <div className="h-6 w-3/4 rounded-lg bg-gray-700" />
          </Skeleton>
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-6 w-1/2 rounded-lg bg-gray-700" />
          </Skeleton>
        </div>
      </Card>
    </div>
  );
}