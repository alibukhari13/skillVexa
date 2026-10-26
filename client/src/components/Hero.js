import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/SiteConfig";
import SuccessCard from "@/components/SuccessCard";

function FloatingColumn({ stories, speedClass, offsetClass = "" }) {
  const loop = [...stories, ...stories];

  return (
    <div
      className={`hero-column-mask relative h-[628px] w-[185px] overflow-hidden ${offsetClass}`}
    >
      <div className={`${speedClass} flex flex-col gap-3 py-0`}>
        {loop.map((story, index) => (
          <SuccessCard key={`${story.name}-${story.image}-${index}`} story={story} compact />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { hero, stories } = siteConfig;
  const { leftOuter, leftInner, rightInner, rightOuter } = stories.heroColumns;

  return (
    <section className="relative overflow-hidden bg-white -mt-[86px] sm:-mt-[94px]">
      <div className="relative mx-auto min-w-0 max-w-[1440px]">
        <div className="relative min-h-[640px] lg:min-h-[710px] flex items-center justify-center pt-[120px] sm:pt-[140px] lg:pt-[189px] pb-10 sm:pb-14">
          <div className="hidden lg:flex absolute left-5 top-[54px] z-[1]">
            <FloatingColumn
              stories={leftOuter}
              speedClass="animate-marquee-up"
            />
          </div>
          <div className="hidden xl:flex absolute left-[217px] top-3 z-[1]">
            <FloatingColumn
              stories={leftInner}
              speedClass="animate-marquee-up-slow"
            />
          </div>

          <div className="hidden xl:flex absolute right-[217px] top-6 z-[1]">
            <FloatingColumn
              stories={rightInner}
              speedClass="animate-marquee-up-slow"
            />
          </div>
          <div className="hidden lg:flex absolute right-5 top-[52px] z-[1]">
            <FloatingColumn
              stories={rightOuter}
              speedClass="animate-marquee-up"
            />
          </div>

          <div className="pointer-events-none absolute left-0 bottom-[80px] hidden lg:block w-[433px] h-[118px] bg-white blur-[20px]" />
          <div className="pointer-events-none absolute right-0 bottom-[80px] hidden lg:block w-[433px] h-[118px] bg-white blur-[20px]" />

          <div className="relative z-10 mx-auto w-full max-w-[549px] text-center px-4">
            <span className="inline-flex items-center justify-center rounded-full bg-[#ECF5FF] px-4 h-[37px] text-sm leading-[21px] font-semibold text-[#2563EB]">
              {hero.badge}
            </span>

            <h1 className="mt-3 font-display text-[2rem] sm:text-5xl lg:text-[64px] font-medium leading-[1.25] lg:leading-[80px] tracking-tight text-[#161616]">
              {hero.titleLead}{" "}
              <span className="text-[#F59E0B]">{hero.titleAccent}</span>{" "}
              {hero.titleMid}{" "}
              <span className="text-[#F59E0B]">{hero.titleAccentTwo}</span>
            </h1>

            <p className="mt-3 text-base leading-6 text-[#636363] max-w-[549px] mx-auto">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={hero.primaryCta.href}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-base leading-6 font-medium h-12 px-8 shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300"
              >
                <Image
                  src="/images/icons/play-circle.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="w-[18px] h-[18px]"
                />
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 text-base leading-6 font-medium text-[#0F172A] hover:text-[#2563EB] transition-colors"
              >
                {hero.secondaryCta.label}
                <Image
                  src="/images/icons/arrow-tr.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </Link>
            </div>

            <p className="mt-6 text-base leading-6 font-medium text-[#2563EB]">
              {hero.path.join(" • ")}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="text-[28px] leading-[42px] font-semibold text-[#0F172A]">
                {hero.rating}
              </span>
              <Image
                src="/images/icons/stars.svg"
                alt="5 star rating"
                width={152}
                height={28}
                className="h-7 w-[152px]"
              />
              <span className="text-base leading-6 font-medium text-[#0F172A]">
                {hero.reviews} {hero.reviewsLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 text-base leading-6 font-medium text-black">
                <Image
                  src="/images/icons/google-g.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                Google
              </span>
            </div>
          </div>
        </div>

        <div className="lg:hidden min-w-0 w-full max-w-full overflow-x-auto overscroll-x-contain pb-6 px-4 snap-x">
          <div className="flex w-max gap-4">
            {[...leftOuter, ...leftInner, ...rightInner].map((story, index) => (
              <div
                key={`${story.name}-${index}`}
                className={`snap-start shrink-0 ${index % 2 === 0 ? "animate-float-y" : "animate-float-y-delayed"}`}
              >
                <SuccessCard story={story} compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
