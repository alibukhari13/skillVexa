import Image from "next/image";
import Link from "next/link";

export default function CourseCard({ course, float = false }) {
  return (
    <Link href={course.href} className="block h-full">
    <article
      className={`group @container h-full flex flex-col bg-white rounded-[20px] shadow-[0_0_16px_rgba(0,0,0,0.12)] overflow-hidden p-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_44px_rgba(15,23,42,0.12)] ${
        float ? "animate-float-y" : ""
      }`}
    >
      <div className="relative h-[220px] sm:h-[247px] overflow-hidden rounded-2xl">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 409px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1 pt-5 gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-2xl leading-[30px] font-bold text-[#0F172A]">
              {course.title}
            </h3>
            <span className="shrink-0 inline-flex items-center gap-1 text-xl leading-[30px] font-semibold text-[#0F172A]">
              <Image
                src="/images/icons/star.svg"
                alt=""
                width={30}
                height={30}
                className="w-[30px] h-[30px]"
              />
              {course.rating}
            </span>
          </div>
          <p className="text-base leading-6 text-[#636363]">
            {course.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-1 min-w-0 text-[clamp(10px,3.2cqi,14px)] leading-[21px] font-medium text-[#161616]">
          <span className="inline-flex items-center gap-0.5 min-w-0">
            <Image
              src="/images/icons/avatars.png"
              alt=""
              width={49}
              height={27}
              className="h-[clamp(18px,6.6cqi,27px)] w-[clamp(32px,12cqi,49px)] shrink-0 object-contain"
            />
            <span className="whitespace-nowrap">{course.learners}</span>
          </span>
          <span className="inline-flex items-center gap-1 shrink-0 @[380px]:gap-1.5">
            <Image
              src="/images/icons/clock.svg"
              alt=""
              width={24}
              height={24}
              className="w-[clamp(16px,5.8cqi,24px)] h-[clamp(16px,5.8cqi,24px)]"
            />
            <span className="whitespace-nowrap">{course.duration}</span>
          </span>
          <span className="inline-flex items-center gap-1 shrink-0 @[380px]:gap-1.5">
            <Image
              src="/images/icons/lessons.svg"
              alt=""
              width={24}
              height={24}
              className="w-[clamp(16px,5.8cqi,24px)] h-[clamp(16px,5.8cqi,24px)]"
            />
            <span className="whitespace-nowrap">{course.lessons}</span>
          </span>
        </div>

        <span
          className="mt-auto inline-flex items-center justify-center w-full rounded-full bg-[#2563EB] group-hover:bg-[#1d4ed8] text-white text-base leading-6 font-medium h-12 transition-all duration-300 group-hover:-translate-y-[1px]"
        >
          Enroll Now
        </span>
      </div>
    </article>
    </Link>
  );
}