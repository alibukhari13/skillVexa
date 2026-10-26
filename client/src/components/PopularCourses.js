import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/SiteConfig";
import CourseCard from "@/components/CourseCard";
import Reveal from "@/components/Reveal";

export default function PopularCourses() {
  const { courses } = siteConfig;
  const lastIndex = courses.items.length - 1;

  return (
    <section id="courses" className="bg-[#F8FAFC] px-4 sm:px-6 lg:px-[50px] py-[50px] sm:py-[60px]">
      <div className="max-w-[1340px] mx-auto">
        <Reveal>
          <h2 className="text-center font-display text-[32px] sm:text-4xl lg:text-[48px] font-semibold leading-[60px] text-[#0F172A]">
            {courses.headingLead}{" "}
            <span className="text-[#2563EB]">{courses.headingAccent}</span>{" "}
            {courses.headingEnd}
          </h2>
        </Reveal>

        <div className="mt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.items.map((course, index) => (
            <Reveal key={course.id} delay={index * 90}>
              <CourseCard course={course} float={index === 0 || index === lastIndex} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-[50px] flex justify-center">
            <Link
              href={courses.cta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F59E0B] hover:bg-[#d97706] text-[#161616] text-base leading-6 font-semibold h-14 px-8 shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300"
            >
              {courses.cta.label}
              <Image
                src="/images/icons/arrow-tr.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
