import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export function Plantao() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Executa a animação de entrada apenas uma vez
        }
      },
      { threshold: 0.1 } // Dispara quando 10% da seção estiver visível
    )
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contato"
      ref={sectionRef}
      className={isVisible ? "is-visible" : ""}
      style={{
        paddingTop: 96,
        paddingBottom: 96,
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* Animação do fundo degrade entrando da esquerda para a direita, movimento fluido e transbordo */}
      <style dangerouslySetInnerHTML={{ __html: `
        #contato {
          position: relative;
          overflow: visible;
        }
        
        @keyframes fundoMovimento {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Fundo degrade com movimento fluido e animação de entrada da esquerda para a direita */
        #contato::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(-45deg, #000000, #3a0000, #6B0E08, #141414, #fc6060ff);
          background-size: 400% 400%;
          animation: fundoMovimento 15s ease infinite;
          z-index: 1;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        #contato.is-visible::before {
          transform: scaleX(1);
        }
        
        /* Container de conteúdo que surge com fade-in suave após a entrada do fundo */
        .plantao-content-wrap {
          position: relative;
          z-index: 2;
          width: 100%;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s, 
                      transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
        }
        
        #contato.is-visible .plantao-content-wrap {
          opacity: 1;
          transform: translateY(0);
        }

        .plantao-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 24px;
          text-align: center;
        }
        
        .plantao-text-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }
      `}} />

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
          zIndex: 1,
          pointerEvents: "none",
          opacity: isVisible ? 0.08 : 0,
          transition: "opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
        }}
      >
        <video
          autoPlay
          loop
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
          <source src="/video%2024h.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="plantao-content-wrap">
        <div className="plantao-grid">
          {/* Content */}
          <div className="plantao-text-container">
            {/* Eyebrow */}
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.75)",
                marginBottom: 20,
                display: "block",
              }}
            >
              ATENDIMENTO DE EMERGÊNCIA
            </span>

            {/* Title */}
            <h2
              className="plantao-title"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 400,
                color: "#FFFFFF",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                marginBottom: 24,
              }}
            >
              Plantão 24 horas para <br />
              casos urgentes.
            </h2>

            {/* Body */}
            <p
              className="plantao-body"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 17,
                lineHeight: 1.7,
                color: "rgba(255, 255, 255, 0.85)",
                marginBottom: 40,
                maxWidth: 560,
              }}
            >
              Prisão em flagrante, busca e apreensão, ou qualquer emergência criminal — atendemos a qualquer hora, com agilidade e sigilo absoluto.
            </p>

            {/* Primary CTA */}
            <a
              href="https://wa.me/5521973971095"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white plantao-btn"
              aria-label="Entrar em contato pelo WhatsApp com a Dra. Graciela"
              style={{ marginBottom: 32 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chamar no WhatsApp Agora
            </a>

            {/* Info Pills */}
            <div className="plantao-pills" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  borderRadius: 0,
                  padding: "8px 16px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                📍 Rio de Janeiro · Online para todo o Brasil
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  borderRadius: 0,
                  padding: "8px 16px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                📞 (21) 97397-1095
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
