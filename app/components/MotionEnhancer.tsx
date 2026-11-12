"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Reveals content only after JavaScript is ready, so content stays visible without it. */
export default function MotionEnhancer() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -7% 0px" });

    function track(element: HTMLElement) {
      if (element.classList.contains("is-visible")) return;
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
        element.classList.add("is-visible");
      } else {
        observer.observe(element);
      }
    }

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(track);
    document.documentElement.classList.add("motion-ready");

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches("[data-reveal]")) track(node);
          node.querySelectorAll<HTMLElement>("[data-reveal]").forEach(track);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
