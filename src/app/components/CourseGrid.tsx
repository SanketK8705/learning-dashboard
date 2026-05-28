"use client";

import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import type { Course } from "../lib/types";

const tileVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

export default function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <>
      {courses.map((course) => (
        <motion.div key={course.id} variants={tileVariant}>
          <CourseCard course={course} />
        </motion.div>
      ))}
    </>
  );
}
