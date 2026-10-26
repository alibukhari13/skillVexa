import Image from "next/image";
import Link from "next/link";
import { NewLabel, Rating, TechIcon } from "@/components/dashboard/DashboardUI";

export default function DashboardCourseCard({ course }) {
  return (
    <Link
      href={`/admin/courses/${course.id}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
    >
      <div className="relative aspect-[1.6] w-full overflow-hidden rounded-t-[10px] bg-[#1E293B]">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 top-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          <TechIcon name={course.technology} className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        {course.isNew ? <div className="mb-2"><NewLabel /></div> : null}
        <h3 title={course.title} className="mb-1 line-clamp-2 text-[16px] font-semibold leading-6 text-[#0F172A]">{course.title}</h3>
        <p className="truncate text-[16px] leading-[27px] text-[#545C69]">with {course.instructors}</p>
        <div className="mb-3">
          <Rating rating={course.rating} reviews={course.reviews} />
        </div>
        <p className="mt-auto text-[14px] leading-6 text-[#0F172A]">{course.duration} of content</p>
      </div>
    </Link>
  );
}
