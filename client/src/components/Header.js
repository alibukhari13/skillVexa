"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { siteConfig } from "@/config/SiteConfig";
import CareerPathsMenu from "@/components/CareerPathsMenu";
import { setAdminSession, useAdminSession, useSiteHref } from "@/lib/adminSession";

function hasNestedChildren(item) {
  return Array.isArray(item.children) && item.children.some((child) => child.children?.length);
}

function Chevron({ open, className = "" }) {
  return (
    <Image
      src="/images/icons/chevron-down.svg"
      alt=""
      width={20}
      height={20}
      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      } ${className}`}
    />
  );
}

function NestedItem({ child, open, onHover, onToggle, onNavigate, submenuAlign }) {
  const siteHref = useSiteHref();
  const nested = child.children?.length;
  const openSub = open && nested;

  if (!nested) {
    return (
      <Link
        href={siteHref(child.href)}
        onMouseEnter={onHover}
        onClick={onNavigate}
        className="block rounded-lg px-3 py-2 text-base leading-6 text-white transition-all duration-200 hover:bg-white/5 hover:text-[#F59E0B]"
      >
        {child.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={onHover}>
      <button
        type="button"
        aria-expanded={openSub}
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-base leading-6 transition-all duration-200 hover:bg-white/5 hover:text-[#F59E0B] ${
          openSub ? "bg-white/5 text-[#F59E0B]" : "text-white"
        }`}
      >
        <span className="min-w-0">{child.label}</span>
        <Image
          src="/images/icons/chevron-down.svg"
          alt=""
          width={16}
          height={16}
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
            submenuAlign === "left" ? "rotate-90" : "-rotate-90"
          }`}
        />
      </button>

      <div
        className={`absolute top-0 z-50 w-[min(220px,calc(100vw-2rem))] rounded-xl border border-white/10 bg-[#0F172A] py-2 shadow-[0_16px_40px_rgba(15,23,42,0.28)] transition-all duration-200 ease-out ${
          submenuAlign === "left" ? "right-full mr-1" : "left-full ml-1"
        } ${
          openSub
            ? "visible translate-x-0 opacity-100"
            : `invisible pointer-events-none opacity-0 ${
                submenuAlign === "left" ? "translate-x-1" : "-translate-x-1"
              }`
        }`}
      >
        {child.children.map((leaf) => (
          <Link
            key={leaf.href}
            href={siteHref(leaf.href)}
            onClick={onNavigate}
            className="block px-3 py-2 text-base leading-6 text-white transition-all duration-200 hover:bg-white/5 hover:pl-4 hover:text-[#F59E0B]"
          >
            {leaf.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function NestedDropdown({ item, open, openSubMenu, onOpenSub, onNavigate, submenuAlign, panelRef }) {
  return (
    <div
      ref={panelRef}
      className={`absolute left-0 top-full z-50 w-[min(320px,calc(100vw-2rem))] pt-2 transition-all duration-200 ease-out ${
        open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
      }`}
    >
      <div className="origin-top-left rounded-xl border border-white/10 bg-[#0F172A] py-2 shadow-[0_16px_40px_rgba(15,23,42,0.34)]">
        {item.children.map((child) => (
          <NestedItem
            key={child.href}
            child={child}
            open={openSubMenu === child.href}
            onHover={() => onOpenSub(child.children?.length ? child.href : null)}
            onToggle={() =>
              onOpenSub(openSubMenu === child.href ? null : child.href)
            }
            onNavigate={onNavigate}
            submenuAlign={submenuAlign}
          />
        ))}
      </div>
    </div>
  );
}

function MobileNestedNav({ item, onNavigate }) {
  const siteHref = useSiteHref();
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(null);

  return (
    <div className="min-w-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          setOpen((current) => !current);
          if (open) setOpenSub(null);
        }}
        className="flex w-full min-w-0 items-center justify-between gap-2 py-1 text-left hover:text-white hover:translate-x-1 transition-all duration-200"
      >
        <span className="min-w-0 truncate">{item.label}</span>
        <Chevron open={open} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-w-0 overflow-hidden">
          <div className="mt-2 space-y-1 rounded-xl border border-white/10 bg-[#0F172A] p-2">
            {item.children.map((child) =>
              child.children?.length ? (
                <div key={child.href} className="min-w-0">
                  <button
                    type="button"
                    aria-expanded={openSub === child.href}
                    onClick={() =>
                      setOpenSub((current) => (current === child.href ? null : child.href))
                    }
                    className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 hover:bg-white/5 hover:text-white ${
                      openSub === child.href ? "bg-white/5 text-[#F59E0B]" : "text-gray-200"
                    }`}
                  >
                    <span className="min-w-0">{child.label}</span>
                    <Chevron open={openSub === child.href} className="h-4 w-4" />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      openSub === child.href ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-w-0 overflow-hidden">
                      <div className="mb-1 ml-2 space-y-0.5 border-l border-white/10 pl-2">
                        {child.children.map((leaf) => (
                          <Link
                            key={leaf.href}
                            href={siteHref(leaf.href)}
                            onClick={onNavigate}
                            className="block rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors duration-200 hover:bg-white/5 hover:text-[#F59E0B]"
                          >
                            {leaf.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={child.href}
                  href={siteHref(child.href)}
                  onClick={onNavigate}
                  className="block rounded-lg px-3 py-2 text-sm text-gray-200 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  {child.label}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [submenuAlign, setSubmenuAlign] = useState("right");
  const [careerOpen, setCareerOpen] = useState(false);
  const headerRef = useRef(null);
  const nestedMenuRef = useRef(null);
  // Visitors coming from the /admin area get admin links (see lib/adminSession).
  const adminSession = useAdminSession();
  const siteHref = useSiteHref();
  const careerItem = siteConfig.nav.find((item) => item.href === "/career-paths");
  const careerItems = careerItem?.children || [];

  useEffect(() => {
    function onPointerDown(event) {
      if (!careerOpen && !openMenu) return;
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setCareerOpen(false);
        setOpenMenu(null);
        setOpenSubMenu(null);
      }
    }
    function onKey(event) {
      if (event.key === "Escape") {
        setCareerOpen(false);
        setOpenMenu(null);
        setOpenSubMenu(null);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [careerOpen, openMenu]);

  useEffect(() => {
    if (!openMenu || !nestedMenuRef.current) return;
    const rect = nestedMenuRef.current.getBoundingClientRect();
    const submenuWidth = 240;
    setSubmenuAlign(rect.right + submenuWidth > window.innerWidth - 16 ? "left" : "right");
  }, [openMenu, openSubMenu]);

  function closeCareer() {
    setCareerOpen(false);
  }

  function closeAllMenus() {
    setOpenMenu(null);
    setOpenSubMenu(null);
    setCareerOpen(false);
    setMobileMenuOpen(false);
  }

  const menuItemClass =
    "relative whitespace-nowrap text-white text-base leading-6 font-normal transition-all duration-300 ease-out hover:text-[#F59E0B] hover:-translate-y-[1px] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-[#F59E0B] after:transition-all after:duration-300 hover:after:w-full";

  return (
    <header className="relative w-full px-4 sm:px-5 pt-4 sm:pt-6 pb-0 sticky top-0 z-50 bg-transparent">
      <div
        ref={headerRef}
        className="relative mx-auto max-w-[1400px]"
      >
      <div className="relative h-[62px] lg:h-[70px] bg-[#0F172A] text-white rounded-full px-3 sm:px-5 lg:px-[30px] flex items-center justify-between xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-6 shadow-[0_0_6px_rgba(143,143,143,0.12)]">
        <Link
          href={siteHref("/")}
          className="flex items-center justify-self-start focus:outline-none group shrink-0"
        >
          <div className="relative w-[140px] h-[34px] sm:w-[171px] sm:h-[42px]">
            <Image
              src="/images/logo.svg"
              alt={`${siteConfig.name} Logo`}
              fill
              className="object-contain object-left transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              priority
            />
          </div>
        </Link>

        <nav className="hidden xl:flex shrink-0 items-center gap-5 text-base leading-6">
          {siteConfig.nav.map((item) => {
            if (item.href === "/career-paths") {
              return (
                <div key={item.href}>
                  <button
                    type="button"
                    aria-expanded={careerOpen}
                    aria-controls="career-paths-menu"
                    onClick={() => {
                      setCareerOpen((current) => !current);
                      setOpenMenu(null);
                      setOpenSubMenu(null);
                    }}
                    className="group flex shrink-0 items-center gap-0.5 whitespace-nowrap text-white hover:text-[#F59E0B] transition-all duration-300 ease-out hover:-translate-y-[1px] focus:outline-none"
                  >
                    <span
                      className={`relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-[#F59E0B] after:transition-all after:duration-300 group-hover:after:w-full ${
                        careerOpen ? "text-[#F59E0B] after:w-full" : "after:w-0"
                      }`}
                    >
                      {item.label}
                    </span>
                    <Chevron open={careerOpen} />
                  </button>
                </div>
              );
            }

            if (hasNestedChildren(item)) {
              const isOpen = openMenu === item.href;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    setOpenMenu(item.href);
                    setCareerOpen(false);
                  }}
                  onMouseLeave={() => {
                    setOpenMenu(null);
                    setOpenSubMenu(null);
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => {
                      setOpenMenu(isOpen ? null : item.href);
                      if (isOpen) setOpenSubMenu(null);
                      setCareerOpen(false);
                    }}
                    className="group flex shrink-0 items-center gap-0.5 whitespace-nowrap text-white hover:text-[#F59E0B] transition-all duration-300 ease-out hover:-translate-y-[1px] focus:outline-none"
                  >
                    <span
                      className={`relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-[#F59E0B] after:transition-all after:duration-300 group-hover:after:w-full ${
                        isOpen ? "text-[#F59E0B] after:w-full" : "after:w-0"
                      }`}
                    >
                      {item.label}
                    </span>
                    <Chevron open={isOpen} />
                  </button>
                  <NestedDropdown
                    item={item}
                    open={isOpen}
                    openSubMenu={openSubMenu}
                    onOpenSub={setOpenSubMenu}
                    onNavigate={closeAllMenus}
                    submenuAlign={submenuAlign}
                    panelRef={nestedMenuRef}
                  />
                </div>
              );
            }

            return item.children ? (
              <div
                key={item.href}
                className="relative"
                  onMouseEnter={() => {
                    setOpenMenu(item.href);
                    setCareerOpen(false);
                    setOpenSubMenu(null);
                  }}
                  onFocus={() => {
                    setOpenMenu(item.href);
                    setCareerOpen(false);
                    setOpenSubMenu(null);
                  }}
                  onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === item.href ? null : item.href)
                  }
                  className="group flex shrink-0 items-center gap-0.5 whitespace-nowrap text-white hover:text-[#F59E0B] transition-all duration-300 ease-out hover:-translate-y-[1px] focus:outline-none"
                >
                  <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-[#F59E0B] after:transition-all after:duration-300 group-hover:after:w-full">
                    {item.label}
                  </span>
                  <Chevron open={openMenu === item.href} />
                </button>

                {openMenu === item.href && (
                  <div className="absolute top-full left-0 mt-2 w-52 rounded-xl bg-[#131c31] border border-gray-800 shadow-xl py-2 z-50 text-gray-300">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={siteHref(child.href)}
                        className="block px-4 py-2 text-sm transition-all duration-200 hover:bg-gray-800 hover:text-white hover:pl-5"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={siteHref(item.href)} className={menuItemClass}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:flex shrink-0 items-center justify-self-end gap-4">
          {adminSession ? (
            <Link
              href="/"
              onClick={() => setAdminSession(false)}
              className="text-base leading-6 font-medium text-[#F59E0B] transition-all duration-300 hover:text-[#fbbf24] hover:-translate-y-[1px]"
            >
              Log Out
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-base leading-6 font-medium text-[#F59E0B] transition-all duration-300 hover:text-[#fbbf24] hover:-translate-y-[1px]"
            >
              Log In
            </Link>
          )}

          <Link
            href={adminSession ? "/admin" : "/get-started"}
            className="bg-[#F59E0B] hover:bg-[#d97706] text-white text-base leading-6 font-medium whitespace-nowrap px-8 py-3 rounded-[48px] flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-[1px] active:scale-95"
          >
            {adminSession ? "Dashboard" : "Get Started"}
          </Link>
        </div>

        <div className="flex xl:hidden items-center">
          <button
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              setCareerOpen(false);
              setOpenMenu(null);
              setOpenSubMenu(null);
            }}
            className="text-gray-300 hover:text-white focus:outline-none p-1 transition-all duration-300 hover:scale-110"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <div id="career-paths-menu" className="hidden xl:block">
        <CareerPathsMenu
          items={careerItems}
          open={careerOpen}
          onSelect={closeCareer}
        />
      </div>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-4 right-4 mt-2 min-w-0 bg-[#0F172A] border border-gray-800 rounded-2xl shadow-2xl p-6 text-white space-y-4 z-50">
          <nav className="flex min-w-0 flex-col space-y-3 font-medium text-gray-300">
            {siteConfig.nav.map((item) =>
              item.href === "/career-paths" ? (
                <div key={item.href}>
                  <button
                    type="button"
                    aria-expanded={careerOpen}
                    onClick={() => setCareerOpen((current) => !current)}
                    className="flex w-full items-center justify-between py-1 text-left hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    <span>{item.label}</span>
                    <Chevron open={careerOpen} />
                  </button>
                  <CareerPathsMenu
                    variant="mobile"
                    items={careerItems}
                    open={careerOpen}
                    onSelect={() => {
                      setCareerOpen(false);
                      setMobileMenuOpen(false);
                    }}
                  />
                </div>
              ) : hasNestedChildren(item) ? (
                <MobileNestedNav
                  key={item.href}
                  item={item}
                  onNavigate={closeAllMenus}
                />
              ) : (
                <Link
                  key={item.href}
                  href={siteHref(item.href)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 py-1"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="pt-4 border-t border-gray-800 flex flex-col space-y-3">
            <Link
              href={adminSession ? "/" : "/login"}
              onClick={() => {
                if (adminSession) setAdminSession(false);
                setMobileMenuOpen(false);
              }}
              className="text-center py-2 text-base font-medium text-[#F59E0B] hover:text-[#fbbf24] transition-all duration-200"
            >
              {adminSession ? "Log Out" : "Log In"}
            </Link>

            <Link
              href={adminSession ? "/admin" : "/get-started"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#F59E0B] hover:bg-[#d97706] text-white text-base font-medium py-3 rounded-full transition-all duration-300 shadow-md hover:-translate-y-[1px]"
            >
              {adminSession ? "Dashboard" : "Get Started"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
