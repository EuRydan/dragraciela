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

function AreaRow({ area, index }: { area: typeof areas[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`fade-up delay-${Math.min(index + 1, 5)}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 16px",
        position: "relative",
        borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated Borders */}
      {/* Top line */}
      <div style={{ position: "absolute", top: 0, left: 0, height: 2, background: "#FFFFFF", width: hovered ? "100%" : "0%", transition: "width 0.3s ease-out" }} />
      {/* Bottom line */}
      <div style={{ position: "absolute", bottom: 0, right: 0, height: 2, background: "#FFFFFF", width: hovered ? "100%" : "0%", transition: "width 0.3s ease-out" }} />
      {/* Left line */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 2, background: "#FFFFFF", height: hovered ? "100%" : "0%", transition: "height 0.3s ease-out" }} />
      {/* Right line */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 2, background: "#FFFFFF", height: hovered ? "100%" : "0%", transition: "height 0.3s ease-out" }} />

      {/* Number */}
      <span
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 48,
          fontWeight: 500,
          color: "#FFFFFF",
          opacity: hovered ? 0.4 : 0.15,
          lineHeight: 1,
          minWidth: 56,
          userSelect: "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Area info */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            fontWeight: 600,
            color: "#FFFFFF",
          }}
        >
          {area.title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "#FFFFFF",
            opacity: 0.75,
            lineHeight: 1.5,
          }}
        >
          {area.description}
        </span>
      </div>

      {/* Chevron */}
      <span
        aria-hidden="true"
        style={{
          color: "#FFFFFF",
          opacity: 0.6,
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.25s ease, opacity 0.25s ease",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </span>
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
          <h2 className="section-title fade-up delay-1" style={{ color: "#FFFFFF" }}>Áreas de Atuação</h2>
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
