"use client"

import { useEffect, useState } from "react"
import { Lock, AlertTriangle } from "lucide-react"

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
      aria-label="Sistema indisponível - Fechado por tempo indeterminado"
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
          padding: 56px 40px;
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
          line-height: 1.25;
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
          margin-bottom: 8px;
        }

        .maintenance-footer-sharp {
          margin-top: 36px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.35);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 24px;
          font-family: var(--font-sans), sans-serif;
          letter-spacing: 0.05em;
          text-transform: uppercase;
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
              borderRadius: "0px",
            }}
          >
            <Lock size={22} color="#FFFFFF" strokeWidth={1.5} />
          </div>
        </div>


        <h1 className="maintenance-title-sharp">
          Acesso Indisponível
        </h1>
        
        <div className="title-divider-sharp" />

        <p className="maintenance-message-sharp">
          Informamos que este endereço eletrônico encontra-se temporariamente desativado e fechado por tempo indeterminado.
        </p>

        <footer className="maintenance-footer-sharp">
          Status: Sistema Off-line
        </footer>
      </main>
    </div>
  )
}
