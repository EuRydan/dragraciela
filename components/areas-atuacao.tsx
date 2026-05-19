"use client"

import { useRef, useEffect, useState } from "react"

const areas = [
  {
    title: "Prisão em Flagrante",
    description: "Atendimento imediato em casos de prisão em flagrante, com acompanhamento em delegacia e orientação à família."
  },
  {
    title: "Audiência de Custódia e Liberdade",
    description: "Atua em audiências de custódia, pedidos de liberdade, revogação ou relaxamento de prisão."
  },
  {
    title: "Crimes Contra a Vida",
    description: "Atuação em Tribunal do Júri em casos de homicídio e feminicídio."
  },
  {
    title: "Lei de Drogas",
    description: "Atuação estratégica em casos de tráfico e posse, visando a aplicação justa da lei e redução de danos."
  },
  {
    title: "Violência Doméstica",
    description: "Defesa e acompanhamento em casos regidos pela Lei Maria da Penha, com sensibilidade e rigor técnico."
  },
  {
    title: "Execução Penal",
    description: "Acompanhamento após a sentença para garantir benefícios como progressão de regime e livramento condicional."
  }
]

function AnimatedNumber({ target, duration = 800 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0)
  const elementRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true)
          
          const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
          if (prefersReducedMotion) {
            setCurrent(target)
            return
          }

          const startTime = performance.now()
          const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) 
            const val = Math.round(eased * target)
            setCurrent(val)
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [target, duration, hasAnimated])

  return (
    <span ref={elementRef}>
      {String(current).padStart(2, "0")}
    </span>
  )
}

function AreaRow({ area, index }: { area: typeof areas[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`fade-up delay-${Math.min(index + 1, 5)}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "24px 20px",
        position: "relative",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        cursor: "pointer",
        borderRadius: 0,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        background: hovered ? "rgba(255, 255, 255, 0.04)" : "transparent",
        transform: hovered ? "translateX(8px)" : "translateX(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Luxury Left Vertical Indicator Line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "15%",
          height: "70%",
          width: 3,
          background: "#FFFFFF",
          borderRadius: 1.5,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scaleY(1)" : "scaleY(0.3)",
          transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Number */}
      <span
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 40,
          fontWeight: 400,
          color: "#FFFFFF",
          opacity: hovered ? 0.9 : 0.25,
          lineHeight: 1,
          minWidth: 48,
          userSelect: "none",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        <AnimatedNumber target={index + 1} />
      </span>

      {/* Area info */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 16,
            fontWeight: 600,
            color: "#FFFFFF",
            transition: "color 0.4s ease",
          }}
        >
          {area.title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "#FFFFFF",
            opacity: hovered ? 0.85 : 0.65,
            lineHeight: 1.6,
            transition: "opacity 0.4s ease",
          }}
        >
          {area.description}
        </span>
      </div>

      {/* Chevron Icon Container */}
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: hovered ? "rgba(255, 255, 255, 0.1)" : "transparent",
          color: "#FFFFFF",
          opacity: hovered ? 1 : 0.4,
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  )
}

export function AreasAtuacao() {
  return (
    <section
      id="atuacao"
      className="section"
      style={{ background: "#6B0E08", paddingTop: 96, paddingBottom: 96 }}
    >
      <div className="section-inner">
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <h2 className="section-title fade-up delay-1" style={{ color: "#FFFFFF" }}>
            Áreas de Atuação
          </h2>
          <div className="title-divider fade-up delay-2" style={{ background: "#FFFFFF", marginBottom: 16 }} />
          <p
            className="fade-up delay-2"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              lineHeight: 1.7,
              color: "#FFFFFF",
              opacity: 0.75,
              maxWidth: 540,
            }}
          >
            Cada caso é único. Atuamos com precisão em todas as frentes<br />
            do direito criminal.
          </p>
        </div>

        {/* 2-column grid — 1 column on mobile */}
        <div
          className="areas-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "0 40px",
          }}
        >
          {areas.map((area, i) => (
            <AreaRow key={area.title} area={area} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
