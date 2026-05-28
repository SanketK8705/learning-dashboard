export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  total_lessons: number;
  completed_lessons: number;
  icon: string;
  color: string;
  created_at: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}
