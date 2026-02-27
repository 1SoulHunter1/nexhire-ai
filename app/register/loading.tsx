import { Skeleton } from "@/components/ui/skeleton";

export default function RegisterLoading() {
  return (
    <div className="app-container flex min-h-screen items-center justify-center py-10">
      <section className="card-surface w-full max-w-md space-y-4">
        <Skeleton className="mx-auto h-7 w-48" />
        <Skeleton className="mx-auto h-4 w-64" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </section>
    </div>
  );
}
