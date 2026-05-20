"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Home, FileQuestion } from "lucide-react"

export default function NotFound() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Disable scrolling when error view is active
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
      aria-label="Página não encontrada - Erro 404"
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
        @keyframes fundoMovimento404 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .bg-motion-gradient-404 {
          position: absolute;
          inset: 0;
          background: linear-gradient(-45deg, #000000, #141414, #4A0906, #0D0D0D, #6B0E08);
          background-size: 400% 400%;
          animation: fundoMovimento404 12s ease infinite;
          opacity: 0.9;
          z-index: 0;
        }

        .vignette-overlay-404 {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 10%, rgba(0, 0, 0, 0.95) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .grid-overlay-404 {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center;
          mask-image: radial-gradient(circle at center, white 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, white 20%, transparent 80%);
          pointer-events: none;
          z-index: 1;
        }

        .error-card-sharp {
          background: rgba(13, 13, 13, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 24px 64px rgba(0, 0, 0, 0.9),
            0 0 80px rgba(107, 14, 8, 0.15);
          border-radius: 0px; /* STRICT SHARP DESIGN SYSTEM */
          max-width: 480px;
          width: 100%;
          padding: 48px 36px;
          text-align: center;
          position: relative;
          z-index: 10;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out;
        }

        .badge-error-sharp {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          background: rgba(107, 14, 8, 0.3);
          border: 1px solid #6B0E08;
          border-radius: 0px;
          color: #FC6060;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .error-title-sharp {
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(22px, 4vw, 30px);
          font-weight: 400;
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: #FFFFFF;
          margin-bottom: 16px;
        }

        .error-divider-sharp {
          width: 40px;
          height: 1.5px;
          background: #6B0E08;
          margin: 0 auto 20px auto;
        }

        .error-message-sharp {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 32px;
        }

        .error-buttons-sharp {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-error-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #6B0E08;
          color: #FFFFFF;
          font-family: var(--font-sans), sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 14px 24px;
          border-radius: 0px;
          text-decoration: none;
          border: none;
          box-shadow: 0 2px 8px rgba(107, 14, 8, 0.2);
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          cursor: pointer;
          min-height: 44px;
        }

        .btn-error-primary:hover {
          background: #4A0906;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(107, 14, 8, 0.3);
        }

        .btn-error-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          color: #FFFFFF;
          font-family: var(--font-sans), sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 13px 24px;
          border-radius: 0px;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
          cursor: pointer;
          min-height: 44px;
        }

        .btn-error-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: #FFFFFF;
          transform: translateY(-1px);
        }

        .error-footer-sharp {
          margin-top: 32px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.3);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 20px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
      `}} />

      {/* FULL SCREEN BACKGROUND */}
      <div className="bg-motion-gradient-404" />
      <div className="vignette-overlay-404" />
      <div className="grid-overlay-404" />
      
      {/* SHARP CARD */}
      <main
        className="error-card-sharp"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #6B0E08",
              borderRadius: "0px",
            }}
          >
            <FileQuestion size={22} color="#FC6060" strokeWidth={1.5} />
          </div>
        </div>

        <div className="badge-error-sharp">
          Erro 404
        </div>

        <h1 className="error-title-sharp">
          Página não encontrada
        </h1>
        
        <div className="error-divider-sharp" />

        <p className="error-message-sharp">
          O endereço solicitado não foi localizado ou foi removido definitivamente de nosso servidor.
        </p>

        <div className="error-buttons-sharp">
          <Link href="/" className="btn-error-primary">
            <Home size={15} strokeWidth={2} />
            Voltar ao Início
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="btn-error-secondary"
          >
            <ArrowLeft size={15} strokeWidth={2} />
            Retornar à Página Anterior
          </button>
        </div>

        <footer className="error-footer-sharp">
          Dra. Graciela Maciel &bull; Advocacia Criminal
        </footer>
      </main>
    </div>
  )
}
