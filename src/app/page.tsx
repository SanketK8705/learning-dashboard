import { Suspense } from "react";
import { getCourses } from "./lib/supabase";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import HeroTile from "./components/HeroTile";
import ActivityTile from "./components/ActivityTile";
import CourseGrid from "./components/CourseGrid";
import BentoGrid from "./components/BentoGrid";
import { SkeletonCourseCard } from "./components/SkeletonTile";

async function CoursesSection() {
  const courses = await getCourses();
  return <CourseGrid courses={courses} />;
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-base overflow-hidden">
      <Sidebar />
      <MobileNav />

      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
        <div className="max-w-6xl mx-auto">
          <BentoGrid>
            <div className="lg:col-span-2">
              <HeroTile />
            </div>

            <div>
              <ActivityTile />
            </div>

            <Suspense
              fallback={
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i}>
                      <SkeletonCourseCard />
                    </div>
                  ))}
                </>
              }
            >
              <CoursesSection />
            </Suspense>
          </BentoGrid>
        </div>
      </main>
    </div>
  );
}