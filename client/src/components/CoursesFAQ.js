"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/SiteConfig";
import Reveal from "@/components/Reveal";

export default function CoursesFAQ() {
  const { faqs } = siteConfig.coursesPage;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-4 sm:px-6 lg:px-[50px] py-16 sm:py-[80px]">
      <div className="max-w-[694px] mx-auto">
        <Reveal>
          <div className="max-w-[636px] mx-auto text-center">
            <h2 className="font-display text-[32px] sm:text-4xl lg:text-[48px] font-semibold leading-[1.25] lg:leading-[60px] text-[#0F172A]">
              {faqs.heading}
            </h2>
            <p className="mt-3 text-base leading-6 text-[#636363]">
              {faqs.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-12 flex flex-col gap-6">
          {faqs.items.map((item, index) => {
            const open = openIndex === index;
            return (
              <Reveal key={item.question} delay={index * 50}>
                <article
                  className={`bg-[#F8FAFC] border border-[#E3F1FF] overflow-hidden transition-all duration-300 ${
                    open ? "rounded-[25px]" : "rounded-[80px]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    className="w-full flex items-start justify-between gap-4 px-6 sm:px-10 py-[23px] text-left"
                    aria-expanded={open}
                  >
                    <span className="flex-1">
                      <span className="block text-lg sm:text-xl leading-[30px] font-medium text-[#0F172A]">
                        {item.question}
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          open ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block text-base sm:text-lg leading-[27px] text-[#636363]">
                            {item.answer}
                          </span>
                        </span>
                      </span>
                    </span>
                    <Image
                      src={open ? "/images/icons/minus.svg" : "/images/icons/plus.svg"}
                      alt=""
                      width={24}
                      height={24}
                      className="w-6 h-6 shrink-0 mt-1"
                    />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
