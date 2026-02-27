import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <section className="card-surface-soft border-border/80 bg-card/80">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-3 h-8 w-72 max-w-full" />
        <Skeleton className="mt-2 h-4 w-96 max-w-full" />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <article key={index} className="card-surface-soft border-border/80 bg-card/80">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-3 h-8 w-20" />
            <Skeleton className="mt-2 h-3 w-32" />
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-7">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="mt-4 h-64 w-full" />
        </article>
        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-5">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="mt-4 h-64 w-full" />
        </article>
      </section>
    </div>
  );
}
