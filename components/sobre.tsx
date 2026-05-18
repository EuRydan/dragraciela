"use client"

export function Sobre() {
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
      {/* Parallax Background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/1_equLDecnc_xdFeh8WkZHrQ1-1200x800.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.15,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

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
          <div className="sobre-text-col" style={{ flex: "1 1 50%", minWidth: 320 }}>
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

          {/* Right Column — Slide-left interaction (pure CSS, no clipping) */}
          <div className="sobre-image-container fade-up delay-4" style={{ cursor: "pointer" }}>
            <style dangerouslySetInnerHTML={{ __html: `
              .sobre-image-container {
                position: relative !important;
                overflow: visible !important; /* Allow the sliding image to be fully visible side-by-side */
                height: 420px;
                flex: 1 1 35%;
                min-width: 320px;
                width: 100%;
              }
              
              .sobre-img-bottom {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                object-fit: cover;
                object-position: center top;
                border-radius: 16px;
                z-index: 1;
                box-shadow: 0 4px 16px rgba(0,0,0,0.08);
                transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
              }
              
              .sobre-img-top {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                object-fit: cover;
                object-position: center top;
                border-radius: 16px;
                z-index: 2;
                box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1), box-shadow 0.6s ease;
                transform: translateX(0);
              }

              /* Desktop hover: slide to the left to be completely side-by-side without clipping */
              @media (min-width: 1024px) {
                .sobre-image-container:hover .sobre-img-top {
                  transform: translateX(calc(-100% - 24px)) !important;
                  box-shadow: -12px 16px 48px rgba(0,0,0,0.22) !important;
                }
              }

              /* Tablet hover: slide slightly down & scale to avoid breaking narrow margins */
              @media (min-width: 768px) and (max-width: 1023px) {
                .sobre-image-container:hover .sobre-img-top {
                  transform: translateY(40px) scale(0.95) !important;
                  box-shadow: 0 16px 40px rgba(0,0,0,0.2) !important;
                }
              }

              /* Mobile hover/touch: slide slightly down & scale */
              @media (max-width: 767px) {
                .sobre-image-container:hover .sobre-img-top {
                  transform: translateY(30px) scale(0.95) !important;
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
    </section>
  )
}
