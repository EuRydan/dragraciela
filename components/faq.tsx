"use client"

import { useState, useCallback } from "react"

const faqs = [
  {
    q: "Quais os direitos de quem é preso em flagrante?",
    a: "A pessoa tem direito ao silêncio, a saber quem a prende e a comunicar imediatamente sua família e seu advogado. Como advogada, acompanho esse momento para garantir que nenhuma ilegalidade aconteça e para acalmar os familiares.",
  },
  {
    q: "É obrigado falar na delegacia?",
    a: "Não. O direito de permanecer em silêncio é sagrado e não pode ser usado contra você. O ideal é só prestar qualquer esclarecimento após conversar com sua defesa para alinhar a melhor estratégia.",
  },
  {
    q: "Quanto tempo dura um processo criminal?",
    a: "O tempo varia conforme a complexidade do caso e o local. Meu papel é atuar com agilidade e técnica para que o processo não se arraste desnecessariamente e para manter você informado de cada passo dado.",
  },
  {
    q: "A família pode acompanhar as audiências?",
    a: "Na maioria das vezes, sim, as audiências são públicas. Eu oriento a família sobre como se portar e as datas importantes, garantindo um acompanhamento próximo e humano durante todo o processo.",
  },
]

function FAQItem({ item, index, isOpen, onToggle }: {
  item: typeof faqs[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const btnId = `faq-btn-${index}`
  const panelId = `faq-panel-${index}`

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) onToggle()
  }, [isOpen, onToggle])

  return (
    <div
      className="fade-up"
      style={{
        borderBottom: "1px solid #EBEBEB",
        paddingBottom: 0,
      }}
    >
      <button
        id={btnId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          minHeight: 44,
        }}
      >
        <span
          className="faq-question-text"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 17,
            fontWeight: 600,
            color: isOpen ? "#6B0E08" : "#0D0D0D",
            lineHeight: 1.4,
            transition: "color 0.2s",
          }}
        >
          {item.q}
        </span>
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "1.5px solid #6B0E08",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6B0E08",
            fontSize: 18,
            fontWeight: 300,
            transition: "background 0.2s",
            background: isOpen ? "#6B0E08" : "transparent",
          }}
        >
          <span style={{ color: isOpen ? "#FFFFFF" : "#6B0E08", lineHeight: 1 }}>
            {isOpen ? "−" : "+"}
          </span>
        </span>
      </button>

      {/* Answer */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`accordion-content ${isOpen ? "open" : ""}`}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            lineHeight: 1.75,
            color: "#6B6B6B",
            paddingBottom: 24,
            paddingRight: 40,
          }}
        >
          {item.a}
        </p>
      </div>
    </div>
  )
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section 
      id="faq" 
      style={{ 
        background: "#FFFFFF", 
        paddingTop: 96, 
        paddingBottom: 96 
      }}
    >
      <div 
        className="faq-inner"
        style={{ 
          maxWidth: 860, 
          margin: "0 auto", 
          padding: "0 24px" 
        }}
      >
        {/* Header */}
        <div 
          style={{ 
            marginBottom: 56, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            textAlign: "center" 
          }}
        >
          <h2 className="section-title fade-up delay-1">
            Dúvidas frequentes em casos criminais.
          </h2>
          <div className="title-divider fade-up delay-2" style={{ marginBottom: 12 }} />
          <p
            className="fade-up delay-2"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              color: "#6B6B6B",
              lineHeight: 1.7,
              maxWidth: 520,
            }}
          >
            Respostas diretas para as perguntas mais comuns sobre direito criminal.
          </p>
        </div>

        {/* Accordion */}
        <div>
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
