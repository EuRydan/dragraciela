"use client"

import { useRef, useState, useEffect } from "react"

const stats = [
  { value: "5,0", suffix: "★", label: "Avaliação no Google" },
  { value: "31", suffix: "+", label: "Clientes avaliaram" },
  { value: "24", suffix: "h", label: "Plantão de atendimento" },
]

function AnimatedStat({ stat, inView }: { stat: typeof stats[0]; inView: boolean }) {
  const [current, setCurrent] = useState(0)
  const numericValue = parseFloat(stat.value.replace(",", "."))

  useEffect(() => {
    if (!inView) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setCurrent(numericValue)
      return
    }

    const duration = 1200
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(eased * numericValue)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [inView, numericValue])

  const displayValue = stat.value.includes(",")
    ? current.toFixed(1).replace(".", ",")
    : Math.round(current).toString()

  return (
    <div style={{ textAlign: "center" }}>
      <div
        className="stat-value"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(28px, 5vw, 44px)",
          fontWeight: 400,
          color: "#6B0E08",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {displayValue}
        <span>{stat.suffix}</span>
      </div>
      <p
        className="stat-label"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          color: "#6B6B6B",
          marginTop: 8,
        }}
      >
        {stat.label}
      </p>
    </div>
  )
}

const cards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B0E08" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Ética Profissional",
    body: "Atuamos com integridade absoluta em cada caso, respeitando os princípios deontológicos da advocacia e os limites éticos da profissão.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B0E08" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3L3 8v8l9 5 9-5V8L12 3z" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <line x1="3.27" y1="6.96" x2="12" y2="12.26" />
        <line x1="20.73" y1="6.96" x2="12" y2="12.26" />
      </svg>
    ),
    title: "Estratégia Jurídica",
    body: "Cada defesa é construída com análise minuciosa e teses sólidas, desenvolvidas exclusivamente para as particularidades do seu caso.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B0E08" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: "Comprometimento",
    body: "Tratamos cada cliente com atenção exclusiva e comunicação transparente, disponíveis 24 horas para situações de urgência.",
  },
]

export function Diferenciais() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsInView, setStatsInView] = useState(false)

  useEffect(() => {
    if (!statsRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="diferenciais"
      className="section"
      style={{ background: "#FAFAFA", borderTop: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB", padding: 0 }}
    >
      <div className="section-inner" style={{ paddingTop: 96, paddingBottom: 96 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 className="section-title fade-up delay-1">
            Três pilares da nossa atuação.
          </h2>
        </div>

        {/* Cards grid — 3 cols desktop, 1 col mobile */}
        <div
          className="diferenciais-cards fade-up delay-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            borderBottom: "1px solid #EBEBEB",
            paddingBottom: 48,
            marginBottom: 48,
          }}
        >
          {cards.map((card, i) => (
            <DifCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Stat counters — always 3 cols */}
        <div
          ref={statsRef}
          className="fade-up delay-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
          }}
        >
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} inView={statsInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DifCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`card fade-up delay-${index + 1}`}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        borderRadius: 0,
        border: "1px solid #EBEBEB",
        padding: "36px 32px",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "default",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 40px rgba(107, 14, 8, 0.08)" : "0 4px 20px rgba(0,0,0,0.02)",
        borderColor: hovered ? "rgba(107, 14, 8, 0.2)" : "#EBEBEB",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Subtly moving top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 4,
          background: "linear-gradient(90deg, #6B0E08, #A3231B)",
          width: "100%",
          transform: hovered ? "scaleX(1)" : "scaleX(0.15)",
          transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 0,
          background: hovered ? "rgba(107,14,8,0.12)" : "rgba(107,14,8,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "background-color 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {card.icon}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 21,
          fontWeight: 400,
          color: "#0D0D0D",
          marginBottom: 12,
          letterSpacing: "-0.01em",
        }}
      >
        {card.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          lineHeight: 1.7,
          color: "#6B6B6B",
        }}
      >
        {card.body}
      </p>
    </div>
  )
}
