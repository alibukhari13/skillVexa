import { notFound } from "next/navigation";
import CourseDetails from "@/components/CourseDetails";
import FinalCTA from "@/components/FinalCTA";
import { getAllCourses, getCourseDetails, getCourseSlug, siteConfig } from "@/config/SiteConfig";

export function generateStaticParams() {
  return getAllCourses().map((course) => ({ slug: getCourseSlug(course) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = getCourseDetails(slug);
  if (!course) {
    return { title: `Course — ${siteConfig.name}` };
  }
  return {
    title: `${course.title} — ${siteConfig.name}`,
    description: course.description,
  };
}

export default async function CourseDetailsPage({ params }) {
  const { slug } = await params;
  const course = getCourseDetails(slug);
  if (!course) notFound();

  return (
    <>
      <CourseDetails course={course} />
      <FinalCTA />
    </>
  );
}
