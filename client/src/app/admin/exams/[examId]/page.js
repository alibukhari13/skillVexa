import { notFound } from "next/navigation";
import ExamRunner from "@/components/dashboard/ExamRunner";
import { courseById } from "@/config/AdminContent";
import { siteConfig } from "@/config/SiteConfig";

export async function generateMetadata({ params }) {
  const { examId } = await params;
  const number = examId.split("--")[1];
  return { title: `Practice Exam: ${number} — ${siteConfig.name}` };
}

export default async function Page({ params }) {
  const { examId } = await params;
  const [courseId, number] = examId.split("--");
  if (!courseById[courseId] || !/^\d+$/.test(number || "")) notFound();
  return <ExamRunner examId={examId} />;
}
