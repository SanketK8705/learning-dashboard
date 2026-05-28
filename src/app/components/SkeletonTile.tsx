export function SkeletonCourseCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
      <div className="w-9 h-9 rounded-lg skeleton" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3 w-3/4 rounded skeleton" />
        <div className="h-2.5 w-full rounded skeleton" />
        <div className="h-2.5 w-2/3 rounded skeleton" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="h-2 w-12 rounded skeleton" />
          <div className="h-2 w-8 rounded skeleton" />
        </div>
        <div className="h-1 w-full rounded-full skeleton" />
      </div>
    </div>
  );
}

export function SkeletonHeroTile() {
  return (
    <div className="col-span-2 rounded-2xl border border-border bg-surface p-8 flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <div className="h-2.5 w-24 rounded skeleton" />
          <div className="h-9 w-52 rounded skeleton" />
          <div className="h-2.5 w-40 rounded skeleton" />
        </div>
        <div className="w-24 h-24 rounded-xl skeleton" />
      </div>
      <div className="flex gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-l border-border pl-4 flex flex-col gap-2">
            <div className="h-5 w-10 rounded skeleton" />
            <div className="h-2 w-20 rounded skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}
