"use client"

import { useRef, useEffect, useState } from "react"

const steps = [
  {
    num: "01",
    title: "Primeiro Contato",
    desc: "Acolhimento e escuta ativa para entender sua situação com empatia e total sigilo profissional.",
  },
  {
    num: "02",
    title: "Análise do Caso",
    desc: "Estudo detalhado de todas as provas e documentos para identificar as melhores possibilidades jurídicas.",
  },
  {
    num: "03",
    title: "Estratégia de Defesa",
    desc: "Planejamento técnico rigoroso e personalizado, focado na preservação dos seus direitos fundamentais.",
  },
  {
    num: "04",
    title: "Acompanhamento",
    desc: "Presença em todas as audiências e fases do processo, com informação constante e transparente.",
  },
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

export function ComoAtuo() {
  return (
    <section id="metodo" className="section" style={{ background: "#FFFFFF" }}>
      <div className="section-inner">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 className="section-title fade-up delay-1">Como atuo em casos criminais.</h2>
        </div>

        {/* Stepper — 4 col desktop, 2x2 tablet, 1 col mobile */}
        <div
          className="como-atuo-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 0,
            position: "relative",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`como-atuo-step fade-up delay-${i + 1}`}
              style={{
                padding: "32px 28px",
                position: "relative",
                borderRight: i < steps.length - 1 ? "1px dashed #EBEBEB" : "none",
              }}
            >
              {/* Step number */}
              <div
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 64,
                  fontWeight: 500,
                  lineHeight: 1,
                  color: "#6B0E08",
                  opacity: 0.12,
                  marginBottom: 16,
                  userSelect: "none",
                }}
              >
                <AnimatedNumber target={parseInt(step.num, 10)} />
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#0D0D0D",
                  marginBottom: 10,
                  letterSpacing: "-0.01em",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "#6B6B6B",
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
