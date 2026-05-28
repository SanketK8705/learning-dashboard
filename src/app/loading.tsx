import { SkeletonHeroTile, SkeletonCourseCard } from "./components/SkeletonTile";

export default function Loading() {
  return (
    <div className="flex h-screen bg-base">
      {/* Sidebar skeleton */}
      <div className="hidden md:block w-[220px] border-r border-border bg-surface shrink-0" />

      <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkeletonHeroTile />
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCourseCard key={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
