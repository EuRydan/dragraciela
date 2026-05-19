"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

export function ScrollAnimatedImage() {
  const [coords, setCoords] = useState<{
    start: { top: number; left: number; width: number; height: number } | null
    end: { top: number; left: number; width: number; height: number } | null
  }>({ start: null, end: null })

  const [scrollY, setScrollY] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const updateDimensions = () => {
    const desktop = window.innerWidth >= 1024
    setIsDesktop(desktop)

    if (!desktop) return

    const startEl = document.getElementById("areas-atuacao-img-placeholder")
    const endEl = document.getElementById("plantao-img-placeholder")

    if (startEl && endEl) {
      const getPageRect = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect()
        // We find the parent coordinate system relative to the main relative parent (e.g. document body)
        return {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        }
      }

      setCoords({
        start: getPageRect(startEl),
        end: getPageRect(endEl),
      })
    }
  }

  useEffect(() => {
    // Initial measurement on mount (with multiple retries to handle font loads, image loads, hydration)
    const timers = [
      setTimeout(updateDimensions, 100),
      setTimeout(updateDimensions, 500),
      setTimeout(updateDimensions, 1500),
      setTimeout(updateDimensions, 3000),
    ]

    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current)
      resizeTimeoutRef.current = setTimeout(() => {
        updateDimensions()
      }, 150)
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      timers.forEach(t => clearTimeout(t))
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!isDesktop || !coords.start || !coords.end) return null

  const { start, end } = coords

  // Guard to ensure layout is fully initialized and coordinates are valid
  if (start.top < 300 || end.top < 300 || start.width === 0 || end.width === 0) {
    return null
  }

  // Animation triggers when start element starts scrolling up,
  // and completes when end element is in its active viewport position.
  const startScroll = start.top - window.innerHeight * 0.45
  const endScroll = end.top - window.innerHeight * 0.60

  // Calculate progress t
  let t = 0
  if (scrollY > startScroll) {
    t = (scrollY - startScroll) / (endScroll - startScroll)
  }
  t = Math.max(0, Math.min(1, t)) // Clamp to [0, 1]

  // Easing function for organic physics-like motion profile (quadratic ease in out)
  const tEase = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

  // Interpolate values using the eased progress
  const y = start.top + (end.top - start.top) * tEase
  const x = start.left + (end.left - start.left) * tEase
  const w = start.width + (end.width - start.width) * tEase
  const h = start.height + (end.height - start.height) * tEase
  
  // Rotate 1 time on Y-axis (360 degrees, spinning on its own vertical axis)
  const rotationY = tEase * 360

  // 3D tilt effect: tilts forward/backward during mid-flight (reaches max at tEase = 0.5)
  const rotateX = Math.sin(tEase * Math.PI) * 20

  // 3D pop effect: floats "closer" to the viewport in 3D depth during mid-flight
  const translateZ = Math.sin(tEase * Math.PI) * 100

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: w,
        height: h,
        transform: `perspective(1000px) rotateY(${rotationY}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px)`,
        pointerEvents: t === 0 || t === 1 ? "auto" : "none",
        zIndex: 99,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        // Smooth physics-like transition filters scroll wheel steps perfectly
        transition: "top 0.15s cubic-bezier(0.25, 0.8, 0.25, 1), left 0.15s cubic-bezier(0.25, 0.8, 0.25, 1), width 0.15s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.15s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .floating-img-inner {
          display: block;
          width: 100%;
          height: auto;
          max-width: 100%;
          object-fit: contain;
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.35));
        }
        .floating-img-inner:hover {
          transform: translateY(-12px);
        }
      `}} />
      <Image
        src="/publicimage24h.png"
        alt="Balança da Justiça — Dra. Graciela Maciel"
        width={1100}
        height={1100}
        className="floating-img-inner"
        priority
      />
    </div>
  )
}
