"use client"

import { useState, useEffect, useRef } from "react"

export function Sobre() {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = document.getElementById("sobre")
    if (!video || !section) return

    video.pause()

    let isIntersecting = false
    let targetTime = 0
    let currentTime = 0
    let rafId: number

    const updateVideoProgress = () => {
      if (!isIntersecting || !video.duration) {
        rafId = requestAnimationFrame(updateVideoProgress)
        return
      }

      // Smoothly interpolate (lerp) the video currentTime towards targetTime
      const diff = targetTime - currentTime
      if (Math.abs(diff) > 0.01) {
        currentTime += diff * 0.12 // Lerp speed factor
        video.currentTime = Math.max(0, Math.min(video.duration - 0.02, currentTime))
      }

      rafId = requestAnimationFrame(updateVideoProgress)
    }

    const handleScroll = () => {
      if (!isIntersecting || !video.duration) return

      const rect = section.getBoundingClientRect()
      const viewHeight = window.innerHeight

      // Calculate how far the section has scrolled through the viewport
      // Progress goes from 0 (starts entering from bottom) to 1 (completely exits at top)
      const progress = (viewHeight - rect.top) / (viewHeight + rect.height)
      const boundedProgress = Math.max(0, Math.min(1, progress))

      // Map progress to video duration
      targetTime = boundedProgress * video.duration
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting
        if (isIntersecting && video.duration) {
          const rect = section.getBoundingClientRect()
          const viewHeight = window.innerHeight
          const progress = (viewHeight - rect.top) / (viewHeight + rect.height)
          const boundedProgress = Math.max(0, Math.min(1, progress))
          targetTime = boundedProgress * video.duration
          currentTime = targetTime
          video.currentTime = targetTime
        }
      },
      { threshold: 0.01 }
    )

    const onMetadataLoaded = () => {
      const rect = section.getBoundingClientRect()
      const viewHeight = window.innerHeight
      const progress = (viewHeight - rect.top) / (viewHeight + rect.height)
      const boundedProgress = Math.max(0, Math.min(1, progress))
      targetTime = boundedProgress * video.duration
      currentTime = targetTime
      video.currentTime = targetTime
    }

    if (video.readyState >= 1) {
      onMetadataLoaded()
    } else {
      video.addEventListener("loadedmetadata", onMetadataLoaded)
    }

    observer.observe(section)
    window.addEventListener("scroll", handleScroll, { passive: true })
    rafId = requestAnimationFrame(updateVideoProgress)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
      video.removeEventListener("loadedmetadata", onMetadataLoaded)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      id="sobre"
      className="section"
      style={{ 
        position: "relative",
        backgroundColor: "#FFFFFF", 
        paddingTop: 96, 
        paddingBottom: 96 
      }}
    >
      {/* Background Video */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          opacity: 0.15,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <video
          ref={videoRef}
          preload="auto"
          muted
          playsInline
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
          }}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="section-inner" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="sobre-flex"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 64,
            alignItems: "flex-start",
          }}
        >
          {/* Left Column */}
          <div className={`sobre-text-col ${isHovered ? "hovered" : ""}`} style={{ flex: "1 1 50%", minWidth: 320 }}>
            <span
              className="fade-up"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#6B0E08",
                display: "block",
                marginBottom: 16,
              }}
            >
            </span>

            <h2
              className="fade-up delay-1"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(30px, 4vw, 42px)",
                fontWeight: 400,
                color: "#0D0D0D",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                marginBottom: 20,
              }}
            >
              Sobre a Dra. Graciela
            </h2>

            <div
              className="fade-up delay-1"
              style={{
                width: 40,
                height: 2,
                background: "#6B0E08",
                borderRadius: 1,
                marginBottom: 32,
              }}
            />

            <p
              className="fade-up delay-2"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                lineHeight: 1.8,
                color: "#6B6B6B",
                marginBottom: 20,
              }}
            >
              Advogada criminalista atuante no Rio de Janeiro, com escritório localizado no Recreio dos Bandeirantes. Comprometida em entregar um trabalho de excelência, com ética, estratégia e total responsabilidade com seus clientes.
            </p>

            <p
              className="fade-up delay-2"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                lineHeight: 1.8,
                color: "#6B6B6B",
                marginBottom: 32,
              }}
            >
              Atendimento 24 horas para urgências jurídicas. Cada caso é tratado com dedicação exclusiva, buscando sempre a melhor estratégia de defesa para garantir os direitos de cada cliente.
            </p>

            <div
              className="fade-up delay-3"
              style={{
                background: "#FAFAFA",
                borderLeft: "4px solid #6B0E08",
                borderRadius: 0,
                padding: 32,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "#6B6B6B",
                  letterSpacing: "0.02em",
                }}
              >
                Dra. Graciela · OAB/RJ 517.632 · Criminalista
              </p>
            </div>
          </div>

          {/* Right Column Wrapper (Static, holds the hover state) */}
          <div
            className="sobre-image-wrapper fade-up delay-4"
            style={{
              flex: "1 1 35%",
              minWidth: 320,
              position: "relative",
              cursor: "pointer",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Right Column — Slide-left interaction */}
            <div className={`sobre-image-container ${isHovered ? "hovered" : ""}`}>
              <style dangerouslySetInnerHTML={{ __html: `
                .sobre-image-wrapper {
                  height: 420px;
                }
                
                .sobre-image-container {
                  position: relative !important;
                  overflow: visible !important; /* Allow the sliding image to be fully visible side-by-side */
                  height: 100%;
                  width: 100%;
                  transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1) !important;
                }
                
                .sobre-text-col {
                  transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1) !important;
                  transform: translateX(0);
                }
                
                .sobre-img-bottom {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100% !important;
                  object-fit: cover;
                  object-position: center top;
                  border-radius: 0;
                  z-index: 1;
                  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
                  transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1), box-shadow 0.6s ease;
                  transform: translateX(0);
                }
                
                .sobre-img-top {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100% !important;
                  object-fit: cover;
                  object-position: center top;
                  border-radius: 0;
                  z-index: 2;
                  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                  transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1), box-shadow 0.6s ease;
                  transform: translateX(0);
                }

                /* Desktop hover: Left column slides left, container shifts left slightly, and top image slides right. */
                @media (min-width: 1024px) {
                  .sobre-text-col.hovered {
                    transform: translateX(-100px) !important;
                  }
                  .sobre-image-container.hovered {
                    transform: translateX(-50px) !important;
                  }
                  .sobre-image-container.hovered .sobre-img-top {
                    transform: translateX(calc(100% + 24px)) !important;
                    box-shadow: 12px 16px 40px rgba(0,0,0,0.25) !important;
                  }
                }

                /* Tablet hover: slide slightly down & scale to avoid breaking narrow margins */
                @media (min-width: 768px) and (max-width: 1023px) {
                  .sobre-image-container.hovered .sobre-img-top {
                    transform: translateY(40px) scale(0.95) !important;
                    box-shadow: 0 16px 40px rgba(0,0,0,0.2) !important;
                  }
                }

                /* Mobile viewport adjustments to guarantee absolute responsiveness and zero bleeding */
                @media (max-width: 767px) {
                  .sobre-image-wrapper {
                    height: 320px !important;
                    min-width: 0 !important;
                    width: 100% !important;
                  }
                  .sobre-image-container {
                    height: 320px !important;
                    min-width: 0 !important;
                    width: 100% !important;
                    overflow: hidden !important; /* Bulletproof containment on mobile screen sizes */
                    border-radius: 0;
                  }
                  .sobre-img-bottom, .sobre-img-top {
                    height: 320px !important;
                  }
                  .sobre-image-container.hovered .sobre-img-top {
                    transform: scale(0.98) !important;
                    box-shadow: 0 12px 32px rgba(0,0,0,0.18) !important;
                  }
                }
              `}} />

              {/* Card 2 — OAB (bottom, always still) */}
              <img
                src="/69f6bfadc332b.jpg"
                alt="Dra. Graciela Maciel segurando carteira da OAB"
                loading="lazy"
                className="sobre-img-bottom"
                style={{ height: "100%" }}
              />

              {/* Card 1 — Red Blazer (top, slides left on hover) */}
              <img
                src="/69f6bfe280aba.jpg"
                alt="Dra. Graciela Maciel, advogada criminalista no Rio de Janeiro"
                loading="lazy"
                className="sobre-img-top"
                style={{ height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
