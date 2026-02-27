import { DashboardSkeleton } from "@/components/ui/dashboard-skeleton";

export default function RootLoading() {
  return (
    <main className="app-container py-8 md:py-12">
      <DashboardSkeleton />
    </main>
  );
}
