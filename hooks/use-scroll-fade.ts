"use client"

import { useEffect } from "react"

export function useScrollFadeUp() {
  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      // Show everything immediately
      document.querySelectorAll(".fade-up").forEach((el) => {
        el.classList.add("visible")
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find the parent section and stagger children
            const el = entry.target as HTMLElement
            el.classList.add("visible")
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )

    const targets = document.querySelectorAll(".fade-up")
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
