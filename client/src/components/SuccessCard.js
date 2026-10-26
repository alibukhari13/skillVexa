import Link from "next/link";
import Image from "next/image";

export default function SuccessCard({ story, compact = false, fluid = false }) {
  return (
    <article
      className={`bg-white overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_28px_rgba(0,0,0,0.3)] ${
        compact && !fluid ? "w-[185px]" : "w-full"
      }`}
    >
      <div className="relative w-full h-[150px]">
        <Image
          src={story.image}
          alt={story.name}
          fill
          sizes={compact ? "185px" : "(max-width: 768px) 50vw, 185px"}
          className="object-cover"
        />
      </div>
      <div className="h-[158px] bg-white border border-[#F5F5F5] px-[10px] py-[10px] flex flex-col">
        <div className="flex flex-col gap-2 flex-1">
          <div>
            <h3 className="font-normal text-[#0F172A] text-[18px] leading-[27px]">
              {story.name}
            </h3>
            <p className="text-[#2563EB] text-sm leading-[21px] font-medium">
              {story.role}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[#0F172A] text-sm leading-[21px] font-medium">
              Before: {story.before}
            </p>
            <p className="text-[#636363] text-[10px] leading-[15px]">
              {story.previous}
            </p>
          </div>
        </div>
        <Link
          href="/stories"
          className="mt-2 flex items-center justify-end gap-1 text-xs leading-[18px] font-medium text-[#0F172A] hover:text-[#2563EB]"
        >
          View Story
          <Image
            src="/images/icons/play-story.svg"
            alt=""
            width={21}
            height={21}
            className="w-[21px] h-[21px]"
          />
        </Link>
      </div>
    </article>
  );
}
