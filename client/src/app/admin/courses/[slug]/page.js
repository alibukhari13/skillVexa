import { notFound } from "next/navigation";
import CoursePlayer from "@/components/dashboard/CoursePlayer";
import { courseById } from "@/config/AdminContent";
import { dashboardCourses } from "@/config/DashboardData";
import { siteConfig } from "@/config/SiteConfig";

export function generateStaticParams() {
  return dashboardCourses.map((course) => ({ slug: course.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = courseById[slug];
  return { title: course ? `${course.title} — ${siteConfig.name}` : `Courses — ${siteConfig.name}` };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!courseById[slug]) notFound();
  return <CoursePlayer courseId={slug} />;
}
