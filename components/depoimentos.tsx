"use client"

import { useRef, useState, useEffect } from "react"

const testimonials = [
  {
    name: "Clelton Barros",
    title: "Excelente profissional e prontidão",
    quote: "Excelente profissional. Mais vale um bom argumento que anos de experiência. Precisando é só chamar, Dra. Graciela é prontidão e presteza sempre. Eu indico e recomendo.",
  },
  {
    name: "ISABELLA RIBEIRO",
    title: "Extremamente competente e ética",
    quote: "Advogada extremamente competente, ética e comprometida com seus clientes. Atua com excelência e muita responsabilidade! Sem dúvidas, uma profissional diferenciada no que faz!! Recomendo de olhos fechados.",
  },
  {
    name: "Larissa Nascimento",
    title: "Super qualificada e humana",
    quote: "Ela é maravilhosa resolveu todos os meus problemas, profissional super qualificada ❤️",
  },
  {
    name: "Lohanne Oliveira",
    title: "Profissional maravilhosa",
    quote: "Pessoa maravilhosa super profissional super indico.",
  },
  {
    name: "tielsotinho Barcellos",
    title: "Responsável e muito pontual",
    quote: "Excelente advogada tá de parabéns gostei muito do trabalho dela responsável e pontual.",
  },
  {
    name: "Erilda Candida",
    title: "Advogada de inteira confiança",
    quote: "Advogada de confiança, ótima profissional. Podem contratar.",
  },
  {
    name: "cid mota",
    title: "Profissional recomendadíssima",
    quote: "Ótima profissional de confiança, pode contratar.",
  },
  {
    name: "Luciana Pereira",
    title: "Atendimento de alta qualidade",
    quote: "Advogada de qualidade, super indico.",
  },
  {
    name: "Danilo Ferreira",
    title: "Confiança e segurança total",
    quote: "Advogada de confiança! Pode contratar.",
  },
  {
    name: "Isabella Romão",
    title: "Extremamente capacitada",
    quote: "Profissional extremamente capacitada!",
  },
  {
    name: "Ingrid Barcellos",
    title: "Trabalho de pura excelência",
    quote: "Comprometida em entregar um trabalho de excelência.",
  },
  {
    name: "renato corretor",
    title: "Muito top e muito eficiente",
    quote: "Mt top. Eficiente.",
  },
  {
    name: "Iury Reis",
    title: "Excelente atuação jurídica",
    quote: "Ótima profissional.",
  },
  {
    name: "Vicente Paula",
    title: "Ótimo atendimento",
    quote: "Ótimo profissional.",
  },
  {
    name: "CONCHA PRATAS",
    title: "Domínio criminal e segurança total",
    quote: "Excelente atendimento! Advogada criminalista extremamente competente, atenciosa e comprometida com cada detalhe do caso. Transmite muita segurança e domínio na área, sempre explicando tudo com clareza. Se você procura uma advogada criminalista no Recreio dos Bandeirantes e Barra da Tijuca, pode confiar de olhos fechados. Profissional séria, ágil e dedicada. Recomendo muito!",
  },
  {
    name: "daiane Santos",
    title: "Super profissional",
    quote: "Super profissional.",
  },
]

// Duplicate array for infinite scroll
const allTestimonials = [...testimonials, ...testimonials]

const Stars = () => (
  <div style={{ display: "flex", gap: 3 }} aria-label="5 estrelas">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C5A880" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
)

const CARD_WIDTH = 360  // px
const CARD_GAP = 24     // px
const SPEED = 0.6       // px per frame

function TestimonialCard({ t, className = "" }: { t: typeof testimonials[0]; className?: string }) {
  return (
    <div
      className={`depoimentos-card ${className}`}
      style={{
        flex: "0 0 auto",
        width: CARD_WIDTH,
        background: "#FFFFFF",
        border: "1px solid #EAEAEA",
        padding: "32px 28px",
        borderRadius: 0,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 280,
      }}
    >
      <div>
        {/* Stars */}
        <div style={{ marginBottom: 12 }}>
          <Stars />
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            fontWeight: 700,
            color: "#0D0D0D",
            lineHeight: 1.3,
            marginBottom: 10,
          }}
        >
          {t.title}
        </h3>

        {/* Quote */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            fontWeight: 400,
            color: "#3F3F3F",
            lineHeight: 1.6,
            marginBottom: 20,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      {/* Reviewer Details */}
      <div
        style={{
          borderTop: "1px solid #F0F0F0",
          paddingTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* User Initial Avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(107, 14, 8, 0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-serif)",
            fontSize: 14,
            fontWeight: 700,
            color: "#6B0E08",
            flexShrink: 0,
          }}
        >
          {t.name.charAt(0).toUpperCase()}
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              fontWeight: 700,
              color: "#0D0D0D",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {t.name}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              color: "#777777",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {/* Tiny Google G Icon */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.99 5.99 0 018 12.5a5.99 5.99 0 015.99-6.015c2.467 0 4.53 1.5 5.378 3.685l3.864-1.5A9.99 9.99 0 0013.99 2 9.99 9.99 0 004 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-.585-.052-1.155-.15-1.715H12.24z" fill="#4285F4"/>
            </svg>
            Publicado no Google
          </span>
        </div>
      </div>
    </div>
  )
}


export function Depoimentos() {
  const trackRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number | null>(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  const totalWidth = testimonials.length * (CARD_WIDTH + CARD_GAP)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return // no animation on mobile — use native scroll

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED
        if (posRef.current >= totalWidth) {
          posRef.current -= totalWidth
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${posRef.current}px)`
        }
      }
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [totalWidth, isMobile])

  return (
    <section
      id="depoimentos"
      className="section"
      style={{ background: "#FFFFFF", overflow: "hidden" }}
    >
      <div className="section-inner">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <h2 className="section-title fade-up delay-1">Avaliações de Clientes.</h2>
        </div>

        {/* Star badge */}
        <div
          className="fade-up delay-2"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            marginBottom: 56,
          }}
        >
          <Stars />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 600,
              color: "#0D0D0D",
            }}
          >
            5,0
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: "#6B6B6B",
            }}
          >
            — 31 avaliações no Google
          </span>
        </div>
      </div>

      {/* Mobile: scroll-snap carousel */}
      {isMobile ? (
        <div
          className="depoimentos-track-wrapper"
          role="list"
          aria-label="Depoimentos de clientes"
          style={{
            overflowX: "scroll",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            display: "flex",
            gap: 16,
            paddingLeft: 24,
            paddingRight: 24,
            paddingBottom: 8,
          }}
        >
          {testimonials.map((t, i) => (
            <div key={`snap-${t.name}-${i}`} role="listitem" style={{ flex: "0 0 85vw", scrollSnapAlign: "start" }}>
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      ) : (
        /* Desktop/Tablet: auto-scroll infinite carousel */
        <div
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            cursor: "default",
          }}
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
        >
          {/* Left fade */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 80,
              height: "100%",
              background: "linear-gradient(to right, #FFFFFF, transparent)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          {/* Right fade */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 80,
              height: "100%",
              background: "linear-gradient(to left, #FFFFFF, transparent)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Track */}
          <div
            ref={trackRef}
            role="list"
            aria-label="Depoimentos de clientes"
            style={{
              display: "flex",
              gap: CARD_GAP,
              willChange: "transform",
              paddingBottom: 8,
              paddingTop: 4,
            }}
          >
            {allTestimonials.map((t, i) => (
              <div key={`${t.name}-${i}`} role="listitem">
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
