"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/SiteConfig";
import { useSiteHref } from "@/lib/adminSession";

const socialItems = [
  { src: "/images/logos/social-linkedin.svg", hrefKey: "linkedin", label: "LinkedIn" },
  { src: "/images/logos/social-youtube.svg", hrefKey: "youtube", label: "YouTube" },
  { src: "/images/logos/social-instagram.svg", hrefKey: "instagram", label: "Instagram" },
  { src: "/images/logos/social-facebook.png", hrefKey: "facebook", label: "Facebook" },
];

function FooterLink({ href, children }) {
  const siteHref = useSiteHref();
  return (
    <Link
      href={siteHref(href)}
      className="text-[#B0B0B0] hover:text-[#F59E0B] transition-colors duration-200 inline-block hover:translate-x-1 transform transition-transform text-base leading-6"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const siteHref = useSiteHref();
  return (
    <footer className="w-full bg-[#0F172A] text-white pt-[50px] pb-8 px-4 sm:px-6 lg:px-[50px]">
      <div className="max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[332px_1fr_1fr_1fr_1fr] gap-10 lg:gap-8">
          <div className="flex flex-col items-start">
            <Link href={siteHref("/")} className="flex items-center group">
              <div className="relative w-[171px] h-[42px]">
                <Image
                  src="/images/logo.svg"
                  alt={`${siteConfig.name} Logo`}
                  fill
                  sizes="171px"
                  className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <p className="mt-4 text-sm leading-[21px] text-white max-w-[332px]">
              {siteConfig.tagline}
            </p>

            <div className="flex items-center gap-3 mt-6">
              {socialItems.map((social) => (
                <Link
                  key={social.label}
                  href={siteConfig.socials[social.hrefKey] || "#"}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:opacity-80"
                >
                  <Image
                    src={social.src}
                    alt=""
                    width={36}
                    height={36}
                    sizes="36px"
                    className="w-9 h-9 object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:ml-auto">
            <h3 className="text-white text-lg leading-[27px] font-medium">Platform</h3>
            <ul className="space-y-3">
              {siteConfig.footer.platform.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-white text-lg leading-[27px] font-medium">Resources</h3>
            <ul className="space-y-3">
              {siteConfig.footer.resources.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-white text-lg leading-[27px] font-medium">Contact</h3>
            <ul className="space-y-3 text-base leading-6 text-[#B0B0B0]">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-[#F59E0B] transition-colors duration-200 inline-block hover:translate-x-1 transform transition-transform"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-[#F59E0B] transition-colors duration-200 inline-block hover:translate-x-1 transform transition-transform break-all"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="leading-relaxed">{siteConfig.address}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-white text-lg leading-[27px] font-medium">COmpany</h3>
            <ul className="space-y-3">
              {siteConfig.footer.company.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[90px] pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lg leading-[27px] text-white">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-base leading-6 text-white sm:justify-end">
            {siteConfig.footer.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#F59E0B] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
