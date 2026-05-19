"use client"

import { useEffect, useState } from "react"
import { Scale, MessageSquare, Mail, AlertTriangle } from "lucide-react"

export function Maintenance() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Disable scrolling when maintenance view is active
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    
    requestAnimationFrame(() => setLoaded(true))

    return () => {
      // Restore scrolling on unmount
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div
      role="alert"
      aria-label="Site em manutenção - Fechado por tempo indeterminado"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        color: "#FFFFFF",
        fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
        overflow: "hidden",
        padding: "24px",
      }}
    >
      {/* CSS STYLES FOR THE ANIMATED GRADIENT & ELEMENTS (SHARP DESIGN SYSTEM) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fundoMovimentoCompleto {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .bg-motion-gradient-full {
          position: absolute;
          inset: 0;
          background: linear-gradient(-45deg, #000000, #3a0000, #6B0E08, #141414, #fc6060ff);
          background-size: 400% 400%;
          animation: fundoMovimentoCompleto 15s ease infinite;
          opacity: 0.85;
          z-index: 0;
        }

        .vignette-overlay-full {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 20%, rgba(0, 0, 0, 0.9) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .grid-overlay-full {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center;
          mask-image: radial-gradient(circle at center, white 30%, transparent 85%);
          -webkit-mask-image: radial-gradient(circle at center, white 30%, transparent 85%);
          pointer-events: none;
          z-index: 1;
        }

        .maintenance-card-sharp {
          background: rgba(13, 13, 13, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 24px 64px rgba(0, 0, 0, 0.85),
            0 0 80px rgba(107, 14, 8, 0.2);
          border-radius: 0px; /* STRICT SHARP DESIGN SYSTEM */
          max-width: 520px;
          width: 100%;
          padding: 48px 40px;
          text-align: center;
          position: relative;
          z-index: 10;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out;
        }

        .badge-comunicado-sharp {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(107, 14, 8, 0.25);
          border: 1.5px solid #6B0E08;
          border-radius: 0px; /* STRICT SHARP DESIGN SYSTEM */
          color: #FC6060;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .maintenance-title-sharp {
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(24px, 5vw, 34px);
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin-bottom: 20px;
        }

        .title-divider-sharp {
          width: 40px;
          height: 2px;
          background: #6B0E08;
          margin: 0 auto 24px auto;
          border-radius: 0px;
        }

        .maintenance-message-sharp {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 36px;
        }

        .contact-section-sharp {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 32px;
          text-align: left;
        }

        .contact-title-sharp {
          font-family: var(--font-sans), sans-serif;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 20px;
          text-align: center;
        }

        .btn-sharp-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #6B0E08;
          color: #FFFFFF;
          font-family: var(--font-sans), sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 15px 28px;
          border-radius: 0px; /* STRICT SHARP DESIGN SYSTEM */
          text-decoration: none;
          border: none;
          box-shadow: 0 2px 8px rgba(107, 14, 8, 0.25);
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          margin-bottom: 12px;
          cursor: pointer;
          min-height: 44px;
        }

        .btn-sharp-primary:hover {
          background: #4A0906; /* brand-press */
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(107, 14, 8, 0.35);
        }

        .btn-sharp-primary:active {
          transform: translateY(0);
        }

        .btn-sharp-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: transparent;
          color: #FFFFFF;
          font-family: var(--font-sans), sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 14px 28px;
          border-radius: 0px; /* STRICT SHARP DESIGN SYSTEM */
          text-decoration: none;
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
          cursor: pointer;
          min-height: 44px;
        }

        .btn-sharp-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #FFFFFF;
          transform: translateY(-1px);
        }

        .btn-sharp-secondary:active {
          transform: translateY(0);
        }

        .maintenance-footer-sharp {
          margin-top: 40px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 24px;
          font-family: var(--font-sans), sans-serif;
        }
      `}} />

      {/* FULL SCREEN BACKGROUND */}
      <div className="bg-motion-gradient-full" />
      <div className="vignette-overlay-full" />
      <div className="grid-overlay-full" />
      
      {/* GLASSMORPHIC CARD */}
      <main
        className="maintenance-card-sharp"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid #6B0E08",
              borderRadius: "0px", /* SHARP DESIGN */
            }}
          >
            <Scale size={24} color="#FFFFFF" strokeWidth={1.5} />
          </div>
        </div>

        <div className="badge-comunicado-sharp">
          <AlertTriangle size={12} strokeWidth={2.5} />
          Comunicado Oficial
        </div>

        <h1 className="maintenance-title-sharp">
          Portal Suspenso
        </h1>
        
        <div className="title-divider-sharp" />

        <p className="maintenance-message-sharp">
          Informamos que o site da Dra. Graciela Maciel encontra-se fechado por tempo indeterminado.
        </p>

        <div className="contact-section-sharp">
          <h2 className="contact-title-sharp">
            Urgências &amp; Clientes Ativos
          </h2>
          
          <a
            href="https://wa.me/5521973971095"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sharp-primary"
            aria-label="Falar pelo WhatsApp com a Dra. Graciela"
          >
            <MessageSquare size={16} strokeWidth={2} />
            Atendimento de Emergência
          </a>

          <a
            href="mailto:contato@gracielacriminalista.com.br"
            className="btn-sharp-secondary"
            aria-label="Enviar e-mail para a Dra. Graciela"
          >
            <Mail size={16} strokeWidth={2} />
            Enviar E-mail
          </a>
        </div>

        <footer className="maintenance-footer-sharp">
          Dra. Graciela Maciel &bull; Advocacia Criminal &bull; OAB/RJ 517.632
        </footer>
      </main>
    </div>
  )
}
