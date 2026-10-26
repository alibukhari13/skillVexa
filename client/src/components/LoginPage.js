"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SOCIALS = [
  { name: "Google", src: "/images/login/google.svg", sized: true },
  { name: "Apple", src: "/images/login/social-2.svg", sized: false },
  { name: "Facebook", src: "/images/login/social-3.svg", sized: false },
  { name: "Instagram", src: "/images/login/instagram.svg", sized: true },
];

function FieldIcon({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={24}
      height={24}
      className="h-6 w-6 shrink-0"
    />
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="fixed inset-0 z-[60] min-w-0 overflow-x-hidden overflow-y-auto bg-[linear-gradient(180deg,#D5E2FF_0%,#FFE6BD_100%)]">
      <div className="mx-auto flex min-h-full min-w-0 max-w-[1440px] flex-col items-center px-4 py-8 sm:px-6 sm:py-8 xl:px-0 xl:pt-8 xl:pb-[48px]">
        <Link
          href="/"
          className="relative h-[34px] w-[140px] shrink-0 transition-transform duration-300 hover:scale-[1.03] sm:h-[42px] sm:w-[171px]"
        >
          <Image
            src="/images/logo.svg"
            alt="SkillVexa"
            fill
            priority
            sizes="171px"
            className="object-contain"
          />
        </Link>

        <div className="flex w-full min-w-0 flex-1 items-center justify-center py-8 sm:py-10">
          <form
            onSubmit={onSubmit}
            className="animate-fade-up w-full min-w-0 max-w-[645px] rounded-3xl bg-white px-4 py-10 shadow-[0_0_12px_rgba(191,191,191,0.12)] sm:px-8 sm:py-12 md:px-[50px] md:py-[50px]"
          >
            <h1 className="text-center font-display text-[28px] font-semibold leading-9 text-black sm:text-[32px] sm:leading-10">
              Log in to your profile
            </h1>

            <label className="mt-8 block sm:mt-[62px]">
              <span className="block text-lg leading-[30px] text-[#0F172A] sm:text-xl">
                Email Address
              </span>
              <span className="mt-3 flex h-14 items-center gap-3 rounded-md border border-[#EBF5FF] bg-[#F8FAFC] px-[21px] transition-all duration-200 focus-within:border-[#2563EB] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] sm:h-16">
                <FieldIcon src="/images/login/mail.svg" alt="" />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter Email Address"
                  className="min-w-0 flex-1 bg-transparent text-base leading-6 text-[#0F172A] outline-none placeholder:text-[#B9C9D9]"
                />
              </span>
            </label>

            <label className="mt-6 block">
              <span className="block text-lg leading-[30px] text-[#0F172A] sm:text-xl">
                Password
              </span>
              <span className="mt-3 flex h-14 items-center gap-3 rounded-md border border-[#EBF5FF] bg-[#F8FAFC] px-[21px] transition-all duration-200 focus-within:border-[#2563EB] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] sm:h-16">
                <FieldIcon src="/images/login/lock.svg" alt="" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="*********"
                  className="min-w-0 flex-1 bg-transparent text-base leading-6 text-[#0F172A] outline-none placeholder:text-[#B9C9D9]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="shrink-0 rounded-md p-0.5 transition-opacity duration-200 hover:opacity-70"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Image
                    src={
                      showPassword
                        ? "/images/login/view-off.svg"
                        : "/images/login/view.svg"
                    }
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </button>
              </span>
            </label>

            <div className="mt-5 flex justify-end">
              <Link
                href="/forgot-password"
                className="text-lg font-medium leading-[27px] text-[#F59E0B] transition-colors duration-200 hover:text-[#d97706]"
              >
                Forget Password?
              </Link>
            </div>

            <button
              type="submit"
              className="mt-6 flex h-[60px] w-full items-center justify-center rounded-full bg-[#2563EB] text-base font-medium leading-6 text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#1d4ed8] hover:shadow-lg active:scale-[0.98]"
            >
              Login
            </button>

            <div className="mt-8 flex min-w-0 items-center gap-3">
              <span className="h-px min-w-0 flex-1 bg-[#EBF5FF]" />
              <span className="shrink-0 text-base leading-6 text-[#0F172A]">
                Continue with
              </span>
              <span className="h-px min-w-0 flex-1 bg-[#EBF5FF]" />
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              {SOCIALS.map((social) => (
                <button
                  key={social.name}
                  type="button"
                  aria-label={`Continue with ${social.name}`}
                  className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full border border-[#EBF5FF] bg-[#F8FAFC] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2563EB]/30 hover:shadow-md active:scale-95"
                >
                  <Image
                    src={social.src}
                    alt=""
                    width={social.sized ? 24 : 50}
                    height={social.sized ? 24 : 50}
                    className={social.sized ? "h-6 w-6" : "h-[50px] w-[50px]"}
                  />
                </button>
              ))}
            </div>

            <p className="mt-8 text-center text-base leading-[27px] text-[#0F172A] sm:text-lg">
              Don&apos;t have an account?{" "}
              <Link
                href="/get-started"
                className="font-medium text-[#2563EB] transition-colors duration-200 hover:text-[#1d4ed8]"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
