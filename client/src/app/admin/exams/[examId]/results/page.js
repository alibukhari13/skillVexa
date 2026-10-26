import { notFound } from "next/navigation";
import ExamRunner from "@/components/dashboard/ExamRunner";
import { courseById } from "@/config/AdminContent";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Exam results — ${siteConfig.name}` };

export default async function Page({ params }) {
  const { examId } = await params;
  const [courseId, number] = examId.split("--");
  if (!courseById[courseId] || !/^\d+$/.test(number || "")) notFound();
  return <ExamRunner examId={examId} mode="results" />;
}
