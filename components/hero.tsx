"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true))
  }, [])

  return (
    <section
      id="inicio"
      className="hero-section"
      role="img"
      aria-label="Dra. Graciela Maciel, advogada criminalista"
      style={{
        position: "relative",
        minHeight: 640,
        display: "flex",
        alignItems: "center",
        paddingTop: 80,
        overflow: "hidden",
        backgroundColor: "#000000"
      }}
    >
      {/* ESTILO DO GRADIENTE ANIMADO EM CSS PURO */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fundoMovimento {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .fundo-animado-graciela {
          position: absolute;
          inset: 0;
          background: linear-gradient(-45deg, #000000, #3a0000, #6B0E08, #141414, #ffffff);
          background-size: 400% 400%;
          animation: fundoMovimento 15s ease infinite;
          opacity: 0.7;
          z-index: 0;
        }
      `}} />

      {/* Camada do fundo */}
      <div className="fundo-animado-graciela" />

      {/* CONTEÚDO PRINCIPAL EM FLEX BOX */}
      <div className="section-inner container mx-auto px-4" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="flex flex-col md:flex-row items-stretch gap-10" style={{ display: "flex", alignItems: "center" }}>
          
          {/* LADO ESQUERDO: SEUS TEXTOS E BOTÕES */}
          <div style={{ maxWidth: 640, flex: "1 1 50%" }}>
            <h1
              className="hero-headline"
              style={{
                fontFamily: "var(--font-serif)",
                marginTop: 16,
                marginBottom: 24,
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: "clamp(32px, 5vw, 52px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease-out 0.3s, transform 0.7s ease-out 0.3s",
              }}
            >
              Advocacia Criminal com Ética, Estratégia e Responsabilidade.
            </h1>

            <p
              className="hero-body"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 17,
                fontWeight: 400,
                lineHeight: 1.7,
                color: "#FFFFFF",
                maxWidth: 520,
                marginBottom: 40,
                opacity: loaded ? 0.85 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease-out 0.5s, transform 0.6s ease-out 0.5s",
              }}
            >
              Defesa jurídica especializada de alta complexidade. Protegemos seus direitos fundamentais com dedicação integral, sigilo absoluto e soluções estratégicas personalizadas.
            </p>

            <div
              className="hero-ctas"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.5s ease-out 0.7s, transform 0.5s ease-out 0.7s",
              }}
            >
              <a
                href="https://wa.me/5521973971095"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white magnetic-btn"
                aria-label="Entrar em contato pelo WhatsApp com a Dra. Graciela"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Atendimento de Emergência 24h
              </a>
              <Link href="#sobre" className="btn-ghost-white">
                Conheça a Dra. Graciela
              </Link>
            </div>
          </div>

          {/* LADO DIREITO: FOTO ALINHADA NA BASE DA CAIXA */}
          <div className="flex justify-center md:justify-end" style={{ flex: "1 1 50%", opacity: loaded ? 1 : 0, transition: "opacity 0.7s ease-out 0.5s", alignSelf: "flex-end", marginTop: "auto" }}>
            <Image
              src="/dra-graciela-hero.png"
              alt="Dra. Graciela Maciel"
              width={520}
              height={520}
              style={{ display: "block", width: "100%", height: "auto", maxHeight: "560px", objectFit: "contain", verticalAlign: "bottom" }}
              priority
            />
          </div>

        </div>
      </div>
    </section>
  )
}